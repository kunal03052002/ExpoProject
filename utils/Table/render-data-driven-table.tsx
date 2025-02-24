import { TableData } from "./table-data";
import {
  FilterOperator,
  FilterOptionsState,
  TableContextProps,
  TableProps,
} from "./interface";
import {
  ReactElement,
  SyntheticEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useImperativeHandle,
} from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
  ColumnSizingState,
} from "@tanstack/react-table";
import {
  customGlobalFn,
  downloadDataAsCSV,
  transformRawDataIntoCsvData,
  transformTableIntoCsvData,
} from "./utils";
import {
  applyActionButtonStyle,
  applyBorderedStyle,
  applyContainerStyle,
  applyHeaderIconLeft,
  applyPreContainer,
  applyTableCellBackgroundStyle,
  applyTableStyle,
  // downloadRawStyle,
  // downloadTipStyle,
  headerStyle,
  spinStyle,
  tableResizerStyle,
  toolBarStyle,
} from "./style";
import { TableContext } from "./table-context";
import { Thead } from "./thead";
import { Tr } from "./tr";
import { Th } from "./th";
import DownloadIcon from "@mui/icons-material/Download";
import SorterDownIcon from "@mui/icons-material/ArrowDropDown";
import SorterUpIcon from "@mui/icons-material/ArrowDropUp";
import RefreshIcon from "@mui/icons-material/Cached";
import { TBody } from "./tbody";
import { Td } from "./td";
import { TFoot } from "./tfoot";
import { Pagination } from "../pagination";
import { TableFilter } from "./table-filter";
import { useClickAway } from "react-use";
import { isNumber, isString } from "util";
import { applyBoxStyle, deleteCssProps } from "../model/src";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import { Button, Checkbox, Tooltip } from "@mui/material";
import { Empty } from "@/page/app/components/Actions/empty/src";

const DEFAULT_TABLE_FILTER = [{ id: "", value: "" }];
const MULTI_ROW_SELECTION_CHECKBOX_ID = "select";

export function RenderDataDrivenTable<D extends TableData, TValue>(
  props: TableProps<D, TValue>
): ReactElement {
  const {
    tableRef,
    size = "medium",
    tableLayout = "auto",
    overFlow = "scroll",
    columns = [],
    data = [],
    loading = false,
    bordered,
    borderedCell,
    striped,
    // children,
    disableSortBy,
    pinedHeader,
    colorScheme,
    align = "left",
    showFooter,
    hoverable,
    showHeader = true,
    emptyProps,
    customCellPadding,
    columnVisibility,
    pagination,
    columnSizing: _columnSizing = {},
    enableColumnResizing,
    multiRowSelection = false,
    enableRowSelection = true,
    enableSingleCellSelection,
    serverSidePagination,
    total,
    clickOutsideToResetRowSelect,
    checkAll = true,
    refresh,
    download,
    // downloadRawData,
    filter,
    rowSelection: selected = {},
    defaultSort = [],
    onRefresh,
    onRowClick,
    onSortingChange,
    onPaginationChange,
    // onColumnFiltersChange,
    onGlobalFiltersChange,
    onRowSelectionChange,
    onCellSelectionChange,
    onColumnSizingChange,
    ...otherProps
  } = props;

  const contextProps = {
    align,
    borderedCell,
    striped,
    size,
    hoverable,
    showHeader,
    showFooter,
    customCellPadding,
    enableColumnResizing,
  } as TableContextProps;

  const containerRef = useRef<HTMLDivElement>(null);
  const [sorting, setSorting] = useState<SortingState>(defaultSort);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>();
  const [filterOperator, setFilterOperator] = useState<FilterOperator>("and");
  const [filterOption, setFilterOption] =
    useState<FilterOptionsState>(DEFAULT_TABLE_FILTER);
  const [rowSelection, setRowSelection] = useState(selected);
  const [currentColumns, setColumns] =
    useState<ColumnDef<D, TValue>[]>(columns);
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [columnSizing, setColumnSizing] =
    useState<ColumnSizingState>(_columnSizing);

  const [selectedCell, setSelectedCell] = useState<string>();

  const _columns = useMemo(() => {
    const current = currentColumns?.filter((item) => {
      //@ts-expect-error dmmm
      return item.id || item.accessorKey;
    });
    if (multiRowSelection && enableRowSelection) {
      const rowSelectionColumn: ColumnDef<D, TValue>[] = [
        {
          accessorKey: MULTI_ROW_SELECTION_CHECKBOX_ID,
          enableSorting: false,
          enableResizing: false,
          size: 80,
          header: checkAll
            ? ({ table }) => {
                return (
                  <Checkbox
                    {...{
                      checked: table.getIsAllRowsSelected(),
                      indeterminate: table.getIsSomeRowsSelected(),
                      onChange: (v, event) => {
                        table?.getToggleAllRowsSelectedHandler()?.(event);
                      },
                    }}
                  />
                );
              }
            : "",
          cell: ({ row }) => {
            return (
              <Checkbox
                {...{
                  checked: row.getIsSelected(),
                  indeterminate: row.getIsSomeSelected(),
                  onChange: row.getToggleSelectedHandler(),
                }}
              />
            );
          },
        },
      ];
      return rowSelectionColumn.concat(current);
    }
    return current;
  }, [checkAll, currentColumns, multiRowSelection, enableRowSelection]);

  const globalFilter = useMemo(() => {
    return { filters: columnFilters, operator: filterOperator };
  }, [columnFilters, filterOperator]);

  const enableMultiRowSelection = useMemo(() => {
    return multiRowSelection && enableRowSelection;
  }, [multiRowSelection, enableRowSelection]);

  const table = useReactTable<D>({
    data,
    columns: _columns,
    state: {
      columnVisibility,
      globalFilter,
      sorting,
      rowSelection,
      columnSizing,
      pagination: {
        pageIndex,
        pageSize,
      },
    },
    enableColumnResizing: !!enableColumnResizing,
    columnResizeMode: "onChange",
     autoResetAll: true,
    enableMultiRowSelection,
    enableSorting: !disableSortBy,
    globalFilterFn: customGlobalFn,
    onColumnSizingChange: (columnSizing) => {
      setColumnSizing(columnSizing);
      onColumnSizingChange?.(table.getState().columnSizing);
    },
    onPaginationChange: (pagination) => {
      setPagination(pagination);
      onPaginationChange?.(table.getState().pagination, table);
    },
    onSortingChange: (columnSort) => {
      new Promise((resolve) => {
        setSorting(columnSort);
        resolve(true);
      }).then(() => {
        onSortingChange?.(table.getState().sorting);
      });
    },
    onRowSelectionChange: (rowSelection) => {
      new Promise((resolve) => {
        setRowSelection(rowSelection);
        resolve(true);
      }).then(() => {
        onRowSelectionChange?.(table.getState().rowSelection);
      });
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: overFlow === "scroll" || serverSidePagination,
  });

  const restCellSelection = useCallback(() => {
    setSelectedCell(undefined);
    onCellSelectionChange?.(undefined);
  }, [onCellSelectionChange]);

  useImperativeHandle(tableRef, () => ({
    table: table,
    selectPage: (pageIndex) => {
      setPagination((prevState) => {
        return {
          ...prevState,
          pageIndex,
        };
      });
    },
    selectRow: (rowSelection) => {
      setRowSelection(rowSelection);
      onRowSelectionChange?.(rowSelection);
    },
    setGlobalFilters: (filters, operator) => {
      setFilterOption(filters.length ? filters : DEFAULT_TABLE_FILTER);
      setColumnFilters(filters);
      setFilterOperator(operator);
      onGlobalFiltersChange?.(filters, operator);
    },
    clearSelection: () => {
      table.resetRowSelection();
      restCellSelection();
    },
  }));

  useClickAway(containerRef, () => {
    if (clickOutsideToResetRowSelect) {
      // when multiRowSelection is false, click outside the table, reset the row selection
      if (!multiRowSelection) {
        table.resetRowSelection();
      }
      if (enableSingleCellSelection) {
        restCellSelection();
      }
    }
  });

  useEffect(() => {
    // when enableSingleCellSelection is false, reset the cell selection
    if (!enableSingleCellSelection) {
      restCellSelection();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enableSingleCellSelection]);

  useEffect(() => {
    if ("defaultSort" in props && defaultSort) {
      setSorting(defaultSort);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultSort]);

  useEffect(() => {
    if (!enableMultiRowSelection) {
      if (rowSelection && Object.keys(rowSelection)?.length > 1) {
        const _selectedRow = { [Object.keys(rowSelection)[0]]: true };
        setRowSelection(_selectedRow);
        onRowSelectionChange?.(_selectedRow);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enableMultiRowSelection]);

  useEffect(() => {
    if (!enableRowSelection) {
      table.resetRowSelection();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enableRowSelection]);

  useEffect(() => {
    setColumns(columns);
  }, [columns]);

  useEffect(() => {
    if (pagination) {
      const { pageSize: _pageSize, current } = pagination;
      setPagination({
        pageIndex: isNumber(current) ? current : pageIndex,
        pageSize: isNumber(_pageSize) ? _pageSize : pageSize,
      });
    }
  }, [pagination?.pageSize, pagination?.current]);

  const downloadTableDataAsCsv = useCallback(() => {
    const csvData = transformTableIntoCsvData(table, multiRowSelection);
    downloadDataAsCSV({
      csvData: csvData,
      delimiter: ",",
      fileName: `table.csv`,
    });
  }, [table, multiRowSelection]);

  const downloadTableRawDataAsCsv = useCallback(() => {
    const csvData = transformRawDataIntoCsvData(table, multiRowSelection);
    downloadDataAsCSV({
      csvData: csvData,
      delimiter: ",",
      fileName: `table_raw.csv`,
    });
  }, [table, multiRowSelection]);

  const columnsOption = useMemo(() => {
    const res: { value: string; label: string }[] = [];
    currentColumns.forEach((column, index) => {
      //@ts-expect-error dmmm
      if (!(multiRowSelection && index === 0) && !column.custom) {
        const label = column.header;
        res.push({
          //@ts-expect-error dmmm
          value: column.id || column.accessorKey,
          label: isString(label) ? label : "-",
        });
      }
    });
    return res;
  }, [multiRowSelection, currentColumns]);

  const onPageChange = useCallback(
    (pageNumber: number, pageSize: number) => {
      const paginationUpdate = { pageIndex: pageNumber - 1, pageSize };
      setPagination(paginationUpdate);
      onPaginationChange?.(paginationUpdate, table);
      if (serverSidePagination) {
        table.resetRowSelection();
        restCellSelection();
      }
    },
    [onPaginationChange, table, serverSidePagination, restCellSelection]
  );

  const handleClickRefresh = useCallback(() => {
    onRefresh?.(table);
  }, [onRefresh, table]);

  return (
    <div
      ref={containerRef}
      css={[
        applyContainerStyle(),
        applyBoxStyle(props),
        applyBorderedStyle(bordered),
      ]}
      style={{ padding: "" }}
    >
      {loading && (
        <Stack sx={{ color: "grey.500" }} spacing={2} direction="row">
          <CircularProgress color="secondary" />
        </Stack>
      )}
      <div css={spinStyle}>
        <TableContext.Provider value={contextProps}>
          <table
            css={applyTableStyle(tableLayout)}
            {...deleteCssProps(otherProps)}
          >
            {showHeader && (
              <Thead pinedHeader={pinedHeader}>
                {table.getHeaderGroups().map((headerGroup) => (
                  <Tr key={headerGroup.id} hoverable>
                    {headerGroup.headers.map((header) => {
                      const lastCol =
                        headerGroup.headers.indexOf(header) ===
                        headerGroup.headers.length - 1;

                      const handleResizeEvent = (event: SyntheticEvent) => {
                        header.getResizeHandler()(event);
                        event.stopPropagation();
                      };

                      return (
                        <Th
                          w={`${header.getSize()}px`}
                          key={header.id}
                          colSpan={header.colSpan}
                          colIndex={headerGroup.headers.indexOf(header)}
                          rowIndex={table
                            .getHeaderGroups()
                            .indexOf(headerGroup)}
                          lastCol={lastCol}
                          lastRow={
                            table.getHeaderGroups().indexOf(headerGroup) ===
                            table.getHeaderGroups().length - 1
                          }
                          customCellPadding={customCellPadding}
                        >
                          <div
                            css={applyPreContainer(align)}
                            onClick={() => header.column.toggleSorting()}
                          >
                            {header.isPlaceholder ? null : (
                              <span css={headerStyle}>
                                {flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                              </span>
                            )}
                            {header.column.getCanSort() &&
                              (header.column.getIsSorted() ? (
                                header.column.getIsSorted() === "desc" ? (
                                  <SorterDownIcon css={applyHeaderIconLeft} />
                                ) : (
                                  <SorterUpIcon css={applyHeaderIconLeft} />
                                )
                              ) : (
                                <Tooltip title="Default">
                                  <svg
                                    css={applyHeaderIconLeft}
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                  >
                                    <path
                                      d="M6.216 9.324A.208.208 0 0 1 6.389 9h3.222c.166 0 .265.185.173.324l-1.368 2.052a.5.5 0 0 1-.832 0L6.216 9.324zM6.216 6.676A.208.208 0 0 0 6.389 7h3.222a.208.208 0 0 0 .173-.324L8.416 4.624a.5.5 0 0 0-.832 0L6.216 6.676z"
                                      fill="#C2C2C2"
                                    />
                                  </svg>
                                </Tooltip>
                                // <SorterDefaultIcon  css={applyHeaderIconLeft} />
                              ))}
                          </div>
                          {header.column.getCanResize() && !lastCol ? (
                            <div
                              css={tableResizerStyle}
                              onTouchStart={handleResizeEvent}
                              onMouseDown={handleResizeEvent}
                              onMouseDownCapture={handleResizeEvent}
                              onTouchStartCapture={handleResizeEvent}
                            />
                          ) : null}
                        </Th>
                      );
                    })}
                  </Tr>
                ))}
              </Thead>
            )}
            <TBody>
              {table.getRowModel().rows.map((row, index) => (
                <Tr
                  key={row.id}
                  hoverable
                  selected={enableRowSelection ? row.getIsSelected() : false}
                  onClick={() => {
                    if (enableRowSelection && !multiRowSelection) {
                      row.toggleSelected(true);
                    }
                    onRowClick?.(row, index);
                  }}
                >
                  {row.getVisibleCells().map((cell) => {
                    const bgColor =
                      cell.column.columnDef.meta?.getBackgroundColor?.(
                        cell.getContext()
                      );
                    return (
                      <Td
                        w={`${cell.column.getSize()}px`}
                        key={cell.id}
                        colIndex={row.getVisibleCells().indexOf(cell)}
                        rowIndex={table.getRowModel().rows.indexOf(row)}
                        lastCol={
                          row.getVisibleCells().indexOf(cell) ===
                          row.getVisibleCells().length - 1
                        }
                        lastRow={
                          table.getRowModel().rows.indexOf(row) ===
                          table.getRowModel().rows.length - 1
                        }
                        customCellPadding={customCellPadding}
                        css={[
                          cell.column.columnDef?.meta?.style,
                          applyTableCellBackgroundStyle(bgColor),
                        ]}
                        selected={selectedCell === cell.id}
                        onClick={(e) => {
                          if (
                            multiRowSelection &&
                            cell.column.id === MULTI_ROW_SELECTION_CHECKBOX_ID
                          ) {
                            row.getToggleSelectedHandler()(e);
                          }
                          if (enableSingleCellSelection) {
                            setSelectedCell(cell.id);
                            onCellSelectionChange?.(cell);
                          }
                        }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </Td>
                    );
                  })}
                </Tr>
              ))}
              {table.getRowModel().rows.length ? null : (
                <tr>
                  <td colSpan={99} style={{ textAlign: "center" }}>
                    <Empty
                      opac={serverSidePagination && loading ? 0 : undefined}
                      {...emptyProps}
                    />
                  </td>
                </tr>
              )}
            </TBody>
            {showFooter && (
              <TFoot>
                {table.getFooterGroups().map((footerGroup) => (
                  <Tr key={footerGroup.id} hoverable>
                    {footerGroup.headers.map((header) => (
                      <Th
                        key={header.id}
                        colSpan={header.colSpan}
                        colIndex={footerGroup.headers.indexOf(header)}
                        rowIndex={table.getHeaderGroups().indexOf(footerGroup)}
                        lastCol={
                          footerGroup.headers.indexOf(header) ===
                          footerGroup.headers.length - 1
                        }
                        lastRow={
                          table.getHeaderGroups().indexOf(footerGroup) ===
                          table.getHeaderGroups().length - 1
                        }
                        customCellPadding={customCellPadding}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.footer,
                              header.getContext()
                            )}
                      </Th>
                    ))}
                  </Tr>
                ))}
              </TFoot>
            )}
          </table>
        </TableContext.Provider>
      </div>
      {overFlow === "pagination" || download || filter ? (
        <div css={toolBarStyle}>
          <div css={applyActionButtonStyle(overFlow === "pagination")}>
            {refresh ? (
              <Button
                variant={"text"}
                sx={{ color: "grayBlue" }}
                startIcon={<RefreshIcon sx={{ fontSize: "16px" }} />}
                onClick={handleClickRefresh}
              />
            ) : null}
            {download ? (
              <Button
                sx={{ color: "grayBlue" }}
                variant={"text"}
                startIcon={<DownloadIcon sx={{ fontSize: "16px" }} />}
                onClick={downloadTableDataAsCsv}
              />
            ) : null}
            {/* {downloadRawData ? (
              <div css={downloadRawStyle}>
                <Button
                  sx={{ position: "relative", color: "grayBlue" }}
                  variant={"text"}
                  startIcon={
                    <div>
                      <DownloadIcon sx={{fontSize:"16px"}} />
                    </div>
                  }
                  onClick={downloadTableRawDataAsCsv}
                />
                <div css={downloadTipStyle}>-</div>
              </div>
            ) : null} */}
            {filter ? (
              <TableFilter
                key={columnFilters?.length}
                colorScheme={colorScheme}
                filterOperator={filterOperator}
                filterOption={filterOption}
                columnsOption={columnsOption}
                onChange={(filters, operator) => {
                  setFilterOption(filters);
                  setColumnFilters(filters);
                  setFilterOperator(operator);
                  onGlobalFiltersChange?.(filters, operator);
                }}
              />
            ) : null}
          </div>
          {overFlow === "pagination" ? (
            <Pagination
              {...pagination}
              total={
                serverSidePagination && isNumber(total)
                  ? total
                  : Object.keys(table.getRowModel().rowsById).length
              }
              pageSize={pageSize}
              current={pageIndex + 1}
              hideOnSinglePage={false}
              simple
              onChange={onPageChange}
            />
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

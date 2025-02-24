import { FC, useMemo } from "react";
import { FilterFn, FilterOperator, FiltersEditorProps } from "./interface";
import {
  editorButtonStyle,
  editorStyle,
  filterLabelStyle,
  filterStyle,
} from "./style";
import { FilterOperatorOptions, FilterOptions } from "./utils";
import Select from "@mui/material/Select";
import { Button, MenuItem, TextField } from "@mui/material";
import { isString } from "lodash-es";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { globalColor } from "../colorBuilder";
export const FiltersEditor: FC<FiltersEditorProps> = (props) => {
  const {
    filterOperator,
    columnFilters,
    columnsOption,
    onDelete,
    onAdd,
    onChange,
    onChangeOperator,
    colorScheme,
  } = props;

  const recordList = useMemo(() => {
    return (
      <>
        {columnFilters.map((filter, index) => {
          const { id, value, filterFn } = filter;
          return (
            <div css={filterStyle} key={index}>
              <div css={filterLabelStyle}>
                {index === 0 ? (
                  "Where"
                ) : index === 1 ? (
                  <Select
                    sx={{
                      width: "86px",
                      marginRight: "12px",
                      color: colorScheme,
                    }}
                    size="small"
                    value={filterOperator}
                    onChange={(e) => {
                      onChangeOperator(e.target.value as FilterOperator);
                    }}
                  >
                    {FilterOperatorOptions?.map((e) => {
                      return (
                        <MenuItem key={e.value} value={e.value}>
                          {e.label}
                        </MenuItem>
                      );
                    })}
                  </Select>
                ) : (
                  filterOperator
                )}
              </div>
              <Select
                sx={{
                  width: "200px",
                  marginRight: "12px",
                  color: colorScheme,
                }}
                size="small"
                value={id}
                onChange={(e) => {
                  onChange(index, { ...filter, id: e.target.value as string });
                }}
              >
                {columnsOption?.map((e) => {
                  return (
                    <MenuItem key={e.value} value={e.value}>
                      {e.label}
                    </MenuItem>
                  );
                })}
              </Select>
              <Select
                sx={{
                  width: "200px",
                  color: colorScheme,
                }}
                size="small"
                value={filterFn as string}
                onChange={(e) => {
                  if (e.target.value != null) {
                    const option = e.target.value as FilterFn;
                    onChange(index, {
                      ...filter,
                      filterFn: option,
                    });
                  }
                }}
              >
                {FilterOptions?.map((e) => {
                  return (
                    <MenuItem key={e.value} value={e.value}>
                      {e.label}
                    </MenuItem>
                  );
                })}
              </Select>
              <TextField
                sx={{ width: "200px", margin: "8px 4px" }}
                disabled={
                  (filterFn as string) === "empty" ||
                  (filterFn as string) === "notEmpty"
                }
                size="small"
                value={isString(value) ? value : undefined}
                onChange={(e) => {
                  onChange(index, { ...filter, value: e.target.value });
                }}
              />

              <Button
                variant="text"
                sx={{ color: "gray" }}
                onClick={() => {
                  onDelete(index, filter);
                }}
                startIcon={
                  <DeleteIcon sx={{ color: globalColor(`grayBlue-06`) }} />
                }
              />
            </div>
          );
        })}
      </>
    );
  }, [
    colorScheme,
    columnFilters,
    columnsOption,
    filterOperator,
    onChange,
    onChangeOperator,
    onDelete,
  ]);

  return (
    <div css={editorStyle}>
      {recordList}
      <span css={editorButtonStyle}>
        <Button
          variant="text"
          sx={{ color: colorScheme, padding: "1px 8px" }}
          onClick={onAdd}
          startIcon={<AddIcon sx={{ color: globalColor(`techPurple-03`) }} />}
        >
          New
        </Button>
      </span>
    </div>
  );
};

FiltersEditor.displayName = "FiltersEditor";

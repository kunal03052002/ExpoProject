/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDrop } from "react-dnd";
// import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux";
import { useScroll } from "react-use";
import useMeasure from "react-use-measure";
import { getIsIMPAKTEditMode, isShowDot } from "@/redux/config/configSelector";
import {
  getContainerListDisplayNameMappedChildrenNodeDisplayName,
  isCurrentNodeDisable,
} from "@/redux/currentApp/components/componentsSelector";
import { componentsActions } from "@/redux/currentApp/components/componentsSlice";
import {
  // getComponentMap,
  getIsDragging,
  getIsResizing,
} from "@/redux/currentApp/executionTree/executionSelector";
import { getClientWidgetLayoutInfo } from "@/redux/currentApp/layoutInfo/layoutInfoSelector";
import { newGenerateComponentNode } from "@/utils/generators/generateComponentNode";
import { ContainerEmptyState } from "@/widgetLibrary/ContainerWidget/emptyState";
import {
  DropCollectedProps,
  DropResultInfo,
  RenderComponentCanvasContainerProps,
} from "./interface";
import {
  applyComponentCanvasStyle,
  componentCanvasContainerStyle,
  // containerShapeStyle,
  dropZoneStyle,
  outerComponentCanvasContainerStyle,
  selectoSelectionStyle,
} from "./style";
import {
  ADD_ROWS,
  DEFAULT_BODY_COLUMNS_NUMBER,
  SAFE_ROWS,
  SCROLL_CONTAINER_PADDING,
  UNIT_HEIGHT,
} from "../../constant/canvas";
import { getPaddingShape } from "../../utils/styleutils/padding";
import {
  DRAG_EFFECT,
  DragInfo,
} from "../../../scaleSquare/components/DragContainer/interface";
import { getLayoutInfosWithRelativeCombineShape } from "../../utils/getDropResult";
import { clamWidgetShape } from "../../utils/getDragShadow";
import { sendMousePositionHandler } from "../../utils/sendBinaryMessage";
import {
  removeScrollBarContainerControllerByDisplayName,
  setScrollBarContainerController,
} from "../../context/scrollBarContext";
import { useAutoUpdateCanvasHeight } from "@/utils/autoUpdateHeight";
import { useMousePositionAsync } from "../../hooks/useMousePostionAsync";
import { useResizingUpdateRealTime } from "../../../scaleSquare/components/ResizingAndDragContainer/ResizeHandler/hooks";
import { DragShadowPreview } from "../DragShadowPreview";
import { MousePreview } from "../MousePreview";
import ComponentParser from "../ComponentParser/index";
import DragPreview from "../DragPreview";
// import _ from "lodash"

export const RenderComponentCanvasContainer: FC<
  RenderComponentCanvasContainerProps
> = (props) => {
  const {
    columnNumber = DEFAULT_BODY_COLUMNS_NUMBER,
    isRootCanvas,
    displayName,
    containerPadding,
    canResizeCanvas = false,
    safeRowNumber = SAFE_ROWS,
    minHeight,
    background,
    shadowSize = "none",
    handleUpdateHeight,
    isGridCanvas = false,
  } = props;

  const containerListMapChildName = useSelector(
    getContainerListDisplayNameMappedChildrenNodeDisplayName
  );

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const firstDragRef = useRef(true);
  const dragStartScrollTop = useRef(0);
  const { y: scrollContainerScrollTop } = useScroll(scrollContainerRef);
  const [canvasRef, bounds] = useMeasure();
  // const messageHandler = useMessage()
  const innerCanvasRef = useRef<HTMLDivElement | null>(null);
  // const { t } = useTranslation()
  const paddings = getPaddingShape(containerPadding);
  const fixedBounds = {
    top: bounds.top + paddings.paddingTop + SCROLL_CONTAINER_PADDING,
    left: bounds.left + paddings.paddingLeft + SCROLL_CONTAINER_PADDING,
    width:
      bounds.width -
      (paddings.paddingLeft +
        paddings.paddingRight +
        SCROLL_CONTAINER_PADDING * 2),
    height:
      bounds.height -
      (paddings.paddingTop +
        paddings.paddingBottom +
        SCROLL_CONTAINER_PADDING * 2),
  };

  const canShowDot = useSelector(isShowDot);
  const unitWidth = fixedBounds.width / columnNumber;
  const [canvasHeight, setCanvasHeight] = useState<number>(fixedBounds.height);
  const widgetLayoutInfo: any = useSelector(getClientWidgetLayoutInfo);
  const childWidgetLayoutInfo = Object.values(widgetLayoutInfo).filter(
    (item: any) => item.parentNode === displayName
  );
  const dispatch = useDispatch();
  const isDraggingGlobal = useSelector(getIsDragging);
  const isResizingGlobal = useSelector(getIsResizing);
  // const isLikeProductMode = useSelector(getIsLikeProductMode)
  const isEditMode = useSelector(getIsIMPAKTEditMode);
  const currentLayoutInfo = widgetLayoutInfo[displayName];

  const [collectedProps, dropRef] = useDrop<
    DragInfo,
    DropResultInfo,
    DropCollectedProps
  >(
    () => ({
      accept: ["components"],
      canDrop: () => {
        return isEditMode;
      },
      drop: (dropItem, monitor) => {
        const didDrop = monitor.didDrop();
        if (
          !monitor.isOver({
            shallow: true,
          }) &&
          didDrop
        ) {
          return {
            isDropOnCanvas: !!monitor.getDropResult()?.isDropOnCanvas,
          };
        }
        const { draggedComponents, dropResult, dragEffect } = dropItem;
        const originParentNode = draggedComponents[0].parentNode;
        if (dropResult && !dropResult.shape && !dropResult.canDrop) {
          return {
            isDropOnCanvas: false,
          };
        }

        if (!dropResult || !dropResult.shape) {
          return {
            isDropOnCanvas: false,
          };
        }

        const hasTable = draggedComponents.some(
          (components) => components.widgetType === "TABLE_WIDGET"
        );
        const isListChildrenCanvas = Object.values(
          containerListMapChildName
        ).some((childDisplayNames) => childDisplayNames.includes(displayName));

        if (hasTable && isListChildrenCanvas) {
          return {
            isDropOnCanvas: false,
          };
        }

        const {
          shape: dropResultShape,
          columnNumberWhenDrag,
          columnNumberWhenDrop, 
        } = dropResult;

        if (draggedComponents.length === 1) {
          switch (dragEffect) {
            case DRAG_EFFECT.ADD: {
              const newComponentNode = newGenerateComponentNode(
                draggedComponents[0].widgetType,
                draggedComponents[0].displayName,
                displayName,
                [],
                columnNumberWhenDrop / columnNumberWhenDrag
              );

              dispatch(
                componentsActions.addComponentReducer([{ ...newComponentNode }])
              );

              break;
            }
            case DRAG_EFFECT.UPDATE: {
              const updateSlices = [
                {
                  displayName: draggedComponents[0].displayName,
                  x: isGridCanvas ? -1 : dropResultShape.x,
                  y: isGridCanvas ? -1 : dropResultShape.y,
                  w: dropResultShape.w,
                  h: draggedComponents[0].layoutInfo.h,
                },
              ];
              dispatch(
                componentsActions.updateComponentPositionReducer({
                  oldParentNodeDisplayName: originParentNode,
                  newParentNodeDisplayName: displayName,
                  updateSlices,
                  columnNumberWhenDrag,
                  columnNumberWhenDrop,
                })
              );
            }
          }
        }

        if (draggedComponents.length > 1 && dragEffect === DRAG_EFFECT.UPDATE) {
          const relativeLayoutInfo =
            getLayoutInfosWithRelativeCombineShape(draggedComponents);
          const updateSlices = relativeLayoutInfo.map((item) => {
            const shape = clamWidgetShape(
              {
                x: isGridCanvas ? -1 : item.layoutInfo.x + dropResultShape.x,
                y: isGridCanvas ? -1 : item.layoutInfo.y + dropResultShape.y,
                w: item.layoutInfo.w,
                h: item.layoutInfo.h,
              },
              columnNumber,
              draggedComponents.length > 1
            );
            return {
              ...shape,
              h: shape.previewH,
              displayName: item.displayName,
            };
          });
          dispatch(
            componentsActions.updateComponentPositionReducer({
              oldParentNodeDisplayName: originParentNode,
              newParentNodeDisplayName: displayName,
              updateSlices,
              columnNumberWhenDrag,
              columnNumberWhenDrop,
            })
          );
        }

        const mousePosition = cursorPositionRef.current;
        sendMousePositionHandler(
          displayName,
          mousePosition.xInteger,
          mousePosition.yInteger,
          mousePosition.xMod,
          mousePosition.yMod
        );

        return {
          isDropOnCanvas: true,
        };
      },
      collect: (monitor) => {
        return {
          isOver: monitor.isOver({ shallow: true }),
        };
      },
    }),
    [
      isEditMode,
      unitWidth,
      fixedBounds,
      scrollContainerScrollTop,
      displayName,
      containerListMapChildName,
    ]
  );

  const autoScrollTimeID = useRef<number>(0);

  setScrollBarContainerController(displayName, scrollContainerRef);

  useEffect(() => {
    return () => {
      removeScrollBarContainerControllerByDisplayName(displayName);
    };
  }, [displayName]);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;
    const autoScroll = (e: MouseEvent) => {
      if (
        (!collectedProps.isOver &&
          scrollContainer.dataset.isDraggingOver !== "true") ||
        !scrollContainer ||
        !isRootCanvas
      ) {
        return;
      }
      const { top, bottom } = scrollContainer.getBoundingClientRect();
      const { clientY } = e;
      window.clearInterval(autoScrollTimeID.current);
      autoScrollTimeID.current = window.setInterval(() => {
        if (clientY < top + UNIT_HEIGHT * safeRowNumber) {
          scrollContainer!.scrollBy({
            top: -8,
          });
        }
        if (clientY > bottom - UNIT_HEIGHT * safeRowNumber) {
          scrollContainer!.scrollBy({
            top: 8,
          });
        }
      }, 160);
    };
    scrollContainer?.addEventListener("mousemove", autoScroll);
    return () => {
      if (scrollContainer) {
        scrollContainer?.removeEventListener("mousemove", autoScroll);
      }
      window.clearInterval(autoScrollTimeID.current);
    };
  }, [collectedProps.isOver, isResizingGlobal, isRootCanvas, safeRowNumber]);

  const isDraggingOver =
    scrollContainerRef.current?.dataset.isDraggingOver === "true";

  const prevMaxHeight = useRef<number>(0);
  const maxHeight = Math.max(
    ...childWidgetLayoutInfo.map(
      (item: any) => item.layoutInfo.y + item.layoutInfo.h
    )
  );
  useEffect(() => {
    if (
      isDraggingOver &&
      isFinite(maxHeight) &&
      maxHeight > prevMaxHeight.current
    ) {
      prevMaxHeight.current = maxHeight;
    }
    if (!isDraggingOver) {
      prevMaxHeight.current = maxHeight;
    }
  }, [isDraggingOver, maxHeight]);

  useEffect(() => {
    const innerCanvasDOM = innerCanvasRef.current;
    if (!innerCanvasDOM) return;
    const innerCanvasDOMRect = innerCanvasDOM.getBoundingClientRect();

    if (
      isFinite(maxHeight) &&
      prevMaxHeight.current > maxHeight &&
      isResizingGlobal
    ) {
      return;
    }

    if (canResizeCanvas) {
      if (isFinite(maxHeight)) {
        setCanvasHeight(maxHeight * UNIT_HEIGHT);
      } else {
        setCanvasHeight(minHeight as number);
      }
      return;
    }

    if (maxHeight * UNIT_HEIGHT < fixedBounds.height) {
      setCanvasHeight(fixedBounds.height);
      return;
    }

    if (
      maxHeight * UNIT_HEIGHT >=
      innerCanvasDOMRect.height - UNIT_HEIGHT * ADD_ROWS
    ) {
      if (isEditMode && isRootCanvas) {
        setCanvasHeight(maxHeight * UNIT_HEIGHT + UNIT_HEIGHT * ADD_ROWS);
      } else {
        setCanvasHeight(maxHeight * UNIT_HEIGHT);
      }
      return;
    }

    setCanvasHeight(maxHeight * UNIT_HEIGHT);
  }, [
    canResizeCanvas,
    fixedBounds.height,
    isEditMode,
    isResizingGlobal,
    isRootCanvas,
    maxHeight,
    minHeight,
  ]);

  useEffect(() => {
    if (firstDragRef.current && isDraggingGlobal) {
      firstDragRef.current = false;
      dragStartScrollTop.current = scrollContainerScrollTop;
      return;
    }
    if (!isDraggingGlobal) {
      firstDragRef.current = true;
      dragStartScrollTop.current = scrollContainerScrollTop;
    }
  }, [isDraggingGlobal, scrollContainerScrollTop]);

  const canvasUpdateHeightHandler = useCallback(
    (height: number) => {
      if (!handleUpdateHeight) return;
      handleUpdateHeight(
        height +
          SCROLL_CONTAINER_PADDING * 2 +
          paddings.paddingTop +
          paddings.paddingBottom
      );
    },
    [handleUpdateHeight, paddings.paddingBottom, paddings.paddingTop]
  );

  useAutoUpdateCanvasHeight(
    canvasUpdateHeightHandler,
    innerCanvasRef.current,
    canResizeCanvas
  );

  const { cursorPositionRef } = useMousePositionAsync(
    scrollContainerRef,
    unitWidth,
    displayName,
    isRootCanvas,
    scrollContainerRef
  );
  useResizingUpdateRealTime(isDraggingOver);
  const isDisabled = useMemo(
    () => isCurrentNodeDisable(displayName),
    [displayName]
  );
  return (
    <div
      css={outerComponentCanvasContainerStyle(
        containerPadding,
        background,
        shadowSize
      )}
      data-outer-canvas-container={displayName}
      ref={isDisabled ? null : canvasRef}
    >
      <div
        css={componentCanvasContainerStyle}
        ref={scrollContainerRef}
        data-scroll-container={displayName}
        data-column-number={columnNumber}
        data-unit-width={unitWidth}
        data-is-dragging-over={false}
        className="scroll-container"
      >
        <div
          ref={(node) => {
            isDisabled ? null : dropRef(node);
            innerCanvasRef.current = isDisabled ? null : node;
          }}
          css={dropZoneStyle(canvasHeight)}
        >
          <div
            css={[
              applyComponentCanvasStyle(unitWidth, canShowDot),
              selectoSelectionStyle,
            ]}
            data-isroot={isRootCanvas}
            data-canvas-container={displayName}
            data-column-number={columnNumber}
            data-unit-width={unitWidth}
          >
            {isEditMode && (
              <DragShadowPreview
                unitW={unitWidth}
                parentDisplayName={displayName}
                columns={columnNumber}
              />
            )}
            {isEditMode && (
              <MousePreview unitW={unitWidth} displayName={displayName} />
            )}
            {currentLayoutInfo?.childrenNode?.length > 0 && !isGridCanvas ? (
              currentLayoutInfo?.childrenNode?.map((childName: any) => {
                return (
                  <ComponentParser
                    key={`${displayName}-${childName}`}
                    displayName={childName}
                    unitW={unitWidth}
                    parentNodeDisplayName={displayName}
                    columnNumber={columnNumber}
                  />
                );
              })
            ) : isRootCanvas ? null : (
              <ContainerEmptyState
                isInner
                containerPadding={containerPadding}
              />
            )}
            {collectedProps.isOver && isEditMode && (
              <DragPreview
                unitW={unitWidth}
                parentNodeDisplayName={displayName}
                columnNumber={columnNumber}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

RenderComponentCanvasContainer.displayName = "RenderComponentCanvasContainer";
export default RenderComponentCanvasContainer;

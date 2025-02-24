/* eslint-disable @typescript-eslint/no-explicit-any */
import { klona } from "klona";
import { get } from "lodash-es";
import { FC, MouseEvent, useContext, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AutoHeightWithLimitedContainer } from "@/page/app/components/scaleSquare/components/AutoHeightWithLimitedContainer";
import { DEFAULT_MIN_COLUMN } from "@/page/app/components/scaleSquare/constant/widget";
import {
  getCanvasShape,
  getHoveredComponents,
  getIsIMPAKTEditMode,
  getIsLikeProductMode,
  getSelectedComponentDisplayNames,
  getSelectedScreen,
  isShowDot,
} from "@/redux/config/configSelector";
import { configActions } from "@/redux/config/configSlice";
import {
  getComponentDisplayNameMapDepth,
  isCurrentNodeDisable,
} from "@/redux/currentApp/components/componentsSelector";
import {
  getExecutionResult,
  getIsDragging,
  getResizingComponentIDs,
} from "@/redux/currentApp/executionTree/executionSelector";
import { getClientWidgetLayoutInfo } from "@/redux/currentApp/layoutInfo/layoutInfoSelector";
import store from "@/store";
import { FocusManager } from "@/utils/focusManager";
import { ShortCutContext } from "@/utils/shortcut/shortcutProvider";
import { DragContainer } from "../DragContainer/index";
import { PositionContainer } from "../PositionContainer";
import { ResizingAndDragContainerProps } from "./interface";
import { resizingGridContainerStyle, resizingPlaceholderStyle } from "./style";
import { DropList, DropListItem, Dropdown } from "@/utils/DropDown";
import { CopyManager } from "@/utils/copyManager";
// import { t } from "i18next";
import {
  ILLA_MIXPANEL_EVENT_TYPE,
  trackInEditor,
} from "@/utils/mixpanelHelper";
import { ScreenPayload } from "@/redux/config/configState";

export const ResizingAndDragContainer: FC<ResizingAndDragContainerProps> = (
  props
) => {
  const {
    unitW,
    displayName,
    children,
    widgetHeight,
    widgetTop,
    widgetLeft,
    widgetType,
    columnNumber,
    parentNodeDisplayName,
  } = props;
  const isEditMode = useSelector(getIsIMPAKTEditMode);
  const selectedComponents = useSelector(getSelectedComponentDisplayNames);
  const executionResult = useSelector(getExecutionResult);
  const currentWidgetProps = get(executionResult, displayName, {});
  const isShownDot = useSelector(isShowDot);
  const isDraggingStateInGlobal = useSelector(getIsDragging);
  const shortcut = useContext(ShortCutContext);
  const isAutoLimitedMode =
    get(currentWidgetProps, `dynamicHeight`, "fixed") === "limited";
  const isSelected = useMemo(() => {
    return selectedComponents.some((currentDisplayName) => {
      return displayName === currentDisplayName;
    });
  }, [displayName, selectedComponents]);
  const dispatch = useDispatch();
  const resizingIDs = useSelector(getResizingComponentIDs);
  const isResizingCurrent = resizingIDs.includes(displayName);
  const isGlobalResizing = resizingIDs.length > 0;
  const canDrag = widgetType !== "MODAL_WIDGET";
  // const isGridCanvas = useSelector(getIsGridCanvas);
  const hoveredComponents = useSelector(getHoveredComponents);
  const isMouseOver =
    hoveredComponents[hoveredComponents.length - 1] === displayName;
  const selected = useSelector(getSelectedComponentDisplayNames);
  const isLikeProductionMode = useSelector(getIsLikeProductMode);
  const handleOnSelection = (e: MouseEvent<HTMLDivElement>) => {
    const rootState = store.getState();
    const isEditMode = getIsIMPAKTEditMode(rootState);
    if (isGlobalResizing || !isEditMode || selected[0] == "GridContainer1")
      return;
    const displayNameMapDepth = getComponentDisplayNameMapDepth(rootState);
    const widgetExecutionLayoutInfo = getClientWidgetLayoutInfo(rootState);
    FocusManager.switchFocus("canvas", {
      displayName: displayName,
      type: "component",
      clickPosition: [],
    });
    trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.SELECT, {
      element: "component",
      parameter1: "click",
    });
    e.stopPropagation();
    if (e.metaKey || e.shiftKey || e.ctrlKey) {
      let currentSelectedDisplayName = klona(selectedComponents);
      const index = currentSelectedDisplayName.findIndex(
        (currentDisplayName) => displayName === currentDisplayName
      );
      if (index !== -1) {
        currentSelectedDisplayName.splice(index, 1);
      } else {
        currentSelectedDisplayName.push(displayName);
      }

      const depths = currentSelectedDisplayName.map((displayName) => {
        return displayNameMapDepth[displayName];
      });
      const isEqual = depths.every((depth) => depth === depths[0]);
      if (!isEqual) {
        return;
      }
      if (currentSelectedDisplayName.length > 1) {
        const firstParentNode =
          widgetExecutionLayoutInfo[currentSelectedDisplayName[0]].parentNode;
        const isSameParentNode = currentSelectedDisplayName.every(
          (displayName) => {
            const parentNode =
              widgetExecutionLayoutInfo[displayName].parentNode;
            return parentNode === firstParentNode;
          }
        );
        if (!isSameParentNode) {
          const lastParentNode =
            widgetExecutionLayoutInfo[
              currentSelectedDisplayName[currentSelectedDisplayName.length - 1]
            ].parentNode;
          currentSelectedDisplayName = currentSelectedDisplayName.filter(
            (displayName) => {
              const currentParentNode =
                widgetExecutionLayoutInfo[displayName].parentNode;
              return lastParentNode === currentParentNode;
            }
          );
        }
      }
      currentSelectedDisplayName = Array.from(
        new Set(currentSelectedDisplayName)
      );
      dispatch(
        configActions.updateSelectedComponent(currentSelectedDisplayName)
      );
      return;
    }
    if (!isCurrentNodeDisable(displayName)) {
      dispatch(configActions.updateSelectedComponent([displayName]));
    }
  };

  const canvasShape = useSelector(getCanvasShape);
  const Screen: ScreenPayload = useSelector(getSelectedScreen);
  const actualWidth = useMemo(() => {
    if (!isEditMode) {
      return "100%";
    }
    return widgetType === "GridCONTAINER_WIDGET" ||
      widgetType === "FORM_WIDGET" ||
      widgetType === "TABLE_WIDGET" ||
      widgetType === "CONTAINER_WIDGET"
      ? Screen == "Mobile"
        ? `${380}px`
        : Screen == "Tablet"
        ? `${800}px`
        : `${canvasShape.canvasWidth - 10}px`
      : "100%";
  }, [Screen, canvasShape.canvasWidth, isEditMode, widgetType]);
  const isDisabled = isCurrentNodeDisable(displayName);
  return (
    <>
      <PositionContainer
        x={widgetLeft + 10}
        y={widgetTop + 10}
        displayName={displayName}
      >
        <Dropdown
          disabled={!isEditMode || isDisabled}
          position="right-start"
          trigger="contextmenu"
          dropList={
            <DropList w="184px">
              <DropListItem
                value="duplicate"
                // title={t("editor.context_menu.duplicate")}
                onClick={() => {
                  CopyManager.copyComponentNodeByDisplayName([displayName]);
                  CopyManager.paste("duplicate");
                }}
              />
              <DropListItem
                deleted
                value="delete"
                // title={t("editor.context_menu.delete")}
                onClick={() => {
                  shortcut.showDeleteDialog([displayName], "widget", {
                    source: "manage_delete",
                  });
                }}
              />
            </DropList>
          }
          onVisibleChange={(visible) => {
            if (visible) {
              trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.SHOW, {
                element: "component_management_canvas",
                parameter1: widgetType,
              });
            }
          }}
        >
          <div
            style={
              isEditMode
                ? {
                    background: Screen !== "Desktop" && "#c2c7cf",
                    display: "flex",
                    height: "auto",
                    justifyContent: "center",
                  }
                : {
                    display: "flex",
                    justifyContent: "center",
                  }
            }
          >
            <div
              data-displayname={displayName}
              data-parentnode={parentNodeDisplayName}
              onClick={handleOnSelection}
              css={resizingGridContainerStyle(
                {
                  width: actualWidth,
                  height: widgetHeight,
                  minWidth: DEFAULT_MIN_COLUMN,
                },
                {
                  isLikeProductionMode,
                  isSelected,
                  hasEditors: true,
                  isHover: isMouseOver,
                  isDragging: false,
                  shownDot: isShownDot,
                }
              )}
            >
              <DragContainer
                displayName={displayName}
                parentNodeDisplayName={parentNodeDisplayName}
                canDrag={canDrag}
                unitWidth={unitW}
                columnNumber={columnNumber}
              >
                {isResizingCurrent ? (
                  <div css={resizingPlaceholderStyle} />
                ) : (
                  <>
                    {children}
                    {isEditMode &&
                      isSelected &&
                      !isDraggingStateInGlobal &&
                      isAutoLimitedMode && (
                        <AutoHeightWithLimitedContainer
                          containerHeight={widgetHeight}
                          displayName={displayName}
                        />
                      )}
                  </>
                )}
              </DragContainer>
            </div>
          </div>
        </Dropdown>
      </PositionContainer>
    </>
  );
};

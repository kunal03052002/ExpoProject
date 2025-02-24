/* eslint-disable @typescript-eslint/no-explicit-any */

import { FC } from "react";
import { useDrag } from "react-dnd";
import { useSelector } from "react-redux";
// import { DropResultInfo } from "@/page/app/components/DotPanel/components/Canvas/interface";
import { illaSnapshot } from "@/page/app/components/dotPanel/constant/snapshotNew";
import {
  sendMousePositionHandler,
  sendShadowMessageHandler,
} from "@/page/app/components/dotPanel/utils/sendBinaryMessage";
import {
  getIsIMPAKTEditMode,
  getSelectedComponentDisplayNames,
} from "@/redux/config/configSelector";
import { getIsResizing } from "@/redux/currentApp/executionTree/executionSelector";
import { getClientWidgetLayoutInfo } from "@/redux/currentApp/layoutInfo/layoutInfoSelector";
import store from "@/store";
import { endDragMultiNodes, startDragMultiNodes } from "@/utils/drag/drag";
import {
  DRAG_EFFECT,
  DragContainerProps,
  DragInfo,
  //  DragInfo
} from "./interface";
import { dragContainerStyle } from "./style";
import { WidgetLayoutInfo } from "@/redux/currentApp/layoutInfo/layoutInfoState";
import {
  ILLA_MIXPANEL_EVENT_TYPE,
  trackInEditor,
} from "@/utils/mixpanelHelper";
import { isCurrentNodeDisable } from "@/redux/currentApp/components/componentsSelector";
import { DropResultInfo } from "../../../dotPanel/components/Canvas/interface";

export const DragContainer: FC<DragContainerProps> = (props) => {
  const {
    children,
    displayName,
    canDrag = true,
    columnNumber,
    unitWidth,
    parentNodeDisplayName,
  } = props;
  const isEditMode = useSelector(getIsIMPAKTEditMode);
  const isResizingStateInGlobal = useSelector(getIsResizing);
  const selectedComponents = useSelector(getSelectedComponentDisplayNames);
  const [, dragRef] = useDrag<DragInfo, DropResultInfo,any>(
    () => ({
      type: "GRID",
      canDrag: isEditMode && canDrag,
      collect: (monitor) => {
        return {
          isDragging: monitor.isDragging(),
        };
      },
      end: (draggedItem, monitor) => {
        const dropResult: any = monitor.getDropResult();
        sendShadowMessageHandler(-1, "", [], 0, 0, 0, 0, 0, 0, 0, 0);
        const { draggedComponents } = draggedItem;
        const widgetTypes = draggedComponents.map((node) => node.widgetType);
        trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.DRAG, {
          element: "component",
          parameter1: widgetTypes,
        });
        endDragMultiNodes(
          draggedComponents,
          !!dropResult?.isDropOnCanvas,
          false
        );
      },
      item: () => {
        const rootState = store.getState();
        const allWidgetLayoutInfo: Record<string, WidgetLayoutInfo> | any =
          getClientWidgetLayoutInfo(rootState);
        illaSnapshot.setSnapshot(allWidgetLayoutInfo);
        const draggedSelectedComponents: WidgetLayoutInfo[] = [];
        let currentSelectedComponents = selectedComponents;
        if (!currentSelectedComponents.includes(displayName)) {
          currentSelectedComponents = [displayName];
        }
        const LayoutKeys: WidgetLayoutInfo[] =
          Object.values(allWidgetLayoutInfo);
        const draggedSelectedComponents2: WidgetLayoutInfo[] =
          LayoutKeys.filter(
            (node: WidgetLayoutInfo) =>
              currentSelectedComponents.includes(node.displayName) ||
              node.displayName === displayName
          );
        startDragMultiNodes(draggedSelectedComponents);
        sendMousePositionHandler(parentNodeDisplayName, 0, 0, 0, 0, true);
        const compType = draggedSelectedComponents2[0].widgetType;

        return {
          type:
            compType !== "GridCONTAINER_WIDGET" && compType !== "CANVAS"
              ? "Components"
              : "undraggableComponents",
          draggedComponents: draggedSelectedComponents2 || [],
          dragEffect: DRAG_EFFECT.UPDATE,
          draggedDisplayName: displayName,
          columnNumberWhenDragged: columnNumber,
          unitWWhenDragged: unitWidth,
        };
      },
    }),
    [
      isEditMode,
      isResizingStateInGlobal,
      selectedComponents,
      displayName,
      unitWidth,
      columnNumber,
      canDrag,
      parentNodeDisplayName,
    ]
  );
  const isDisabled = isCurrentNodeDisable(displayName);
  return (
    <div css={dragContainerStyle} ref={isDisabled ? null : dragRef}>
      {children}
    </div>
  );
};

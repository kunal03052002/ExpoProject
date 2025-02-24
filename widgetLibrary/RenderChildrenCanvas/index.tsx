import { FC, memo } from "react";
import { useSelector } from "react-redux";
import { getIsIMPAKTEditMode, isShowDot } from "@/redux/config/configSelector";
import { getComponentMap } from "@/redux/currentApp/components/componentsSelector";
import { RootState } from "@/store";
import { ContainerEmptyState } from "@/widgetLibrary/ContainerWidget/emptyState";
import { IRenderChildrenCanvasProps } from "./interface";
import { ComponentMapNode } from "@/utils/generators/interface";
import RenderComponentCanvasContainer from "@/page/app/components/dotPanel/components/Canvas/renderComponentCanvasContainer";
import { LIKE_CONTAINER_WIDGET_PADDING } from "@/page/app/components/scaleSquare/constant/widget";
import {
  SAFE_ROWS,
  UNIT_HEIGHT,
} from "@/page/app/components/dotPanel/constant/canvas";

export const RenderChildrenCanvas: FC<IRenderChildrenCanvasProps> = (props) => {
  const {
    columnNumber,
    canResizeCanvas = false,
    handleUpdateHeight,
    containerPadding,
    displayName,
    gridContainer,
  } = props;
  const isEditMode = useSelector(getIsIMPAKTEditMode);
  const canShowDots = useSelector(isShowDot);
  const targetNode = useSelector<RootState, ComponentMapNode>((state) => {
    const components = getComponentMap(state);
    return components[displayName];
  });

  const hasChildrenNode = targetNode?.childrenNode?.length > 0;

  if (isEditMode && ((!canShowDots && !hasChildrenNode) || !displayName)) {
    return (
      <ContainerEmptyState
        handleUpdateHeight={handleUpdateHeight}
        containerPadding={containerPadding}
      />
    );
  }

  return (
    <RenderComponentCanvasContainer
      displayName={displayName}
      containerPadding={containerPadding ?? `${LIKE_CONTAINER_WIDGET_PADDING}`}
      columnNumber={gridContainer ? 1 : columnNumber}
      handleUpdateHeight={handleUpdateHeight}
      canResizeCanvas={gridContainer ? false : canResizeCanvas}
      safeRowNumber={SAFE_ROWS}
      minHeight={canResizeCanvas ? 13 * UNIT_HEIGHT : undefined}
      isGridCanvas={!gridContainer}
      // gridContainer={gridContainer}
    />
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default memo(RenderChildrenCanvas);

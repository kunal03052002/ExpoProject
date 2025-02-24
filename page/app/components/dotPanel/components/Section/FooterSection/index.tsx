import { FC, useCallback } from "react";
import { useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
import RenderComponentCanvasContainer from "@/page/app/components/dotPanel/components/Canvas/renderComponentCanvasContainer";
import { EmptyState } from "@/page/app/components/dotPanel/components/Page/emptyState";
import {
  BASIC_CANVAS_PADDING,
  BODY_MIN_HEIGHT,
  FOOTER_MIN_HEIGHT,
} from "@/page/app/components/dotPanel/constant/canvas";
import { getCurrentDisplayName } from "@/page/app/components/dotPanel/hooks/sectionUtils";
import { getIsIMPAKTProductMode } from "@/redux/config/configSelector";
// import { componentsActions } from "@/redux/currentApp/components/componentsSlice"
import { getCurrentPageFooterSection } from "@/redux/currentApp/executionTree/executionSelector";
import { containerWrapperStyle } from "../style";
import { RenderFooterSectionProps } from "./interface";
import { applyFooterSectionWrapperStyle } from "./style";

export const RenderFooterSection: FC<RenderFooterSectionProps> = (props) => {
  const {
    bottomHeight,
    containerHeight,
    headerHeight,
    // currentPageDisplayName,
    columnNumber,
  } = props;
  const isProductionMode = useSelector(getIsIMPAKTProductMode);
  const footerNode = useSelector(getCurrentPageFooterSection);
  // const { viewPath } = useParams();

  const {
    viewSortedKey,
    currentViewIndex,
    defaultViewKey,
    sectionViewConfigs,
    style,
  } = footerNode ?? {};
  const {
    padding,
    background = "white",
    shadowSize = "none",
    dividerColor,
  } = style ?? {};
  const handleUpdateHeight = useCallback(
    (height: number) => {
      let currentWrapperHeight = height;
      const tmpBodyHeight =
        containerHeight - headerHeight - currentWrapperHeight;
      if (currentWrapperHeight < FOOTER_MIN_HEIGHT) {
        currentWrapperHeight = FOOTER_MIN_HEIGHT;
      }

      if (tmpBodyHeight < BODY_MIN_HEIGHT) {
        const bodyHeight = BODY_MIN_HEIGHT;
        currentWrapperHeight = containerHeight - headerHeight - bodyHeight;
      }
    },
    [
      containerHeight, //  currentPageDisplayName, dispatch,
      headerHeight,
    ]
  );

  if (!footerNode) return null;

  const currentViewDisplayName = getCurrentDisplayName(
    sectionViewConfigs,
    viewSortedKey,
    defaultViewKey,
    isProductionMode,
    "",
    currentViewIndex
  );

  const componentNode = footerNode.$childrenNode?.find(
    (displayName: string) => displayName === currentViewDisplayName
  );

  return (
    <div
      css={applyFooterSectionWrapperStyle(
        `${bottomHeight}px`,
        "240px",
        "500px",
        dividerColor,
        background
      )}
    >
      <div css={containerWrapperStyle}>
        {componentNode ? (
          <RenderComponentCanvasContainer
            displayName={componentNode}
            containerPadding={padding?.size ?? `${BASIC_CANVAS_PADDING}`}
            columnNumber={columnNumber}
            isRootCanvas
            safeRowNumber={0}
            handleUpdateHeight={handleUpdateHeight}
            canResizeCanvas
            minHeight={FOOTER_MIN_HEIGHT}
            shadowSize={shadowSize}
          />
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
};
RenderFooterSection.displayName = "RenderHeaderSection";

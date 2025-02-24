import { FC, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import useMeasure from "react-use-measure";
import { SCROLL_CONTAINER_PADDING } from "@/page/app/components/DotPanel/constant/canvas";
import {
  //   MIN_MOVE_BAR_WIDTH,
  MOVE_BAR_HEIGHT,
  //   MOVE_BAR_SVG_WIDTH,
} from "@/page/app/components/ScaleSquare/constant/moveBar";
import { useDisplayNameInMoveBarSelector } from "@/page/app/components/ScaleSquare/utils/useGetDisplayNameInMoveBar";
import { getIsLikeProductMode } from "@/redux/config/configSelector";
import { MoveBarProps } from "./interface";
import {
  applyMoveBarWrapperStyle,
  displayNameContainerStyle,
  moveBarDisplayNameStyle,
} from "./style";

export const MoveBar: FC<MoveBarProps> = (props) => {
  const {
    displayName,
    isError,
    maxWidth,
    widgetTop,
    widgetType,
    gridContainer,
  } = props;

  const [currentState, setCurrentState] = useState<string>("right");
  const [containerRef, bounds] = useMeasure();
  const containerWidthRef = useRef(0);
  const isLikeProductionMode = useSelector(getIsLikeProductMode);
  const displayNameInMoveBar = useDisplayNameInMoveBarSelector(
    displayName,
    widgetType
  );

  useEffect(() => {
    if (bounds.width > containerWidthRef.current) {
      currentState !== "right" && setCurrentState("right");
    }
    if (bounds.width < containerWidthRef.current) {
      currentState !== "left" && setCurrentState("left");
    }
    containerWidthRef.current = bounds.width;
  }, [bounds.width, currentState]);

  const topPosition =
    widgetTop + SCROLL_CONTAINER_PADDING >= MOVE_BAR_HEIGHT
      ? gridContainer
        ? -MOVE_BAR_HEIGHT + 10
        : -MOVE_BAR_HEIGHT
      : 0;
  return (
    <div
      css={applyMoveBarWrapperStyle(
        maxWidth,
        10,
        isError,
        isLikeProductionMode,
        topPosition
      )}
      id="moveBar"
      ref={containerRef}
    >
      <div css={displayNameContainerStyle}>
        {/* <DragPointIcon css={dragPointIconWrapperStyle} /> */}
        <span css={moveBarDisplayNameStyle}>{displayNameInMoveBar}</span>
      </div>
    </div>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, memo,  useMemo,  } from "react";
import {
  getIsIMPAKTEditMode,
  getSelectedComponentDisplayNames,
} from "@/redux/config/configSelector";
import { TransformWidgetWrapper } from "./components/TransformWidgetWrapper";
import { AutoHeightWithLimitedContainer } from "./components/AutoHeightWithLimitedContainer";
import { ResizingAndDragContainer } from "./components/ResizingAndDragContainer";
import WrapperContainer from "./components/WrapperContainer";
import { ScaleSquareProps } from "./interface";
import { useGetRealShapeAndPosition } from "./utils/getRealShapeAndPosition";
import {  useSelector } from "react-redux";
export const ScaleSquare: FC<ScaleSquareProps> = (props) => {
  const {
    unitW,
    displayName,
    parentNodeDisplayName,
    widgetType,
    columnNumber
  } = props;
  const { width, height, left, top } = useGetRealShapeAndPosition(
    displayName,
    unitW
  );
  const canDrag = widgetType !== "MODAL_WIDGET";
  const isEditMode = useSelector(getIsIMPAKTEditMode);
  const selectedComponents = useSelector(getSelectedComponentDisplayNames);
  const isSelected = useMemo(() => {
    return selectedComponents.some((currentDisplayName: any) => {
      return displayName === currentDisplayName;
    });
  }, [displayName, selectedComponents]);

  return (
    <ResizingAndDragContainer
      displayName={displayName}
      unitW={unitW}
      widgetHeight={height}
      widgetWidth={
           width
      }
      widgetTop={canDrag && widgetType !== "GridCONTAINER_WIDGET" ? top : 0}
      widgetLeft={canDrag && widgetType !== "GridCONTAINER_WIDGET" ? left : 0}
      parentNodeDisplayName={parentNodeDisplayName}
      widgetType={widgetType}
      columnNumber={columnNumber}
    >
      <WrapperContainer
        displayName={displayName}
        parentNodeDisplayName={parentNodeDisplayName}
        widgetHeight={height}
      >
        <></>
        <TransformWidgetWrapper
          displayName={displayName}
          widgetType={widgetType}
          parentNodeDisplayName={parentNodeDisplayName}
          columnNumber={columnNumber}
          unitW={unitW}
        />
      </WrapperContainer>
      {/* {isEditMode && selectedComponents?.length === 1 && isSelected && (
        <AutoHeightWithLimitedContainer
          containerHeight={width}
          displayName={displayName}
        />
      )} */}
    </ResizingAndDragContainer>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default memo(ScaleSquare);

ScaleSquare.displayName = "NewScaleSquare";

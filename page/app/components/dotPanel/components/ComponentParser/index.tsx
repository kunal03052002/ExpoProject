/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, memo } from "react";
import { useSelector } from "react-redux";
import ScaleSquare from "@/page/app/components/scaleSquare";
// import { ModalScaleSquare } from "@/page/app/components/ScaleSquare/modalScaleSquare"
import { getClientWidgetLayoutInfo } from "@/redux/currentApp/layoutInfo/layoutInfoSelector";
import { ComponentParserProps } from "./interface";

export const ComponentParser: FC<ComponentParserProps> = (props) => {
  const { displayName, unitW, parentNodeDisplayName, columnNumber } = props;
  const widgetLayoutInfo: any = useSelector(getClientWidgetLayoutInfo);
  const currentWidgetLayoutInfo = widgetLayoutInfo[displayName];
  const widgetType = currentWidgetLayoutInfo.widgetType;
  return ( 
    <ScaleSquare
      displayName={displayName}
      widgetType={widgetType}
      unitW={unitW}
      parentNodeDisplayName={parentNodeDisplayName}
      columnNumber={columnNumber}
    />
  );
};

ComponentParser.displayName = "ComponentParser";

export default memo(ComponentParser);




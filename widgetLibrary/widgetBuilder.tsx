/* eslint-disable @typescript-eslint/no-explicit-any */
import { WidgetConfigs } from "./interface";

import {
  CONTAINER_WIDGET_CONFIG,
} from "./ContainerWidget/widgetConfig";

// import {                                            // Use this import instead to make the code work
//    CONTAINER_WIDGET_CONFIG 
// } from "./ContainerWidget/widgetConfig"


// import {
//   CONTAINER_PANEL_CONFIG,
//   CONTAINER_WIDGET_CONFIG,
//   ContainerWidget,
// } from "./ContainerWidget";

export const WidgetConfig: WidgetConfigs = {
 
  CONTAINER_WIDGET: {
    config: CONTAINER_WIDGET_CONFIG,
    panelConfig: []
  },
 
};
export type WidgetType = keyof typeof WidgetConfig;
export const WidgetTypeList = Object.keys(WidgetConfig);
export const widgetBuilder = (type: WidgetType) => {
  return WidgetConfig[type];
};

/* eslint-disable @typescript-eslint/no-explicit-any */
import { WidgetConfigs } from "./interface";
// import { BUTTON_EVENT_HANDLER_CONFIG, ButtonWidget } from "./ButtonWidget";
// import { BUTTON_WIDGET_CONFIG } from "./ButtonWidget";
// import {

//   CONTAINER_PANEL_CONFIG,
//   CONTAINER_WIDGET_CONFIG,
//   ContainerWidget,
//   // CONTAINER_WIDGET_CONFIG2
// } from "./ContainerWidget";

import { CONTAINER_WIDGET_CONFIG } from "./ContainerWidget/widgetConfig"
import { CONTAINER_PANEL_CONFIG } from "./ContainerWidget/panelConfig"
import {ContainerWidget} from './ContainerWidget/container'


import { lazy } from "react";
import {CONTAINER_EVENT_HANDLER_CONFIG} from "./ContainerWidget/eventHandlerConfig"
// import {CONTAINER_WIDGET_CONFIG3 } from "./ContainerWidget/widgetBuilder2"

// // import { GridCONTAINER_WIDGET_CONFIG } from "./GridContainer/WidgetConfig";
// // import { GridCONTAINER_PANEL_CONFIG } from "./GridContainer/panelConfig";
// import { GridCONTAINER_EVENT_HANDLER_CONFIG } from "./GridContainer/eventHandlerConfig";
// import { BUTTON_PANEL_CONFIG } from "./ButtonWidget/panelConfig";
// import {
//   INPUT_WIDGET_CONFIG,
//   INPUT_PANEL_CONFIG,
//   InputWidget,
// } from "./InputWidget";
// import {
//   CHECKBOX_WIDGET_CONFIG,
//   CHECKBOX_PANEL_CONFIG,
//   CheckboxContainer,
// } from "./CheckBoxContainer";
// import {
//   TEXT_AREA_WIDGET_CONFIG,
//   TextArea,
//   TEXT_AREA_PANEL_CONFIG,
// } from "./TextAreaContainer";
// import {
//   EmptyBox,
//   EMPTY_BOX_CONFIG,
//   EMPTY_BOX_PANEL_CONFIG,
// } from "./EmptyBoxWidget";
// import { INPUT_EVENT_HANDLER_CONFIG } from "./InputWidget/eventHandlerConfig";
// import {
//   FORM_EVENT_HANDLER_CONFIG,
//   FORM_PANEL_CONFIG_BUILDER,
//   FORM_WIDGET_CONFIG,
// } from "@/widgetLibrary/FormWidget";

// import { LABEL_CONFIG, LABEL_PANEL_CONFIG, LAbEL_EVENT_HANDLER_CONFIG, Label } from "./Label/index.ts";
// import {
//   DateWidget,
//   DATE_PANEL_CONFIG,
//   DATE_WIDGET_CONFIG,
// } from "./DateWidget";
// import {
//   RadioWidget,
//   RADIO_WIDGET_CONFIG,
//   RADIO_WIDGET_PANEL_CONFIG,
// } from "./RadioWidget";
// import {
//   SelectWidget,
//   SELECT_PANEL_CONFIG,
//   SELECT_WIDGET_CONFIG,
// } from "./SelectWidget";
// import { TABS_PANEL_CONFIG, TABS_WIDGET_CONFIG, TabPanel } from "./Tabs";
// import { SELECT_EVENT_HANDLER_CONFIG } from "./SelectWidget/eventHandlerConfig";
// import { RADIO_GROUP_EVENT_HANDLER_CONFIG } from "./RadioWidget/eventHandlerConfig";
// import {
//   MultiSelectWidget,
//   MULTISELECT_PANEL_CONFIG,
//   MULTISELECT_WIDGET_CONFIG,
// } from "./MuiltiSelect.tsx";
// import {
//   TABLE_EVENT_HANDLER_CONFIG,
//   TABLE_PANEL_CONFIG,
//   TABLE_WIDGET_CONFIG,
// } from "./TableWidget";
// import {
//   FileInput,
//   FILE_INPUT_WIDGET_CONFIG,
//   FILE_INPUT_PANEL_CONFIG,
// } from "./FileInput";
// import { MULTISELECT_EVENT_HANDLER_CONFIG } from "./MuiltiSelect.tsx/eventHandlerConfig.ts";
// import { CHECK_BOX_GROUP_EVENT_HANDLER_CONFIG } from "./CheckBoxContainer/eventHandlerConfig.ts";
// import IconWidget from "./IconWidget/icon.tsx";
// import { ICON_EVENT_HANDLER_CONFIG } from "./IconWidget/eventHandlerConfig.ts";
// import { ICON_WIDGET_CONFIG } from "./IconWidget/widgetConfig.tsx";
// import { ICON_PANEL_CONFIG } from "./IconWidget/panelConfig.tsx";
// import { CssGridPanelConfigBuilder } from "./CSSGrid/panelConfig.tsx";
// import { CSSGrid_WIDGET_CONFIG } from "./CSSGrid/WidgetConfig.tsx";
// import { OTP_WIDGET_CONFIG } from "./OTPWidget/widgetConfig.tsx";
// import { OTP_PANEL_CONFIG } from "./OTPWidget/panelConfig.tsx";
// import { OTP_EVENT_HANDLER_CONFIG } from "./OTPWidget/eventHandlerConfig.ts";
// import { Image } from "./Image/Image.tsx";
// import { IMAGE_PANEL_CONFIG } from "./Image/panelConfig.tsx";
// import { IMAGE_CONFIG } from "./Image/widgetConfig.tsx";
// import Card from "./Card/Card.tsx";
// import { CARD_CONFIG } from "./Card/widgetConfig.tsx";
// import { CARD_PANEL_CONFIG } from "./Card/panelConfig.tsx";
// import CreditCard from "./CreditCard/CreditCard.tsx";
// import { CREDIT_CARD_CONFIG } from "./CreditCard/widgetConfig.tsx";
// import { CREDIT_CARD_PANEL_CONFIG } from "./CreditCard/panelConfig.tsx";
// import { CREDIT_CARD_EVENT_HANDLER_CONFIG } from "./CreditCard/eventHandlerConfig.ts";
// import SLIDER from "./Slider/Slider.tsx";
// import { SLIDER_CONFIG } from "./Slider/widgetConfig.tsx";
// import { SLIDER_PANEL_CONFIG } from "./Slider/panelConfig.tsx";
// import { SLIDER_EVENT_HANDLER_CONFIG } from "./Slider/eventHandlerConfig.ts";
// eslint-disable-next-line react-refresh/only-export-components
export const WidgetConfig: WidgetConfigs = {
  // TEXT_AREA_WIDGET:{
  //   widget:TextArea,
  //   config:TEXT_AREA_WIDGET_CONFIG,
  //   panelConfig:TEXT_AREA_PANEL_CONFIG,

  // },
  // BUTTON_WIDGET: {
  //   widget: ButtonWidget,
  //   config: BUTTON_WIDGET_CONFIG,
  //   panelConfig: BUTTON_PANEL_CONFIG,
  //   eventHandlerConfig: BUTTON_EVENT_HANDLER_CONFIG,
  // },
  // INPUT_WIDGET: {
  //   widget:
  //     // lazy(() => import("@/widgetLibrary/InputWidget/input")),
  //     InputWidget,
  //   config: INPUT_WIDGET_CONFIG,
  //   panelConfig: INPUT_PANEL_CONFIG,
  //   eventHandlerConfig: INPUT_EVENT_HANDLER_CONFIG,
  // },
  // OTP_WIDGET: {
  //   widget:
  //  lazy(() => import("@/widgetLibrary/OTPWidget/OTP.tsx")),
   
  //   config: OTP_WIDGET_CONFIG,
  //   panelConfig: OTP_PANEL_CONFIG,
  //   eventHandlerConfig: OTP_EVENT_HANDLER_CONFIG,
  // },
  // TABLE_WIDGET: {
  //   config: TABLE_WIDGET_CONFIG,
  //   panelConfig: TABLE_PANEL_CONFIG,
  //   eventHandlerConfig: TABLE_EVENT_HANDLER_CONFIG,
  //   widget: lazy(() => import("@/widgetLibrary/TableWidget/table")),
  // },
  // //container
  CONTAINER_WIDGET: {
    config: CONTAINER_WIDGET_CONFIG ,
    panelConfig: CONTAINER_PANEL_CONFIG,
    eventHandlerConfig: CONTAINER_EVENT_HANDLER_CONFIG,
    widget: ContainerWidget,
  },
  // GridCONTAINER_WIDGET: {
  //   config: CSSGrid_WIDGET_CONFIG,
  //   panelConfig: CssGridPanelConfigBuilder("Desktop"),
  //   eventHandlerConfig: GridCONTAINER_EVENT_HANDLER_CONFIG,
  //   widget: lazy(() => import("@/widgetLibrary/CSSGrid/GridContainer.tsx")),
  // },
  // CHECKBOX_WIDGET: {
  //   config: CHECKBOX_WIDGET_CONFIG,
  //   widget: CheckboxContainer,
  //   panelConfig: CHECKBOX_PANEL_CONFIG,
  //   eventHandlerConfig: CHECK_BOX_GROUP_EVENT_HANDLER_CONFIG,
  // },
  // EMPTY_BOX: {
  //   config: EMPTY_BOX_CONFIG,
  //   widget: EmptyBox,
  //   panelConfig: EMPTY_BOX_PANEL_CONFIG,
  // },
  // LABEL_WIDGET: {
  //   widget: Label,
  //   config: LABEL_CONFIG,
  //   panelConfig: LABEL_PANEL_CONFIG,
  //   eventHandlerConfig:LAbEL_EVENT_HANDLER_CONFIG
  // },
  // CARD_WIDGET: {
  //   widget: Card,
  //   config: CARD_CONFIG,
  //   panelConfig: CARD_PANEL_CONFIG,
    
  // },
  // CREDIT_CARD_WIDGET: {
  //   widget: CreditCard,
  //   config: CREDIT_CARD_CONFIG,
  //   panelConfig: CREDIT_CARD_PANEL_CONFIG,
  //   eventHandlerConfig:CREDIT_CARD_EVENT_HANDLER_CONFIG
  // },
  // SLIDER_WIDGET: {
  //   widget: SLIDER,
  //   config: SLIDER_CONFIG,
  //   panelConfig: SLIDER_PANEL_CONFIG,
  //   eventHandlerConfig:SLIDER_EVENT_HANDLER_CONFIG
  // },
  // IMAGE_WIDGET: {
  //   widget: Image,
  //   config: IMAGE_CONFIG,
  //   panelConfig: IMAGE_PANEL_CONFIG,
  //   // eventHandlerConfig:IMA
  // },
  // DATE_WIDGET: {
  //   widget: DateWidget,
  //   config: DATE_WIDGET_CONFIG,
  //   panelConfig: DATE_PANEL_CONFIG,
  // },
  // RADIO_WIDGET: {
  //   widget: RadioWidget,
  //   config: RADIO_WIDGET_CONFIG,
  //   panelConfig: RADIO_WIDGET_PANEL_CONFIG,
  //   eventHandlerConfig: RADIO_GROUP_EVENT_HANDLER_CONFIG,
  // },
  // SELECT_WIDGET: {
  //   widget: SelectWidget,
  //   eventHandlerConfig: SELECT_EVENT_HANDLER_CONFIG,
  //   config: SELECT_WIDGET_CONFIG,
  //   panelConfig: SELECT_PANEL_CONFIG,
  // },
  // ICON_WIDGET: {
  //   widget: IconWidget,
  //   eventHandlerConfig: ICON_EVENT_HANDLER_CONFIG,
  //   config: ICON_WIDGET_CONFIG,
  //   panelConfig: ICON_PANEL_CONFIG,
  // },
  // MULTISELECT_WIDGET: {
  //   widget: MultiSelectWidget,
  //   eventHandlerConfig: MULTISELECT_EVENT_HANDLER_CONFIG,
  //   config: MULTISELECT_WIDGET_CONFIG,
  //   panelConfig: MULTISELECT_PANEL_CONFIG,
  // },
  // TABS_WIDGET: {
  //   widget: TabPanel,
  //   config: TABS_WIDGET_CONFIG,
  //   panelConfig: TABS_PANEL_CONFIG,
  // },
  // FORM_WIDGET: {
  //   config: FORM_WIDGET_CONFIG,
  //   panelConfig: FORM_PANEL_CONFIG_BUILDER("Desktop"),
  //   eventHandlerConfig: FORM_EVENT_HANDLER_CONFIG,
  //   widget: lazy(() => import("@/widgetLibrary/FormWidget/form")),
  // },
  // FILE_INPUT_WIDGET: {
  //   widget: FileInput,
  //   config: FILE_INPUT_WIDGET_CONFIG,
  //   panelConfig: FILE_INPUT_PANEL_CONFIG,
  // },
};

export type WidgetType = keyof typeof WidgetConfig;
export const WidgetTypeList = Object.keys(WidgetConfig);
export const widgetBuilder = (type: WidgetType) => {
  return WidgetConfig[type];
};

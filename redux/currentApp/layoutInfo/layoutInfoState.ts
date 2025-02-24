
// import { LayoutInfo } from "@/redux/currentApp/components/componentsPayload"
export interface LayoutInfo {
  w: number
  h: number
  x: number
  y: number
  z: number
  minW?: number
  minH?: number
}
export enum CONTAINER_TYPE {
  "EDITOR_DOT_PANEL" = "EDITOR_DOT_PANEL",
  "EDITOR_SCALE_SQUARE" = "EDITOR_SCALE_SQUARE",
  "EDITOR_PAGE_SQUARE" = "EDITOR_PAGE_SQUARE",
  "EDITOR_LAYOUT_SQUARE" = "EDITOR_LAYOUT_SQUARE",
}
export interface WidgetLayoutInfo {
  displayName: string
  widgetType: string
  layoutInfo?: LayoutInfo
  parentNode: string
  containerType: CONTAINER_TYPE
  // |"EDITOR_DOT_PANEL"|
  // "EDITOR_PAGE_SQUARE"|"EDITOR_SCALE_SQUARE"|"EDITOR_LAYOUT_SQUARE"
  childrenNode: string[]
}

export interface LayoutInfoState {
  widgetsLayoutInfo: Record<string, WidgetLayoutInfo>
}
// const layout = JSON.parse(localStorage.getItem("App"))
export const layoutInfoInitialState: LayoutInfoState = 
// layout?.layoutInfo||
{
  widgetsLayoutInfo: {},
};
export interface UpdateWidgetLayoutInfoPayload {
  displayName: string
  layoutInfo: Partial<LayoutInfo>
  parentNode: string
  effectRows?: number
}

export interface BatchUpdateWidgetLayoutInfoPayload {
  displayName: string
  layoutInfo: Partial<LayoutInfo>
}

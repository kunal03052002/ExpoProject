/* eslint-disable @typescript-eslint/no-explicit-any */
export type ImpaktMode = "preview" | "edit" | "production" | "template-edit"
export type ScreenPayload = "Mobile" | "Desktop" | "Tablet"
export interface ConfigState {
  openLeftPanel: boolean
  openBottomPanel: boolean
  openStylePanel: boolean
  openScreenPanel:boolean
  gridCanvas: boolean
  openRightPanel: boolean
  layoutSectionState: Record<string, "active" | "disable">
  selectedClass: string;
  openThemePanel: boolean,
  selectedThemePanel: string,
  openDebugger: boolean
  showDot: boolean
  scale: number
  screen: ScreenPayload
  selectedComponents: string[]
  selectedAction: any
  cachedAction: any
  cacheTheme: unknown | null
  cachedClass: unknown | null
  expandedKeys: string[]
  expandedWidgets: Record<string, boolean>
  mode: ImpaktMode
  canvasHeight: number
  canvasWidth: number
  isOnline: boolean
  // wsStatus: Record<string,unknown>
  hoveredComponents: string[]
  draggingComponentIDs: string[]
  resizingComponentIDs: string[]
}
export const ConfigInitialState: ConfigState = {
  openLeftPanel: false,
  mode: "edit",
  openThemePanel: false,
  openScreenPanel:false,
  selectedThemePanel: "Default_Theme",
  openStylePanel: false,
  openBottomPanel: false,
  screen: "Desktop",
  openRightPanel: false,
  openDebugger: false,
  gridCanvas: true,
  scale: 100,
  layoutSectionState: {
    body: "active",
    "other":"disable"
  },
  selectedClass: null,
  cacheTheme: null,
  selectedComponents: [],
  selectedAction: null,
  cachedClass: null,
  cachedAction: null,
  showDot: true,
  expandedKeys: [],
  canvasHeight: 1080,
  canvasWidth: 1920,
  isOnline: true,
  hoveredComponents: [],
  expandedWidgets: {},
  // wsStatus: {
  //   [ILLA_WEBSOCKET_CONTEXT.DASHBOARD]: ILLA_WEBSOCKET_STATUS.INIT,
  //   [ILLA_WEBSOCKET_CONTEXT.APP]: ILLA_WEBSOCKET_STATUS.INIT,
  //   [ILLA_WEBSOCKET_CONTEXT.APP_BINARY]: ILLA_WEBSOCKET_STATUS.INIT,
  //   [ILLA_WEBSOCKET_CONTEXT.AI_AGENT]: ILLA_WEBSOCKET_STATUS.INIT,
  // },
  draggingComponentIDs: [],
  resizingComponentIDs: [],
}

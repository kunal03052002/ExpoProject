export interface ShortcutContextProp {
  showDeleteDialog: (
    displayName: string[],
    type?: "page" | "widget" | "action" | "subpage" | "pageView" | "globalData"|"theme"|"class",
    options?: Record<string, any>,
  ) => void
}

export enum ILLA_MIXPANEL_EVENT_TYPE {
  VISIT = "visit",
  SHOW = "show",
  CLICK = "click",
  INITIALIZE = "initialize",
  VALIDATE = "validate",
  REQUEST = "request",
  SELECT = "select",
  FOCUS = "focus",
  BLUR = "blur",
  KEYDOWN = "keydown",
  KEYUP = "keyup",
  ADD = "add",
  DRAG = "drag",
  DUPLICATE = "duplicate",
  RENAME = "rename",
  HOVER = "hover",
  CHANGE = "change",
  DELETE = "delete",
  ILLA_ACTIVE = "illa_active",
}
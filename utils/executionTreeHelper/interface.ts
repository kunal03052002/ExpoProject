/* eslint-disable @typescript-eslint/no-explicit-any */

import { ClassState, ThemeState, ThemeValues } from "@/redux/currentApp/style/styleState"

export interface CurrentUserInfoInTree {
  userID: string
  nickname: string
  email: string
  avatar: string
  language: string
  createdAt: string
  updateAt: string
}

export interface RawTreeShape {
  [key: string]: any
  builderInfo: any
  currentUserInfo: CurrentUserInfoInTree
}

type ActionSeedShape = any[]

export interface WidgetShape {
  [key: string]: any
  $type: "WIDGET"
  $widgetType: string
  $childrenNode: string[]
}
export interface WidgetSeedShape {
  [key: string]: WidgetShape
}

export interface RawTreeSeedShape {
  widgets: WidgetSeedShape
  actions: ActionSeedShape
  classes:ClassState
  theme:ThemeValues
  // builderInfo: any
  // currentUserInfo: any
  globalData: Record<string, unknown>
}

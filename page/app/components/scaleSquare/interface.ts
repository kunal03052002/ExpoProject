

import { ComponentTreeNode } from "@/utils/generators/interface"

export type ScaleSquareType = "error" | "normal" | "production"

export interface ScaleSquareProps {
  displayName: string
  unitW: number
  parentNodeDisplayName: string
  widgetType: string
  columnNumber: number
}

export interface ScaleSquarePropsWithJSON {
  componentNode: ComponentTreeNode
  unitW: number
  columnNumber: number
  displayNamePrefix?: string
}



import { ComponentTreeNode } from "@/utils/generators/interface"

export interface TransformWidgetProps {
  displayName: string
  widgetType: string
  parentNodeDisplayName: string
  columnNumber?: number
  unitW?:number|string
}

export interface TransformWidgetWrapperWithJsonProps {
  componentNode: ComponentTreeNode
  unitW: number
}

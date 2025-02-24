/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentMapNode, PADDING_MODE } from "@/utils/generators/interface"
import { BaseWidgetProps } from "@/widgetLibrary/interface"

export interface viewListItemShaper {
  id: string
  key: string
  label: string
  disabled?: boolean
  hidden?: boolean,
  xs?: number,
  sm?: number,
  lg?: number,
  md?: number,
}

export interface ContainerProps extends BaseWidgetProps {
  currentIndex: number
  componentNode: ComponentMapNode
  viewList: viewListItemShaper[]
  tooltipText?: string
  xs?: string,
  sm?: string,
  md?: string,
  lg?: string,
  justifyContent?: string,
  h: number

  linkWidgetDisplayName?: string[]
  unitH: number
  columnSize?: number
  gridGap?: number
  columnNumber?: number
  dynamicHeight?: "auto" | "fixed" | "limited"
  dynamicMinHeight?: number
  dynamicMaxHeight?: number
  padding?: {
    size: string
    mode: PADDING_MODE
  }
  canvasId?: number
  handleUpdateMultiAttrDSL?: any
  handleUpdateOriginalDSLMultiAttr: (updateSlice: any
    // Record<string, any>
  ) => void,
  handleUpdateOtherMultiAttrDSL?: any
  Mobile:any,
  Tablet:any,
  Desktop:any,
  attrPath?:string
  isGridCanvas?:boolean
 
}

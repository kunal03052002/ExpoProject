import { XYCoord } from "react-dnd"
import { DragInfo } from "@/page/app/components/scaleSquare/components/DragContainer/interface"
import { ReactNode } from "react"

export interface DragPreviewProps {
  unitW: number
  children: ReactNode
 
  parentNodeDisplayName: string
  canDrag: boolean
  unitWidth: number
  columnNumber: number
}

export interface DragCollectedProps {
  isDragging: boolean
  item: DragInfo
  clientOffset: XYCoord | null
  differenceFromInitialOffset: XYCoord | null
  initialClientOffset: XYCoord | null
  initialSourceClientOffset: XYCoord | null
}

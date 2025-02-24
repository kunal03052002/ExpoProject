// import { CollaboratorsInfo } from "@/redux/currentApp/collaborators/collaboratorsState"

export interface MoveBarProps {
  displayName: string
  isError: boolean
  maxWidth: number
  widgetTop: number
  widgetType: string
  userList: any[]
  columnNumber: number,
  gridContainer?:boolean
}

export type BarPosition = "l" | "r" | "t" | "b" | "tl" | "tr" | "bl" | "br"

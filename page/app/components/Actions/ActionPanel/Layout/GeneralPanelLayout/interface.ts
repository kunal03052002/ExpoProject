import { ActionType } from "@/redux/currentApp/action/interface"
import { ReactNode } from "react"

export interface GeneralPanelLayoutProps {
  children: ReactNode
  mockEnabled?: boolean
  actionType?: ActionType
}

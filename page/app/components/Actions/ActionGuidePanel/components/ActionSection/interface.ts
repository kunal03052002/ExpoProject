import { ActionType } from "@/redux/currentApp/action/interface"


export interface PanelSectionProps {
  actionTypes: ActionType[]
  changeLoading: (isLoading: boolean) => void
  filterFunc?: (actionType: ActionType) => boolean
  title: string
  hasMore: boolean
}


import { ActionContent, ActionItem } from "@/redux/currentApp/action/interface"
import { HTMLAttributes } from "react"

export interface ActionListItemProps extends HTMLAttributes<HTMLDivElement> {
  action: ActionItem<ActionContent>
  onItemClick: (action: ActionItem<ActionContent>) => void
  onCopyItem: (action: ActionItem<ActionContent>) => void
  onDeleteItem: (action: ActionItem<ActionContent>) => void
}

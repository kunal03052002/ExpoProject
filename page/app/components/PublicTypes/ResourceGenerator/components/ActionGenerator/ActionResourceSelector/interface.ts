/* eslint-disable @typescript-eslint/no-explicit-any */
import { ActionType } from "@/redux/currentApp/action/interface"
import { ActionCreatorPage } from "../interface"
import { ResourceType } from "../../../../resource"

export type HandleDirectCreateActionFunc = (
  actionType: ActionType,
  resourceID: string,
  successCallback?: () => void,
  loadingCallback?: (loading: boolean) => void,
) => void

export interface ActionResourceSelectorProps {
  actionType: ActionType
  canBack?: boolean
  onBack: (page: ActionCreatorPage) => void
  handleCreateAction: HandleDirectCreateActionFunc
  onCreateResource: (resourceType: ResourceType) => void
  onCreateAction: (actionType: ActionType, resourceID?: string) => void
  onClose:()=> void
}

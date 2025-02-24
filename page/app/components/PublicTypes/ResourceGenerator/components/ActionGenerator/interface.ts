/* eslint-disable @typescript-eslint/no-explicit-any */

import { ActionType } from "@/redux/currentApp/action/interface"
import { HandleDirectCreateActionFunc } from "./ActionResourceSelector/interface"
import { ResourceType } from "../../../resource"

export interface ActionGeneratorProps {
  visible?: boolean
  onClose: () => void
  defaultStep?: ActionCreatorPage
  defaultActionType?: ActionType | null
  canBackToSelect?: boolean
  handleDirectCreateAction: HandleDirectCreateActionFunc
  handleCreateAgentAction: (
    item: any,
    successCallback?: () => void,
    loadingCallback?: (loading: boolean) => void,
  ) => void
  filterResourceType?: (resourceType: ResourceType) => boolean
}

export type ActionCreatorPage =
  | "select"
  | "createAction"
  | "createResource"
  | "directCreateAction"

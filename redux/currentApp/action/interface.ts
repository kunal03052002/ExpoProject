import { GlobalDataActionContent } from "@/page/app/components/PublicTypes/action/globalData"
import { RestAPIAction, RestAPIBodyContent } from "@/page/app/components/PublicTypes/action/restApi"
import { TransformerAction } from "@/page/app/components/PublicTypes/action/transformerAction"

/* eslint-disable @typescript-eslint/no-explicit-any */
export type ActionType =
  | "restapi"
  | "transformer"
  | "globalData"
  |"impaktapps"


  export type ActionTriggerMode = "manually" | "automate"
  export enum ACTION_RUN_TIME {
    APP_LOADED = "appLoaded",
    PAGE_LOADING = "pageLoading",
    NONE = "none",
  }
  
  export interface Transformer {
    rawData: string
    enable: boolean
  }
  
  export interface IAdvancedConfig {
    runtime: ACTION_RUN_TIME
    pages: string[]
    delayWhenLoaded: string
    displayLoadingPage: boolean
    isPeriodically: boolean
    periodInterval: string
  }
  
  export interface IMockConfig {
    enabled: boolean
    mockData: string
    enableForReleasedApp: boolean
  }
  
  export interface ActionConfig {
    public: boolean
    advancedConfig?: IAdvancedConfig
    icon?: string
    mockConfig?: IMockConfig
    tutorialLink?: string
  }
// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
export interface BaseActionItem<T extends unknown = unknown>{
  config: ActionConfig
  displayName: string
  transformer: Transformer
  triggerMode: ActionTriggerMode
  resourceID?: string
  content: T
  isVirtualResource: boolean
}

export interface ActionItem<T extends ActionContent = ActionContent>
  extends BaseActionItem<T> {
  actionID: string
  actionType: ActionType
}

export type ActionContent =| RestAPIAction<RestAPIBodyContent>| TransformerAction
 | GlobalDataActionContent



/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  getIsIMPAKTProductMode,
} from "@/redux/config/configSelector"
// import { getActionList } from "@/redux/currentApp/action/actionSelector"
import { Events } from "@/redux/currentApp/action/actionState"
import { executionActions } from "@/redux/currentApp/executionTree/executionSlice"
import store from "@/store"
import { transformDataFormat } from "@/utils/action/transformDataFormat"
import { ILLAEditorRuntimePropsCollectorInstance } from "@/utils/executionTreeHelper/runtimePropsCollector"
import { runAllEventHandler } from "./runActionEventHandler"
import { runTransformer } from "./runActionTransformer"
import { transResponse } from "./transResponse"
import { ActionContent, ActionItem, ActionType } from "@/redux/currentApp/action/interface"
import { RestAPIAction, RestAPIBodyContent } from "@/page/app/components/PublicTypes/action/restApi"
import { ILLAApiError, isILLAAPiError } from "../../page/app/components/PublicTypes/ResourceGenerator"
// page/app/components/PublicTypes/ResourceGenerator
// import {isILLAAPiError}  from "./importisILLAAPiError"


import axios, { AxiosResponse } from "axios"
import { buildAxiosConfig } from "@/page/app/components/Actions/axiosConfigBuilder"
import { isElement, isEmpty } from "lodash"
import {  setGlobalDataValue } from "../eventHandlerHelper/utils/globalDataUtils"

const checkCanSendRequest = (
  _actionType: ActionType,
  _actionContent: ActionContent,
) => {
  return true;
};
export const fetchActionRunResult = async (
  _appID: string,
  _actionID: string,
  data: any,
  _isPublic: boolean,
  _abortSignal?: AbortSignal,
  actionType?: ActionType
) => {
  const config = buildAxiosConfig(data);
  const token = JSON.parse(window.localStorage.getItem("token"));
  const body = isEmpty(config?.body) ? {
    headers: {
      'Authorization': `Bearer ${token}`,
      ...config?.headers
    }
  } : actionType === "impaktapps" ? { ...config.body, ruleId: config.method } : config?.body
  try {
    const data = await axios[actionType === "impaktapps" ? "get" : config.method](
      config.url,
      body,
      {
        headers: {
          // 'Authorization': `Bearer ${token}`,
          ...config?.headers
        }
      }
    );
     return data;
  } catch (err) {
    console.log("err >> ",err.response.data.error_message)
    setGlobalDataValue({key:"userApiErr",value:err.response.data.error_message})
  }

};
export const fetchCommonActionResult = async (
  isPublic: boolean,
  resourceID: string,
  actionType: ActionType,
  displayName: string,
  appId: string,
  actionID: string,
  actionContent: ActionContent,
  actionContext: Record<string, unknown> = {},
  abortSignal?: AbortSignal,
) => {
  const canSendRequest = checkCanSendRequest(actionType, actionContent)
  if (!canSendRequest) {
    return Promise.reject(false)
  }

  const requestBody = {
    resourceID,
    actionType,
    displayName,
    content: actionContent,
    context: actionContext,
  }
  return await fetchActionRunResult(
    appId,
    actionID,
    requestBody,
    isPublic,
    abortSignal,
    actionType
  )

};

export const fetchActionResult = async (
  actionType: ActionType,
  isProductionMode: boolean,
  isPublic: boolean,
  resourceID: string,
  displayName: string,
  appId: string,
  currentActionId: string,
  actionContent: ActionContent,
  $context: Record<string, unknown>,
  abortSignal: AbortSignal | undefined,
) => {

  const response: any = await fetchCommonActionResult(
    !isProductionMode ? false : isPublic,
    (resourceID as string) || "",
    actionType as ActionType,
    displayName,
    appId,
    currentActionId,
    actionContent,
    $context,
    abortSignal,
  )
console.log("response >>", response)
  return transResponse(actionType, actionContent, response)
}

export interface IExecutionActions extends ActionItem<ActionContent> {
  $actionID: string
  $resourceID: string
  $context: Record<string, unknown>
}





 const getActionList = (state: any) => state.currentApp.action

export const runActionWithExecutionResult = async (
  action: IExecutionActions,
  needRunEventHandler: boolean = true,
  abortSignal?: AbortSignal,
) => {
  const { displayName } = action as ActionItem<RestAPIAction<RestAPIBodyContent>>
  const {
    content,
    $actionID,
    $resourceID,
    actionType,
    transformer,
    $context,
    config,
  } = action
  const originActionList = getActionList(store.getState())
  const originAction = originActionList.find(
    (item) => item.displayName === displayName,
  )
  if (!content || !originAction) return Promise.reject(false)
  const rootState = store.getState()
  const appId = ""
  // getAppId(rootState)
  const isProductionMode = getIsIMPAKTProductMode(rootState)
  const {
    successEvent: _successEvent = [],
    failedEvent: _failedEvent = [],
    ...restContent
  } = content as ActionContent & Events

  const mockConfig = config.mockConfig!
  const {
    successEvent: originSuccessEvent = [],
    failedEvent: originFailedEvent = [],
    $dynamicAttrPaths = [],
  } = originAction.content as ActionContent &
  Events & { $dynamicAttrPaths: string[] }
  const actionContent = transformDataFormat(
    actionType as ActionType,
    restContent,
  ) as ActionContent

  store.dispatch(
    executionActions.updateExecutionByDisplayNameReducer({
      displayName: displayName,
      value: {
        isRunning: true,
        startTime: new Date().getTime(),
        endTime: new Date().getTime(),
      },
    }),
  )

  const currentActionId = $actionID as string

  try {
    let illaInnerTransformedResponse

    const mockEnabled = isProductionMode
      ? mockConfig?.enabled && mockConfig?.enableForReleasedApp
      : mockConfig?.enabled

    if (mockEnabled) {
      illaInnerTransformedResponse = {
        data: mockConfig.mockData,
      }
    } 
    else {
      illaInnerTransformedResponse = await fetchActionResult(
        actionType,
        isProductionMode,
        config?.public ?? false,
        ($resourceID as string) || "",
        displayName,
        "",
        currentActionId,
        actionContent,
        $context,
        abortSignal,
      )
    }

    const userTransformedData = runTransformer(
      transformer,
      illaInnerTransformedResponse.data ?? "",
    )
    store.dispatch(
      executionActions.updateExecutionByDisplayNameReducer({
        displayName: displayName,
        value: {
          ...illaInnerTransformedResponse,
          data: userTransformedData,
          runResult: undefined,
          isRunning: false,
          endTime: new Date().getTime(),
        },
      }),
    )

    if (needRunEventHandler) {
      // runAllEventHandler(originSuccessEvent, $dynamicAttrPaths)
    }
    return Promise.resolve(userTransformedData)
    return null
  } 
  
  
  catch (e) {
    const runResult = {
      error: true,
      message: "An unknown error",
    }
    // const isILLAAPiError = (
    //   error: unknown,
    // ): error is AxiosResponse<ILLAApiError> => {
    //   return (
    //     typeof error === "object" &&
    //     error !== null &&
    //     "data" in error 
    //     // &&
    //     // isIllaErrorInterface(error.data)
    //   )
    // }
  
    if (isILLAAPiError(e)) {
      runResult.message = e.data?.errorMessage || "An unknown error"
      try {
        if (e.data?.errorMessage.startsWith("run action error: ")) {
          const arr = e.data?.errorMessage.split("run action error: ")
          if (arr.length > 1) {
            const error = JSON.parse(arr[1])
            const errResponse = {
              ...e,
              data: error,
            }
          }
        }
      } catch (e) { console.log(e) }
    }

    store.dispatch(
      executionActions.updateExecutionByDisplayNameReducer({
        displayName: displayName,
        value: {
          data: undefined,
          runResult: runResult,
          isRunning: false,
          endTime: new Date().getTime(),
        },
      }),
    )
    // if (needRunEventHandler)
      // runAllEventHandler(originFailedEvent, $dynamicAttrPaths)

    return Promise.reject(runResult)
  }




}













export const runOriginAction = async (action: ActionItem<ActionContent>) => {
  const { displayName } = action
  const finalContext =
    ILLAEditorRuntimePropsCollectorInstance.getGlobalCalcContext()
  const realAction = (finalContext as Record<string, unknown>)[
    displayName
  ] as IExecutionActions
  return await runActionWithExecutionResult(realAction)
}

export const runActionWithDelay = (
  action: IExecutionActions,
  abortSignal?: AbortSignal,
) => {
  const { config } = action
  if (!config || !config.advancedConfig) {
    runActionWithExecutionResult(action, true, abortSignal)
    return
  }
  const { advancedConfig } = config
  const { delayWhenLoaded } = advancedConfig
  return new Promise((resolve, reject) => {
    const timeoutID = window.setTimeout(
      async () => {
        window.clearTimeout(timeoutID)

        try {
          const result = await runActionWithExecutionResult(
            action,
            true,
            abortSignal,
          )
          return resolve(result)
        } catch (e) {
          console.log("e", e)
          return reject(e)
        }
      },
      delayWhenLoaded as unknown as number,
    )
  })
}

const actionIDMapTimerID: Record<string, number> = {}
export const registerActionPeriod = (action: IExecutionActions) => {
  const { config } = action
  if (
    !config ||
    !config.advancedConfig ||
    !config.advancedConfig.isPeriodically ||
    (config.advancedConfig.periodInterval as unknown as number) <= 0
  ) {
    removeActionPeriod(action.$actionID)
    return
  }
  removeActionPeriod(action.$actionID)
  const timeID = window.setInterval(
    () => {
      runActionWithExecutionResult(action)
    },
    (config.advancedConfig.periodInterval as unknown as number) * 1000,
  )
  actionIDMapTimerID[action.$actionID] = timeID
}

export const removeActionPeriod = (actionID: string) => {
  if (actionIDMapTimerID[actionID]) {
    window.clearInterval(actionIDMapTimerID[actionID])
  }
}

export const removeAllActionPeriod = () => {
  Object.values(actionIDMapTimerID).forEach((id) => {
    window.clearInterval(id)
  })
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { klona } from "klona/json"
import { get, set, toPath } from "lodash-es"
import { evaluateDynamicString } from "../evaluateDynamicString"
// import { runEventHandler } from "../eventHandlerHelper"
import { ILLAEditorRuntimePropsCollectorInstance } from "../executionTreeHelper/runtimePropsCollector"
import { convertPathToString } from "../converter"


import {transformEvents} from "../eventHandlerHelper/index"
import { hasDynamicStringSnippet } from "../helper"
export const runEventHandler = (
  scriptObj: any,
  globalData: Record<string, any>,
) => {
  const eventObj = transformEvents(scriptObj, globalData)
  if (!eventObj) return
  const { script, enabled } = eventObj

  if (
    (typeof enabled === "boolean" && enabled) ||
    scriptObj.originEnable == undefined ||
    scriptObj.originEnable === ""
  ) {
    if (typeof script === "string" && hasDynamicStringSnippet(script)) {
      try {
        evaluateDynamicString("events", script, globalData)
      } catch (e) {
        // message.error({
        //   content: "eventHandler run error",
        // })
      }
      return
    }
    if (typeof script === "function") {
      script()
    }
  }
}


export const runAllEventHandler = (
  events: any[] = [],
  dynamicAttrPaths: string[] = [],
) => {
  const finalContext =
    ILLAEditorRuntimePropsCollectorInstance.getGlobalCalcContext()
  const needRunEvents = klona(events).map((originEvent) => {
    return {
      ...originEvent,
      originEnable: originEvent.enabled,
    }
  })
  dynamicAttrPaths.forEach((path) => {
    const realPath = convertPathToString(toPath(path).slice(1))
    try {
      const dynamicString = get(needRunEvents, realPath, "")
      if (dynamicString) {
        const calcValue = evaluateDynamicString(
          `events${realPath}`,
          dynamicString,
          finalContext,
        )
        set(needRunEvents, realPath, calcValue)
      }
    } catch (e) {
      console.log(e)
    }
  })
  needRunEvents.forEach((scriptObj) => {
    runEventHandler(scriptObj, finalContext)
  })
}

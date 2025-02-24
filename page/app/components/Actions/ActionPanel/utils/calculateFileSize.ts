import { hasDynamicStringSnippet } from "@/redux/utils"
import { evaluateDynamicString } from "@/utils/evaluateDynamicString"
import { ILLAEditorRuntimePropsCollectorInstance } from "@/utils/executionTreeHelper/runtimePropsCollector"
import { calculateFileSize } from "@/widgetLibrary/PublicSector/InvalidMessage/utils"


const MAX_SIZE = 5 * 1024 * 1024

export const getFileValue = (data: string) => {
  let value = data
  if (hasDynamicStringSnippet(data)) {
    const finalContext =
      ILLAEditorRuntimePropsCollectorInstance.getGlobalCalcContext()
    try {
      value = evaluateDynamicString("", data, finalContext)
    } catch (ignore) {console.log(ignore)}
  }
  return value
}

export const isFileOversize = (data: string) => {
  if (!data.length) {
    return false
  }
  const content = getFileValue(data)
  if (Array.isArray(content)) {
    if (content.length <= 0) {
      return false
    }
    return content.every((value) => {
      const calculateValue =  value
      return !!(calculateFileSize(calculateValue) > MAX_SIZE)
    })
  } else {
    return !!(calculateFileSize(content) > MAX_SIZE)
  }
}

import { filterBindingSegmentsAndRemoveQuotes } from "./utils"
export enum Types {
  STRING = "STRING",
  NUMBER = "NUMBER",
  BOOLEAN = "BOOLEAN",
  OBJECT = "OBJECT",
  ARRAY = "ARRAY",
  FUNCTION = "FUNCTION",
  UNDEFINED = "UNDEFINED",
  NULL = "NULL",
  UNKNOWN = "UNKNOWN",
}
export const isObject = (value: unknown): value is Record<string, unknown> => {
  return Object.prototype.toString.call(value) === "[object Object]"
}

export const isFunction = (value: unknown): boolean => {
  return (
    Object.prototype.toString.call(value) === "[object Function]" ||
    Object.prototype.toString.call(value) === "[object AsyncFunction]"
  )
}
export const getType = (value: unknown) => {
  if (typeof value === "string") return Types.STRING
  if (typeof value === "number") return Types.NUMBER
  if (typeof value === "boolean") return Types.BOOLEAN
  if (Array.isArray(value)) return Types.ARRAY
  if (isFunction(value)) return Types.FUNCTION
  if (isObject(value)) return Types.OBJECT
  if (typeof value === "undefined") return Types.UNDEFINED
  if (value === null) return Types.NULL
  return Types.UNKNOWN
}
export const templateSubstituteDynamicValues = (
  dynamicString: string,
  stringSnippets: string[],
  values: unknown[],
): string => {
  let finalValue = dynamicString
  stringSnippets.forEach((b, i) => {
    let value = values[i]
    if (Array.isArray(value) || isObject(value)) {
      value = JSON.stringify(value)
    }
    try {
      if (typeof value === "string" && JSON.parse(value)) {
        value = value.replace(/\\([\s\S])|(")/g, "\\$1$2")
      }
    } catch (e) {
      // do nothing
    }
    finalValue = finalValue.replace(b, `${value}`)
  })
  return finalValue
}

export const smartSubstituteDynamicValues = (
  originDynamicString: string,
  originStringSnippets: string[],
  originValues: unknown[],
): string => {
  const { dynamicString, stringSnippets, values } =
    filterBindingSegmentsAndRemoveQuotes(
      originDynamicString,
      originStringSnippets,
      originValues,
    )
  let finalBinding = dynamicString
  stringSnippets.forEach((b, i) => {
    const value = values[i]
    switch (getType(value)) {
      case Types.NUMBER:
      case Types.BOOLEAN:
      case Types.NULL:
      case Types.UNDEFINED:
        finalBinding = finalBinding.replace(b, `${value}`)
        break
      case Types.STRING:
        finalBinding = finalBinding.replace(b, value as string)
        break
      case Types.ARRAY:
      case Types.OBJECT:
        finalBinding = finalBinding.replace(b, JSON.stringify(value, null, 2))
        break
    }
  })
  return finalBinding
}

export const substituteDynamicBindingWithValues = (
  dynamicString: string,
  stringSnippets: string[],
  values: unknown[],
): string => {
  return templateSubstituteDynamicValues(dynamicString, stringSnippets, values)
}

const ASYNC_SCRIPT_CODE_INPUT_START_MARKS = "{{(async function (){"
const SYNC_SCRIPT_CODE_INPUT_START_MARKS = "{{(function (){"
const SCRIPT_CODE_INPUT_END_MARKS = "})()}}"

export const realInputValueWithScript = (
  attrValue: string | undefined,
  needAsync: boolean = false,
) => {
  if (attrValue === "" || attrValue == undefined) return ""
  const startMarks = needAsync
    ? ASYNC_SCRIPT_CODE_INPUT_START_MARKS
    : SYNC_SCRIPT_CODE_INPUT_START_MARKS
  return attrValue.startsWith(startMarks)
    ? attrValue.substring(
        startMarks.length,
        attrValue.length - SCRIPT_CODE_INPUT_END_MARKS.length,
      )
    : attrValue
}

export const wrapperScriptCode = (
  attrValue: string | undefined,
  needAsync: boolean = false,
) => {
  const startMarks = needAsync
    ? ASYNC_SCRIPT_CODE_INPUT_START_MARKS
    : SYNC_SCRIPT_CODE_INPUT_START_MARKS

  return `${startMarks}${attrValue}${SCRIPT_CODE_INPUT_END_MARKS}`
}

export const isWrapperCode = (attrValue: string | undefined) => {
  if (attrValue === "" || attrValue == undefined) return false
  return (
    (attrValue.startsWith(ASYNC_SCRIPT_CODE_INPUT_START_MARKS) ||
      attrValue.startsWith(SYNC_SCRIPT_CODE_INPUT_START_MARKS)) &&
    attrValue.endsWith(SCRIPT_CODE_INPUT_END_MARKS)
  )
}

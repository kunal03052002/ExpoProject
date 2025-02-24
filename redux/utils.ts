
// import { v4 } from "uuid"

import deepDiff, { Diff } from "deep-diff"
import { klona } from "klona/json"
import { set } from "lodash-es"
import { ComponentMapNode, ComponentTreeNode } from "./currentApp/components/componentsState"

export const flatTreeToMap = (componentNode: ComponentTreeNode) => {
  const map: Record<string, ComponentMapNode> = {}
  const flatTree = (node: ComponentTreeNode) => {
    map[node.displayName] = {
      ...node,
      childrenNode: Array.isArray(node.childrenNode)
        ? node.childrenNode.map((childNode) => childNode.displayName)
        : [],
    }
    if (!Array.isArray(node.childrenNode)) {
      node.childrenNode = []
    }
    node.childrenNode.forEach((childNode) => {
      flatTree(childNode)
    })
  }
  flatTree(componentNode)
  return map
}

export const transTreeToMap = (componentNode: ComponentTreeNode) => {
  const map = flatTreeToMap(componentNode)
  return map[componentNode.displayName]
}
export const isDynamicStringSnippet = (value: unknown): boolean =>
  typeof value === "string" && value.endsWith("}}") && value.startsWith("{{")
export function isLikInt(val: string | number): boolean {
  return Number.isInteger(val) || (typeof val === "string" && /^\d+$/.test(val))
}
export const getStringSnippets = (dynamicString: string): string[] => {
  let stringSnippets: string[] = []
  const isNotString = typeof dynamicString !== "string"
  if (isNotString) {
    return [dynamicString]
  }
  const indexOfDoubleParenStart = dynamicString.indexOf("{{")
  if (indexOfDoubleParenStart === -1) {
    return [dynamicString]
  }
  const firstString = dynamicString.substring(0, indexOfDoubleParenStart)
  if (firstString) stringSnippets.push(firstString)
  let rest = dynamicString.substring(
    indexOfDoubleParenStart,
    dynamicString.length,
  )
  let sum = 0
  for (let i = 0; i <= rest.length - 1; i++) {
    const char = rest[i]
    const prevChar = rest[i - 1]

    if (char === "{") {
      sum++
    } else if (char === "}") {
      sum--
      if (prevChar === "}" && sum === 0) {
        stringSnippets.push(rest.substring(0, i + 1))
        rest = rest.substring(i + 1, rest.length)
        if (rest) {
          stringSnippets = stringSnippets.concat(getStringSnippets(rest))
          break
        }
      }
    }
  }
  if (sum !== 0 && dynamicString !== "") {
    return [dynamicString]
  }
  return stringSnippets
}
export const hasDynamicStringSnippet = (value: unknown): boolean => {
  if (typeof value !== "string") {
    return false
  }
  const dynamicStrings = getStringSnippets(value)
  return dynamicStrings.some((value) => isDynamicStringSnippet(value))
}

export const convertPathToString = (attrPath: (string | number)[]) => {
  let string = ""
  attrPath.forEach((segment) => {
    if (isLikInt(segment)) {
      string = string + "[" + segment + "]"
    } else {
      if (string.length !== 0) {
        string = string + "."
      }
      string = string + segment
    }
  })
  return string
}
export const isObject = (value: unknown): value is Record<string, unknown> => {
  return Object.prototype.toString.call(value) === "[object Object]"
}
export const getWidgetOrActionDynamicAttrPaths = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  widgetOrAction: Record<string, any>,
): string[] => {
  if (Array.isArray(widgetOrAction.$dynamicAttrPaths)) {
    return [...widgetOrAction.$dynamicAttrPaths]
  }
  return []
}
enum DynamicAttrPathActions {
  ADD = "ADD",
  REMOVE = "REMOVE",
  NONE = "NONE",
}

interface DynamicAttrPathUpdateShape {
  attrPath: string
  action: DynamicAttrPathActions
}

const generateDynamicAttrPaths = (
  current: string[],
  update: DynamicAttrPathUpdateShape,
): string[] => {
  if (update.action === DynamicAttrPathActions.ADD) {
    current.push(update.attrPath)
  } else if (update.action === DynamicAttrPathActions.REMOVE) {
    current = current.filter((path) => path !== update.attrPath)
  }
  return current
}

const getNewEffectByUpdateSlice = (
  path: string,
  rValue: unknown,
): DynamicAttrPathUpdateShape | DynamicAttrPathUpdateShape[] => {
  if (isObject(rValue)) {
    return Object.keys(rValue as Record<string, unknown>)
      .map((key: string) => {
        const subPath = `${path}.${key}`
        return getNewEffectByUpdateSlice(
          subPath,
          (rValue as Record<string, unknown>)[key],
        )
      })
      .flat()
  }
  if (Array.isArray(rValue)) {
    return (rValue as unknown[])
      .map((item: unknown, index: number) => {
        const subPath = convertPathToString([path, `${index}`])
        return getNewEffectByUpdateSlice(subPath, item)
      })
      .flat()
  }
  const isRDynamic = hasDynamicStringSnippet(rValue as string)
  return {
    attrPath: path,
    action: isRDynamic
      ? DynamicAttrPathActions.ADD
      : DynamicAttrPathActions.NONE,
  }
}

const getUpdateSlicePathAndEffect = (
  diff: Diff<Record<string, unknown>, Record<string, unknown>>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): any | DynamicAttrPathUpdateShape[] => {
  const path = convertPathToString((diff?.path ?? []) as string[])
  switch (diff.kind) {
    case "N": {
      const { rhs } = diff
      if (!isObject(rhs) && !Array.isArray(rhs)) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const stringRValue: any = isObject(rhs) ? JSON.stringify(rhs) : rhs
        const isRDynamic = hasDynamicStringSnippet(stringRValue)

        return {
          attrPath: path,
          action: isRDynamic
            ? DynamicAttrPathActions.ADD
            : DynamicAttrPathActions.NONE,
        }
      } else {
        return getNewEffectByUpdateSlice(path, rhs)
      }
    }
    case "D": {
      const { lhs } = diff
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const stringLValue: any = isObject(lhs) ? JSON.stringify(lhs) : lhs
      return {
        attrPath: path,
        action: stringLValue
          ? DynamicAttrPathActions.REMOVE
          : DynamicAttrPathActions.NONE,
      }
    }
    case "E": {
      const { lhs, rhs } = diff
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const stringRValue: any = isObject(rhs) ? JSON.stringify(rhs) : rhs
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const stringLValue: any = isObject(lhs) ? JSON.stringify(lhs) : lhs

      const isRDynamic = hasDynamicStringSnippet(stringRValue)
      const isLDynamic = hasDynamicStringSnippet(stringLValue)
      if (isRDynamic && !isLDynamic) {
        return {
          attrPath: path,
          action: DynamicAttrPathActions.ADD,
        }
      }
      if (!isRDynamic && isLDynamic) {
        return {
          attrPath: path,
          action: DynamicAttrPathActions.REMOVE,
        }
      }
      return {
        attrPath: path,
        action: DynamicAttrPathActions.NONE,
      }
    }
    case "A": {
      return getUpdateSlicePathAndEffect({
        ...diff.item,
        path: [...(diff.path as string[]), diff.index],
      }) as DynamicAttrPathUpdateShape
    }
  }
}

export const getNewWidgetPropsByUpdateSlice = (
  updateSlice: Record<string, unknown>,
  oldWidgetProps: Record<string, unknown>,
) => {
  const newWidgetProps = klona(oldWidgetProps)
  Object.keys(updateSlice).forEach((attrPath) => {
    set(newWidgetProps, attrPath, updateSlice[attrPath])
  })

  const diffs = deepDiff(oldWidgetProps, newWidgetProps)
  if (!Array.isArray(diffs)) return oldWidgetProps
  const dynamicAttrPathUpdates: DynamicAttrPathUpdateShape[] = diffs
    .map((diff) => getUpdateSlicePathAndEffect(diff))
    .flat()
  const currentDynamicAttrPaths =
    getWidgetOrActionDynamicAttrPaths(oldWidgetProps)

  const dynamicAttrPaths = dynamicAttrPathUpdates.reduce(
    generateDynamicAttrPaths,
    currentDynamicAttrPaths,
  )

  newWidgetProps.$dynamicAttrPaths = dynamicAttrPaths
  return newWidgetProps
}

export let viewNameSet = new Set<string>()
export interface SectionViewShape {
  viewDisplayName: string
  key: string
  id: string
  path: string
}
const generateDatasetName = (prefix: string) => {
  let i = 1
  let ViewName = `sub-page${i}`
  while (viewNameSet.has(`${prefix}-${ViewName}`)) {
    i++
    ViewName = `sub-page${i}`
  }
  return ViewName
}

export const generateNewViewItem = (
  hasViewNameSet: string[],
  viewDisplayName: string,
  prefix: string,
): SectionViewShape => {
  viewNameSet = new Set<string>(hasViewNameSet)
  const viewName = generateDatasetName(prefix)

  return {
    id: String(Math.random() * 100 * (Math.random() * 100)),
    key: viewName,
    path: viewName,
    viewDisplayName,
  }
}

export const generateNewViewItemFromBodySectionConfig = (
  hasPaths: string[],
  viewDisplayName: string,
  prefix: string,
  alternativeSubPaths: string[],
): SectionViewShape => {
  const prefixedViewPath = hasPaths.map((path) => `${prefix}-${path}`)
  viewNameSet = new Set<string>(prefixedViewPath)
  let viewName = ""
  if (alternativeSubPaths.length > 0) {
    viewName = alternativeSubPaths[0]
  }
  if (!viewName) viewName = generateDatasetName(prefix)

  return {
    id: String(Math.random() * 100 * (Math.random() * 100)),
    key: viewName,
    path: viewName,
    viewDisplayName,
  }
}


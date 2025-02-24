/* eslint-disable @typescript-eslint/no-explicit-any */
import { klona } from "klona"
import { buildInitDragInfo } from "@/page/app/components/componentPanel/componentListBuilder"
// import { DEFAULT_MIN_COLUMN } from "@/page/app/components/ScaleSquare/constant/widget"
import { CONTAINER_TYPE, WidgetLayoutInfo } from "@/redux/currentApp/layoutInfo/layoutInfoState"
import { DisplayNameGenerator } from "@/utils/generators/generateDisplayName"
import { WidgetConfig } from "@/widgetLibrary/interface"
import { WidgetType, widgetBuilder } from "@/widgetLibrary/widgetBuilder"
import { isObject } from "@/redux/utils"
import { ComponentTreeNode } from "@/redux/currentApp/components/componentsState"
import { DEFAULT_MIN_COLUMN } from "@/page/app/components/scaleSquare/constant/widget"
import { get, set } from "lodash-es"
export const TEMPLATE_DISPLAYNAME_KEY = "templateDisplayName"

export const generateWidgetLayoutInfo = (
  type: string,
  baseDisplayName: string,
  containerType: CONTAINER_TYPE = CONTAINER_TYPE.EDITOR_SCALE_SQUARE,
  isGridCanvas?: boolean
): WidgetLayoutInfo | undefined => {
  const realDisplayName = DisplayNameGenerator.generateDisplayName(
    type,
    baseDisplayName,
  )
  const currentComponentConfig = buildInitDragInfo(type)
  if (currentComponentConfig === undefined) {
    return undefined
  }

  return {
    displayName: realDisplayName,
    widgetType: type,
    layoutInfo: {
      w: 10,
      h: 5,
      x: isGridCanvas ? -1 : currentComponentConfig.x ?? 0,
      y: isGridCanvas ? -1 : currentComponentConfig.y ?? 0,
      z: 0,
      minW: DEFAULT_MIN_COLUMN,
      minH: currentComponentConfig.minH ?? 3,
    },
    containerType,
    parentNode: "",
    childrenNode: [] as string[],
  }
}

export const generateComponentNodeByWidgetInfo = (
  displayName: string,
  widgetInfo: Omit<WidgetConfig, "icon" | "sessionType" | "keywords">,
  parentNodeDisplayName: string,
  pathToChildren: string[] = [],
  scale: number = 1,
) => {
  let baseDSL: ComponentTreeNode
  let childrenNodeDSL: ComponentTreeNode[] = []
  const {
    defaults,
    type,
    displayName: showName,
    containerType = CONTAINER_TYPE.EDITOR_SCALE_SQUARE,
    version,
  } = widgetInfo
  let props: Record<string, any> | undefined = {}
  if (typeof defaults === "function") {
    props = klona(defaults())
  } else {
    props = klona(defaults)
  }
  if (isObject(props) && Object.prototype.hasOwnProperty.call(props, "formDataKey")) {
    props.formDataKey = `{{${displayName}.displayName}}`
  }

  if (
    isObject(props) &&
    Object.prototype.hasOwnProperty.call(props, "events") &&
    Array.isArray(props.events)
  ) {
    props.events = props.events.map((event) => {
      if (event.actionType !== "widget") {
        return event
      } else {
        return {
          ...event,
          widgetID: pathToChildren[pathToChildren.length - 1] || "unknown",
        }
      }
    })
  }

  if (widgetInfo.childrenNode && Array.isArray(widgetInfo.childrenNode)) {
    pathToChildren =
      containerType === CONTAINER_TYPE.EDITOR_SCALE_SQUARE
        ? [...pathToChildren, displayName]
        : pathToChildren
    widgetInfo.childrenNode.map((childNode) => {
      if (!childrenNodeDSL) childrenNodeDSL = []
      const child = newGenerateChildrenComponentNode(
        childNode,
        displayName,
        pathToChildren,
        scale,
      )
      childrenNodeDSL.push(child)
    })
  }

  baseDSL = {
    showName: showName,
    type,
    displayName: displayName,
    containerType,
    parentNode: parentNodeDisplayName,
    childrenNode: childrenNodeDSL,
    version,
    props: props ?? {},
  }
  if (baseDSL.type === "LIST_WIDGET" || baseDSL.type === "GRID_LIST_WIDGET") {
    baseDSL = transformListWidget(baseDSL)
  }
  return baseDSL
}

export const newGenerateChildrenComponentNode = (
  widgetInfo: Omit<WidgetConfig, "icon" | "sessionType" | "keywords">,
  parentNodeDisplayName: string,
  pathToChildren: string[] = [],
  scale: number = 1,
): ComponentTreeNode => {
  if (widgetInfo.type === "CANVAS"||widgetInfo.type === "DIV") {
    const realDisplayName = DisplayNameGenerator.generateDisplayName(
      widgetInfo.type,
      widgetInfo.displayName,
    )
    let childrenNodeDSL: ComponentTreeNode[] = []
    if (
      Array.isArray(widgetInfo.childrenNode) &&
      widgetInfo.childrenNode.length > 0
    ) {
      widgetInfo.childrenNode.map((childNode) => {
        if (!childrenNodeDSL) childrenNodeDSL = []
        const child = newGenerateChildrenComponentNode(
          childNode,
          realDisplayName,
          pathToChildren,
          scale,
        )
        childrenNodeDSL.push(child)
      })
    }
    return {
      showName: widgetInfo.displayName,
      type: widgetInfo.type,
      containerType: widgetInfo.containerType as CONTAINER_TYPE,
      parentNode: parentNodeDisplayName,
      childrenNode: childrenNodeDSL,
      displayName: realDisplayName,
      props: {},
      version: widgetInfo.version,
    }
  }
  const layoutInfo = generateWidgetLayoutInfo(
    widgetInfo.type,
    widgetInfo.displayName,
    widgetInfo.containerType,
  )

  return generateComponentNodeByWidgetInfo(
    layoutInfo?.displayName || "",
    widgetInfo,
    parentNodeDisplayName,
    pathToChildren,
    scale,
  )
}

export const newGenerateComponentNode = (
  widgetType: WidgetType,
  displayName: string,
  parentNodeDisplayName: string,
  pathToChildren: string[] = [],
  scale: number = 1,
) => {
  let baseDSL: ComponentTreeNode
  const baseConfig = widgetBuilder(widgetType).config
  let childrenNodeDSL: ComponentTreeNode[] = []
  const {
    defaults,
    type,
    displayName: showName,
    containerType = CONTAINER_TYPE.EDITOR_SCALE_SQUARE,
  } = baseConfig
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let props: Record<string, any> | undefined = {}
  if (typeof defaults === "function") {
    props = klona(defaults())
  } else {
    props = klona(defaults)
  }
  if (isObject(props) && Object.hasOwn(props, "formDataKey")) {
    props.formDataKey = `{{${displayName}.displayName}}`
  }

  if (
    isObject(props) &&
    Object.prototype.hasOwnProperty.call(props, "events") &&
    Array.isArray(props.events)
  ) {
    props.events = props.events.map((event) => {
      if (event.actionType !== "widget") {
        return event
      } else {
        return {
          ...event,
          widgetID: pathToChildren[pathToChildren.length - 1] || "unknown",
        }
      }
    })
  }

  if (baseConfig.childrenNode && Array.isArray(baseConfig.childrenNode)) {
    pathToChildren =
      containerType === CONTAINER_TYPE.EDITOR_SCALE_SQUARE
        ? [...pathToChildren, displayName]
        : pathToChildren
    baseConfig.childrenNode.map((childNode) => {
      if (!childrenNodeDSL) childrenNodeDSL = []
      const child = newGenerateChildrenComponentNode(
        childNode,
        displayName,
        pathToChildren,
        scale,
      )
      childrenNodeDSL.push(child)
    })
  }

  baseDSL = {
    showName: showName,
    type,
    displayName: displayName,
    containerType,
    parentNode: parentNodeDisplayName,
    childrenNode: childrenNodeDSL,
    props: props ?? {},
  }
  if (baseDSL.type === "LIST_WIDGET" || baseDSL.type === "GRID_LIST_WIDGET") {
    baseDSL = transformListWidget(baseDSL)
  } else {
    baseDSL = transFormTemplateDisplayName(baseDSL)
  }
  return baseDSL
}

function transformListWidget(baseDSL: ComponentTreeNode) {
  const container = baseDSL.childrenNode[0]
  const templateChildren = container.childrenNode
  templateChildren.map((node) => {
    return transFormTemplateDisplayName(node, baseDSL.displayName)
  })
  return baseDSL
}

function transFormTemplateDisplayName(
  baseDSL: ComponentTreeNode,
  targetDisplayName: string = baseDSL.displayName,
) {
  const props = baseDSL.props
  if (props && Array.isArray(props.$dynamicAttrPaths)) {
    props.$dynamicAttrPaths.forEach((path) => {
      const originValue = get(baseDSL, `props.${path}`, "")
      const finalValue = originValue.replace(
        TEMPLATE_DISPLAYNAME_KEY,
        targetDisplayName,
      )
      set(baseDSL, `props.${path}`, finalValue)
    })
  }
  return baseDSL
}

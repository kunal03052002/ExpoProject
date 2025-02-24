import {
  ComponentTreeNode,
  PageNode,
  PageNodeProps,

} from "@/redux/currentApp/components/componentsState"

import { DisplayNameGenerator } from "./generateDisplayName"

// import { ModalSectionNode } from "@/redux/currentApp/editor/components/componentsState"
import { CONTAINER_TYPE, PADDING_MODE, SectionTreeNode } from "./interface"
import { globalColor } from "../colorBuilder"
export type SectionNodeType =
  | "bodySection"


export const generateSectionContainerConfig = (
  parentNode: string,
  showName: string,
): ComponentTreeNode => {
  const displayName = DisplayNameGenerator.generateDisplayName(
    "CONTAINER_NODE",
    `${parentNode}-${showName}`,
  )
  return {
    displayName: displayName,
    parentNode: parentNode,
    showName: showName,
    type: "CONTAINER_NODE",
    containerType: CONTAINER_TYPE.EDITOR_DOT_PANEL,
    h: 0,
    w: 0,
    minH: 0,
    minW: 0,
    x: -1,
    y: -1,
    z: 0,
    childrenNode: [],
    version: 0,
    props: {},
  }
}

// const generateSectionsChildrenMenuComponentNode = (
//   parentDisplayName: string,
// ) => {
//   const displayName = DisplayNameGenerator.generateDisplayName(
//     "MENU_WIDGET",
//     "menu",
//   )
//   const menuNode = newGenerateComponentNode(
//     0,
//     0,
//     32,
//     "MENU_WIDGET",
//     displayName,
//     parentDisplayName,
//   )
//   menuNode.props!.$dynamicAttrPaths = ["dataSources", "selectedValues"]
//   return menuNode
// }

export const generateSectionConfig = (
  parentNode: string,
  showName: SectionNodeType,
  bodySubpaths: string[] = ["sub-page1"],
): SectionTreeNode => {
  const displayName = DisplayNameGenerator.generateDisplayName(
    "SECTION_NODE",
    showName,
  )
  const childrenNode = generateSectionContainerConfig(
    displayName,
    `${showName}Container`,
  )

  const defaultSubPath =
    Array.isArray(bodySubpaths) && bodySubpaths.length > 0
      ? bodySubpaths[0]
      : "sub-page1"

  const result: SectionTreeNode = {
    displayName: `${displayName}`,
    parentNode: parentNode,
    showName: showName,
    type: "SECTION_NODE",
    containerType: CONTAINER_TYPE.EDITOR_LAYOUT_SQUARE,
    h: 0,
    w: 0,
    minH: 0,
    minW: 0,
    x: -1,
    y: -1,
    z: 0,
    version: 0,
    props: {
      currentViewIndex: 0,
      viewSortedKey: [childrenNode.displayName],
      defaultViewKey: defaultSubPath,
      sectionViewConfigs: [
        {
          id: String(Math.random() * 100),
          viewDisplayName: childrenNode.displayName,
          key: defaultSubPath,
          path: defaultSubPath,
        },
      ],
      style: {},
    },
    childrenNode: [childrenNode],
  }
  if (showName === "bodySection") {
    result.props.style = {
      padding: {
        mode: PADDING_MODE.ALL,
        size: "24",
      },
    }
  }
  if (showName !== "bodySection") {
    result.props.style = {
      dividerColor: globalColor("grayBlue-08"),
    }
  }
  return result
}

export const defaultPageProps: PageNodeProps = {
  layout: "default",

}

export const generatePageConfig = (): PageNode => {
  const displayName = DisplayNameGenerator.generateDisplayName(
    "PAGE_NODE",
    "page",
  )
  const childrenNode = generateSectionConfig(displayName, "bodySection")

  return {
    displayName: displayName,
    parentNode: "root",
    showName: "page",
    type: "PAGE_NODE",
    containerType: CONTAINER_TYPE.EDITOR_PAGE_SQUARE,
    version: 0,
    props: defaultPageProps,
    childrenNode: [childrenNode] ,
  }
}

export const generateDefaultLayoutConfig = (
  currentDisplayName: string,
): PageNode => {
  const childrenNode = generateSectionConfig(currentDisplayName, "bodySection")

  return {
    displayName: currentDisplayName,
    parentNode: "root",
    showName: "page",
    type: "PAGE_NODE",
    containerType: CONTAINER_TYPE.EDITOR_PAGE_SQUARE,
    h: 0,
    w: 0,
    minH: 0,
    minW: 0,
    x: -1,
    y: -1,
    z: 0,
    version: 0,
    props: {

      layout: "default",

    },
    childrenNode: [childrenNode],
  }
}

export const generatePresetALayoutConfig = (
  currentDisplayName: string,
): PageNode => {

  const bodySectionNode = generateSectionConfig(
    currentDisplayName,
    "bodySection",
  )


  return {
    displayName: currentDisplayName,
    parentNode: "root",
    showName: "page",
    type: "PAGE_NODE",
    containerType: CONTAINER_TYPE.EDITOR_PAGE_SQUARE,
    h: 0,
    w: 0,
    minH: 0,
    minW: 0,
    x: -1,
    y: -1,
    z: 0,
    version: 0,
    props: {

      layout: "presetA",

    },
    childrenNode: [bodySectionNode],
  }
}

export const generatePresetBLayoutConfig = (
  currentDisplayName: string,
): PageNode => {

  const bodySectionNode = generateSectionConfig(
    currentDisplayName,
    "bodySection",
  )


  return {
    displayName: currentDisplayName,
    parentNode: "root",
    showName: "page",
    type: "PAGE_NODE",
    containerType: CONTAINER_TYPE.EDITOR_PAGE_SQUARE,
    h: 0,
    w: 0,
    minH: 0,
    minW: 0,
    x: -1,
    y: -1,
    z: 0,
    version: 0,
    props: {
      layout: "presetB",

    },
    childrenNode: [
      bodySectionNode
    ],
  }
}

export const generatePresetCLayoutConfig = (
  currentDisplayName: string,
): PageNode => {

  const bodySectionNode = generateSectionConfig(
    currentDisplayName,
    "bodySection",
  )


  return {
    displayName: currentDisplayName,
    parentNode: "root",
    showName: "page",
    type: "PAGE_NODE",
    containerType: CONTAINER_TYPE.EDITOR_PAGE_SQUARE,
    h: 0,
    w: 0,
    minH: 0,
    minW: 0,
    x: -1,
    y: -1,
    z: 0,
    version: 0,
    props: {

      layout: "presetC",

    },
    childrenNode: [
      bodySectionNode,

    ],
  }
}

export const generatePresetDLayoutConfig = (
  currentDisplayName: string,
): PageNode => {
  const bodySectionNode = generateSectionConfig(
    currentDisplayName,
    "bodySection",
  )



  return {
    displayName: currentDisplayName,
    parentNode: "root",
    showName: "page",
    type: "PAGE_NODE",
    containerType: CONTAINER_TYPE.EDITOR_PAGE_SQUARE,
    h: 0,
    w: 0,
    minH: 0,
    minW: 0,
    x: -1,
    y: -1,
    z: 0,
    version: 0,
    props: {

      layout: "presetD",

    },
    childrenNode: [

      bodySectionNode,

    ],
  }
}

export const generatePresetELayoutConfig = (
  currentDisplayName: string,
): PageNode => {

  const bodySectionNode = generateSectionConfig(
    currentDisplayName,
    "bodySection",
  )


  return {
    displayName: currentDisplayName,
    parentNode: "root",
    showName: "page",
    type: "PAGE_NODE",
    containerType: CONTAINER_TYPE.EDITOR_PAGE_SQUARE,
    h: 0,
    w: 0,
    minH: 0,
    minW: 0,
    x: -1,
    y: -1,
    z: 0,
    version: 0,
    props: {

      layout: "presetE",

    },
    childrenNode: [
      bodySectionNode,

    ],
  }
}

export const layoutValueMapGenerateConfig = {
  default: generateDefaultLayoutConfig,
  presetA: generatePresetALayoutConfig,
  presetB: generatePresetBLayoutConfig,
  presetC: generatePresetCLayoutConfig,
  presetD: generatePresetDLayoutConfig,
  presetE: generatePresetELayoutConfig,
}

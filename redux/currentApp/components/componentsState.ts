/* eslint-disable @typescript-eslint/no-explicit-any */
export enum CONTAINER_TYPE {
  "EDITOR_DOT_PANEL" = "EDITOR_DOT_PANEL",
  "EDITOR_SCALE_SQUARE" = "EDITOR_SCALE_SQUARE",
  "EDITOR_PAGE_SQUARE" = "EDITOR_PAGE_SQUARE",
  "EDITOR_LAYOUT_SQUARE" = "EDITOR_LAYOUT_SQUARE",
}

export enum SECTION_POSITION {
  "TOP" = "TOP",
  "BOTTOM" = "BOTTOM",
  "CENTER" = "CENTER",
  "FULL" = "FULL",
  "NONE" = "NONE",
}

interface BaseComponentNode {
  version?: number
  displayName: string
  parentNode: string | null
  showName: string
  type: string
  containerType: CONTAINER_TYPE | any
  columnSpan?:number,
  templateName?:string,
  startColumn?:number,
  rowSpan?:number,
  startRow?:number
  props: {

    [key: string]: any
  } | null
  namePrefix?:string
}

export interface ComponentMapNode extends BaseComponentNode {
  childrenNode: string[]
}
// export interface RootComponentNode extends ComponentMapNode {
//   type: "DOT_PANEL"
//   props: RootComponentNodeProps
// }

export type ViewportSizeType = "fluid" | "desktop" | "tablet" | "custom"

export interface RootComponentNodeProps {
  currentPageIndex: number
  pageSortedKey: string[]
  homepageDisplayName?: string
  viewportWidth?: number
  viewportHeight?: number
  viewportSizeType?: ViewportSizeType
  currentSubPagePath?: string
}


export interface PageNodeProps {
  layout: string

}
export interface ComponentTreeNode extends BaseComponentNode {
  childrenNode: ComponentTreeNode[]
}
export interface PageNode extends ComponentTreeNode {
  type: "PAGE_NODE"
  props: PageNodeProps
}
export interface SectionViewShape {
  viewDisplayName: string
  key: string
  id: string
  path: string
}
// const com = JSON.parse(localStorage.getItem("App"));
export type ComponentsState = Record<string, ComponentMapNode>
export const ComponentsInitialState: ComponentsState =
{
  "root": {
    "version": 0,
    "displayName": "root",
    "parentNode": "",
    "showName": "root",
    "childrenNode": [
      "page1"
    ],
    namePrefix:"impakt",
    "type": "DOT_PANEL",
    "containerType": "EDITOR_DOT_PANEL",
    "h": 0,
    "w": 0,
    "minH": 0,
    "minW": 0,
    "x": -1,
    "y": -1,
    "z": 0,
    "props": {
      "currentPageIndex": 0,
      "pageSortedKey": [
        "page1"
      ]
    }
  },
  "page1": {
    "version": 0,
    "displayName": "page1",
    "parentNode": "root",
    "showName": "page",
    "childrenNode": [
      "bodySection1"
    ],
    "type": "PAGE_NODE",
    "containerType": "EDITOR_PAGE_SQUARE",
    "h": 0,
    "w": 0,
    "minH": 0,
    "minW": 0,
    "x": -1,
    "y": -1,
    "z": 0,
    "props": {
      "layout": "default",
      "mode":"page",
      "templateName":"layout2",
    }
  },
  "bodySection1": {
    "version": 0,
    "displayName": "bodySection1",
    "parentNode": "page1",
    "showName": "bodySection",
    "childrenNode": [
      "bodySection1-bodySectionContainer1"
    ],
    "type": "SECTION_NODE",
    "containerType": "EDITOR_LAYOUT_SQUARE",
    "h": 0,
    "w": 0,
    "minH": 0,
    "minW": 0,
    "x": -1,
    "y": -1,
    "z": 0,
    "props": {
      "currentViewIndex": 0,
      "defaultViewKey": "sub-page1",
      "sectionViewConfigs": [
        {
          "id": "9ac3c766-3320-4f0f-a119-cd57b621127b",
          "key": "sub-page1",
          "path": "sub-page1",
          "viewDisplayName": "bodySection1-bodySectionContainer1"
        }
      ],
      "style": {
        "padding": {
          "mode": "all",
          "size": "24"
        }
      },
      "viewSortedKey": [
        "bodySection1-bodySectionContainer1"
      ]
    }
  },
  "bodySection1-bodySectionContainer1": {
    "version": 0,
    "displayName": "bodySection1-bodySectionContainer1",
    "parentNode": "bodySection1",
    "showName": "bodySection1-bodySectionContainer1",
    "childrenNode": [],
    "type": "CONTAINER_NODE",
    "containerType": "EDITOR_DOT_PANEL",
    "h": 0,
    "w": 0,
    "minH": 0,
    "minW": 0,
    "x": -1,
    "y": -1,
    "z": 0,
    "props": {}
  }
  
};

export interface DeleteComponentNodePayload {
  displayNames: string[]
  source?: "keyboard" | "manage_delete" | "left_delete" | "left_multi_delete"
}

export interface DeletePageNodePayload {
  displayName: string
  originPageSortedKey: string[]
}

export interface SortComponentNodeChildrenPayload {
  parentDisplayName: string
  newChildrenNode: string[]
}

export interface UpdateComponentPropsPayload {
  displayName: string
  updateSlice: Record<string, any>
  notUseUndoRedo?: boolean
}

export interface AddContainerComponentViewsReducerPayload {
  displayName: string
  containerDisplayName: string
  linkedDisplayName?: string
  addedViewItem: {
    id: string
    key: string
    label: string
    disabled?: string
    hidden?: string
  }[]
  addComponent: ComponentTreeNode
}

export interface DeleteContainerComponentViewsReducerPayload {
  displayName: string
  containerDisplayName: string
  linkedDisplayName?: string
  deletedIndex: number
}
export interface UpdateComponentDisplayNamePayload {
  displayName: string
  newDisplayName: string
}

export interface UpdateComponentReflowPayload {
  parentDisplayName: string
  childNodes: ComponentMapNode[]
}

export interface UpdateTargetPageLayoutPayload {
  pageName: string
  layout:
  | "default"
  | "presetA"
  | "presetB"
  | "presetC"
  | "presetD"
  | "presetE"
  | "Custom"
  originPageNode?: ComponentTreeNode
}

export interface UpdateTargetPagePropsPayload {
  pageName: string
  newProps: Partial<PageNodeProps>
  options?: Record<string, any>
  notUseUndoRedo?: boolean
}

export interface DeleteTargetPageSectionPayload {
  pageName: string
  deleteSectionName:
  | "leftSection"
  | "rightSection"
  | "headerSection"
  | "footerSection"
}

export interface AddTargetPageSectionPayload {
  pageName: string
  addedSectionName:"bodySection"
  originSectionNode?: ComponentTreeNode
}

export interface AddSectionViewPayload {
  parentNodeName: string
  sectionName:

  | "bodySection"
  originChildrenNode?: ComponentTreeNode[]
}

export interface AddSectionViewByConfigPayload extends AddSectionViewPayload {
  sectionViewNode: ComponentTreeNode
  sectionViewConfig: SectionViewShape
}

export interface DeleteSectionViewPayload {
  viewDisplayName: string
  parentNodeName: string
  originPageSortedKey: string[]
}

export interface UpdateSectionViewPropsPayload {
  parentNodeName: string

  newProps: Record<string, any>
}

export interface AddModalComponentPayload {
  currentPageDisplayName: string
  modalComponentNode: ComponentTreeNode
}

export interface UpdateComponentNodeHeightPayload {
  displayName: string
  height: number
  oldHeight: number
}

export interface SetGlobalStatePayload {
  key: string
  value: string
  oldKey?: string
}

export interface DeleteGlobalStatePayload {
  key: string
}

export interface DeleteSubPageViewNodePayload {
  pageName: string
  subPagePath: string
}

export interface UpdateCurrentPageStylePayload {
  pageName: string

  style: Record<string, any>
  sectionName:
  | "bodySection"
}

export interface DeleteCurrentPageStylePayload {
  pageName: string
  styleKey: string
  sectionName:
  | "bodySection"
}

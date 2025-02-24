
import i18next from "i18next"
import { ResourceType } from "../resource"

export const ACTION_MODAL_WIDTH = 1080

export interface ResourceItem {
  resourceType: ResourceType
  hidden?: boolean
}

export const Databases: ResourceItem[] = [
  {
    resourceType: "impaktapps",
    hidden: false,
  },
]

export const Apis: ResourceItem[] = [
  {
    resourceType: "restapi",
    hidden: false,
  },
 
]

export const ResourceTypeList = [
  {
    title: i18next.t("editor.action.type.database"),
    item: Databases,
    category: "databases" as const,
  },
  {
    title: i18next.t("editor.action.type.api"),
    item: Apis,
    category: "apis" as const,
  },
  {
    title: i18next.t("editor.action.form.title.feedback"),
    item: [],
    category: "notFind" as const,
  },
]

export const WHITE_LIST_IP = [
  "143.198.75.2",
  "146.190.51.14",
  "146.190.35.24",
  "64.23.134.60",
  "146.190.59.192",
]

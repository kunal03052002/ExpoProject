import { generateRawWidget } from "@/utils/executionTreeHelper/generateRawWidget"
import {
  CurrentUserInfoInTree,
  RawTreeSeedShape,
  RawTreeShape,
} from "@/utils/executionTreeHelper/interface"
// import { CUSTOM_STORAGE_PREFIX } from "../storage"
import { generateGlobalData } from "./generateGlobalData"
import { generateCurrentPageInfo, generatePageInfos } from "./generatePageInfo"
import { generateUrlParams } from "./generateUrlParams"
import { generateRawAction } from "./generateRawAction"
import { CUSTOM_STORAGE_PREFIX } from "@/redux/currentApp/executionTree/executionReducer"
// import { generateUrlParams } from "./generateUrlParams"

export const CURRENT_USER_INFO_ACCESS_LIST_KEY = [
  "userID",
  "nickname",
  "email",
  "avatar",
  "language",
  "createdAt",
  "updatedAt",
]

export class RawTreeFactory {
  static create(seeds: RawTreeSeedShape): RawTreeShape {
    const { widgets, actions, globalData, classes, theme } = seeds
    const rawTree: RawTreeShape = {} as RawTreeShape

    actions.forEach((action) => {
      rawTree[action.displayName] = generateRawAction(action)
    })

    Object.keys(widgets).forEach((key) => {
      rawTree[key] = generateRawWidget(widgets[key])
    })

    const customStorage = localStorage[CUSTOM_STORAGE_PREFIX]

    const canShownUserInfo: CurrentUserInfoInTree = {
      userID: "2811",
      nickname: "sattu",
      email: "raghavji2811@gmail.com",
      avatar: "sattu",
      language: "en-us",
      createdAt: "02-06-2000",
      updateAt: "02-06-2000"
    };

    // rawTree.builderInfo = builderInfo
    rawTree.classes = classes;
    rawTree.theme = theme;
    rawTree.currentUserInfo = canShownUserInfo
    rawTree.globalData = generateGlobalData(globalData)
    rawTree.urlParams = generateUrlParams()
    rawTree.localStorage = customStorage ? JSON.parse(customStorage) : {}
    rawTree.currentPageInfo = generateCurrentPageInfo()
    rawTree.pageInfos = generatePageInfos(widgets)
    return rawTree
  }
}

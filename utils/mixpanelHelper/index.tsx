import {
    getIsIMPAKTMode,
    getIsIMPAKTProductMode,
  } from "@/redux/config/configSelector"
//   import { getAppInfo } from "@/redux/currentApp/appInfo/appInfoSelector"
  import { getRootComponentNode } from "@/redux/currentApp/components/componentsSelector"
  import { getExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"
//   import { getGuideInfo } from "@/redux/guide/guideSelector"
//   import { ILLARoute } from "@/router"
  import store from "@/store"
  
const getAppInfo = (root) =>{
  return root;
}  
  type ILLAPropertiesPrefix<T extends string, U> = `${T}${string & U}`
  
  type ILLAPrefixedPropertiesInterface<T extends string, U> = {
    [key in ILLAPropertiesPrefix<T, keyof U>]: unknown
  }
  
  interface ILLAExtendedProperties {
    [key: string]: unknown
  }
  
  interface ILLABaseProperties {
    page: ILLA_PAGE_NAME
    element?: string
    consume?: string | number
    team_id?: string
    user_id?: string
  }
  
  type ILLAPrefixedExtendProperties = ILLAPrefixedPropertiesInterface<
    "parameter",
    ILLAExtendedProperties
  >
  
  /**
   * page: 事件发生在哪个页面
   * element: 事件发生在哪个组件上
   * consume: 处理耗时相关数据
   * parameter1: 附加的状态或选项或不同的触发方式
   * parameter2: 附加的状态或选项等、成功或失败等
   * parameter3: 最终选的或填入的内容、成功或失败的详情
   * parameter4: 最终选的或填入的内容
   * parameter5: 最终选的或填入的内容，如app_id
   * parameter6: 编辑页上报预览尺寸等
   * parameter7: page的参数等
   * parameter8: app_type，应用是什么类型，onboarding app还是普通的app
   * parameter9: app是否部署了
   * parameter10: app是否公开
   * parameter11: user_type
   * 其他字段均为预留字段
   */
  export type ILLAProperties = ILLABaseProperties & ILLAPrefixedExtendProperties
  
  export enum ILLA_MIXPANEL_EVENT_TYPE {
    VISIT = "visit",
    SHOW = "show",
    CLICK = "click",
    INITIALIZE = "initialize",
    VALIDATE = "validate",
    REQUEST = "request",
    SELECT = "select",
    FOCUS = "focus",
    BLUR = "blur",
    KEYDOWN = "keydown",
    KEYUP = "keyup",
    ADD = "add",
    DRAG = "drag",
    DUPLICATE = "duplicate",
    RENAME = "rename",
    HOVER = "hover",
    CHANGE = "change",
    DELETE = "delete",
    ILLA_ACTIVE = "illa_active",
  }
  
  export enum ILLA_MIXPANEL_CLOUD_PAGE_NAME {
    HOMEPAGE = "cloud_homepage",
    WORKSPACE = "cloud_workspace",
    MEMBER = "cloud_member",
    PROFILE_SETTING = "profile_setting",
    TEAM_SETTING = "team_setting",
    TEAM_MEMBER = "team_member",
    DRIVE_FILES = "drive_files",
    DRIVE_PREVIEW = "drive_preview",
    DRIVE_SHARE = "drive_share",
    DRIVE_CAPACITY = "drive_capacity",
    AUDIT_LOGS = "audit_logs",
    SETTING = "setting",
    PASSWORD_SETTING = "password_setting",
    ACCOUNT_SETTING = "account_setting",
    LANGUAGE_SETTING = "language_setting",
    LINKED_SETTING = "linked_setting",
    APP = "builder_app",
    RESOURCE = "builder_resource",
    AI_AGENT_DASHBOARD = "ai_agent_dashboard",
    FLOW_DASHBOARD = "flow_dashboard",
  }
  
  export enum ILLA_MIXPANEL_PUBLIC_PAGE_NAME {
    LOGIN = "login",
    SIGNUP = "sign_up",
    FORGET_PASSWORD = "forget_password",
    ERROR_PAGE = "error_page",
    MOBILE_FORBIDDEN = "mobile_forbidden",
    PLACEHOLDER = "Impakt",
  }
  
  export enum ILLA_MIXPANEL_MARKET_PAGE_NAME {
    COMMUNITY_AGENT_HOMEPAGE = "community_agent_homepage",
    COMMUNITY_AGENT_DETAIL = "community_agent_detail",
    COMMUNITY_APP_HOMEPAGE = "community_app_homepage",
    COMMUNITY_APP_DETAIL = "community_app_detail",
  }
  
  export enum ILLA_MIXPANEL_FLOW_PAGE_NAME {
    EDITOR = "flow_editor",
  }
  
  export type ILLA_PAGE_NAME =
    | ILLA_MIXPANEL_CLOUD_PAGE_NAME
    | ILLA_MIXPANEL_PUBLIC_PAGE_NAME
    | ILLA_MIXPANEL_BUILDER_PAGE_NAME
    | ILLA_MIXPANEL_MARKET_PAGE_NAME
    | ILLA_MIXPANEL_FLOW_PAGE_NAME
  
  export enum ILLA_MIXPANEL_BUILDER_PAGE_NAME {
    TUTORIAL = "builder_tutorial",
    EDITOR = "builder_editor",
    PREVIEW = "app_preview",
    DEPLOY = "builder_deploy",
    BUILDER_TUTORIAL_PREVIEW = "builder_tutorial_preview",
    AI_AGENT_RUN = "ai_agent_run",
    AI_AGENT_EDIT = "ai_agent_edit",
    RESOURCE_EDIT = "resource_edit",
  }
  const getInfoFromUrl = () => {
    return {
      appId: "",
      teamIdentifier: "jkl;",
    }
  }
  
  const getPreviewInfo = () => {
    const rootState = store.getState()
    const rootNode = getRootComponentNode(rootState)
    const isProduction = getIsIMPAKTProductMode(rootState)
    const rootProps = rootNode?.props
    if (!rootProps)
      return {
        w: "auto",
        h: "auto",
      }
    const { viewportWidth = "auto", viewportHeight = "auto" } = rootProps
    return {
      w: isProduction ? "auto" : viewportWidth,
      h: isProduction ? "auto" : viewportHeight,
    }
  }
  
  const getPageInfo = () => {
    const rootState = store.getState()
    const executionResult = getExecutionResult(rootState)
    const rootExecutionProps = executionResult.root
    const result: Record<string, unknown>[] = []
    if (!rootExecutionProps) return result
    const { pageSortedKey, homepageDisplayName } = rootExecutionProps
    if (!Array.isArray(pageSortedKey) || pageSortedKey.length === 0) return result
    pageSortedKey.forEach((key) => {
      const pageInfo = executionResult[key]
      if (!pageInfo) return
      const childrenNode = (pageInfo.$childrenNode || []) as string[]
      let leftViews: number = 0
      let rightViews: number = 0
      let headerViews: number = 0
      let footerViews: number = 0
      let bodyViews: number = 0
      childrenNode.forEach((node) => {
        const nodeInfo = executionResult[node]
        if (!nodeInfo) return
        const { displayName, viewSortedKey } = nodeInfo
        const viewsNumber = Array.isArray(viewSortedKey)
          ? viewSortedKey.length
          : 0
        if (displayName.startsWith("left")) {
          leftViews = viewsNumber
        } else if (displayName.startsWith("right")) {
          rightViews = viewsNumber
        } else if (displayName.startsWith("header")) {
          headerViews = viewsNumber
        } else if (displayName.startsWith("footer")) {
          footerViews = viewsNumber
        } else if (displayName.startsWith("body")) {
          bodyViews = viewsNumber
        }
      })
      const item = {
        homepage: (homepageDisplayName || pageSortedKey[0]) === key,
        left: leftViews,
        right: rightViews,
        header: headerViews,
        footer: footerViews,
        body: bodyViews,
      }
      result.push(item)
    })
    return result
  }
  
//   const getTeamInfo = () => {
//     // const teamInfo = getCurrentTeamInfo(store.getState())
//     return {
//       role:  "-1",
//     }
//   }
  
  const getAppType = () => {
    // const rootState = store.getState()
    // const guide = getGuideInfo(rootState)
    return "Normal"
  }
  
  const getAppIsPublish = () => {
    const rootState = store.getState()
    const appInfo = getAppInfo(rootState)
    return appInfo.deployed
  }
  
  const getAppIsPublic = () => {
    const rootState = store.getState()
    const appInfo = getAppInfo(rootState)
    return appInfo.config.public
  }
  
//   const getUserID = () => {
//     // const userInfo = getCurrentUser(store.getState())
//     return ""
//   }
  
  const getAPPMode = () => {
    const rootState = store.getState()
    const appMode = getIsIMPAKTMode(rootState)
    return appMode
  }
  
  const getPageName = () => {
    const appMode = getAPPMode()
    switch (appMode) {
      case "edit": {
        return ILLA_MIXPANEL_BUILDER_PAGE_NAME.EDITOR
      }
      case "preview": {
        return ILLA_MIXPANEL_BUILDER_PAGE_NAME.PREVIEW
      }
      case "production": {
        return ILLA_MIXPANEL_BUILDER_PAGE_NAME.DEPLOY
      }
      default: {
        return ILLA_MIXPANEL_BUILDER_PAGE_NAME.EDITOR
      }
    }
  }
  
  export const track = (
    _event: ILLA_MIXPANEL_EVENT_TYPE,
    _pageName: ILLA_PAGE_NAME,
    _properties: Omit<ILLAProperties, "parameter11" | "team_id" | "page"> = {},
  ) => {
    // console.log(event,pageName,properties)
    // const { teamIdentifier } = getInfoFromUrl()
    // const { role } = getTeamInfo()
    // const userID = getUserID()
    // ILLAMixpanel.track(event, {
    //   ...properties,
    //   page: pageName,
    //   user_id: userID,
    //   parameter11: role,
    //   team_id: teamIdentifier,
    // }
  // )
  }
  
  export const trackInEditor = (
    event: ILLA_MIXPANEL_EVENT_TYPE,
    properties: Omit<
      ILLAProperties,
      | "parameter5"
      | "parameter6"
      | "parameter7"
      | "parameter8"
      | "parameter9"
      | "parameter10"
      | "parameter11"
      | "team_id"
      | "page"
      | "user_id"
    > = {},
  ) => {
    const previewInfo = getPreviewInfo()
    const pageInfo = getPageInfo()
    const appType = getAppType()
    const isPublish = getAppIsPublish()
    const isPublic = getAppIsPublic()
    const pageName = getPageName()
    const { appId } = getInfoFromUrl()
    track(event, pageName, {
      ...properties,
      parameter5: appId,
      parameter6: previewInfo,
      parameter7: pageInfo,
      parameter8: appType,
      parameter9: isPublish,
      parameter10: isPublic,
    })
  }
  
  export const trackPageDurationStart = () => {
    // ILLAMixpanel.pageTimeEvent()
  }
  
  export const trackPageDurationEnd = (pageName: ILLA_PAGE_NAME) => {
    const { teamIdentifier } = getInfoFromUrl()
    // ILLAMixpanel.trackTimeEvent(pageName, teamIdentifier ?? "-1")
  }
  
  export const resourceContextHelper = (parameter1: string) => {
    return (
      event: ILLA_MIXPANEL_EVENT_TYPE,
      pageName: ILLA_PAGE_NAME,
      properties: Omit<ILLAProperties, "page">,
    ) => {
      const mergeParam = parameter1 ? { ...properties, parameter1 } : properties
      track(event, pageName, mergeParam)
    }
  }
  
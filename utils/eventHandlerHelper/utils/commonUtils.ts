/* eslint-disable @typescript-eslint/no-explicit-any */
// import download from "downloadjs"
import {
  getComponentMap,
  searchComponentFromMap,
} from "@/redux/currentApp/components/componentsSelector"
import { getRootNodeExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"
import { executionActions } from "@/redux/currentApp/executionTree/executionSlice"
import { UpdateExecutionByDisplayNamePayload } from "@/redux/currentApp/executionTree/executionState"
import store from "@/store"
import { SectionViewShape } from "@/redux/utils"
import { createNotification } from "@/utils/Notification"


export type NotificationType =
  | "info"
  | "error"
  | "success"
  | "warning"
  | "normal"


export const goToURL = (params: { url: string; newTab?: boolean }) => {
  const { url = "", newTab = false } = params
  if (typeof url !== "string" || typeof newTab !== "boolean") return
  let finalURL = url
  if (!finalURL) return
  // if (!isValidUrlScheme(finalURL)) {
  finalURL = `https://${finalURL}`
  // }
  if (newTab) {
    window.open(finalURL, "_blank")
  } else {
    window.location.assign(finalURL)
  }
}

export const showNotification = (params: {
  type: NotificationType
  title?: string
  description?: string
  duration?: number
}) => {
  const {
    type = "info",
    title = "",
    description = "",
    duration = 4500,
  } = params
  if (typeof type !== "string" || typeof duration !== "number") return
  const notification = createNotification()
  notification.show({
    title: `${title}`,
    content: `${description}`,
    duration,
    type,
  })
}

export const copyToClipboard = (copiedValue: unknown) => {
  console.log(copiedValue)
}

export const setRouter = (params: { pagePath: string; viewPath?: string }) => {
  const { pagePath, viewPath = "" } = params
  if (typeof pagePath !== "string" || typeof viewPath !== "string") return
  const rootNodeProps = getRootNodeExecutionResult(store.getState())
  const { pageSortedKey } = rootNodeProps
  const index = pageSortedKey.findIndex((path: string) => path === pagePath)
  if (index === -1) return
  // const routerMatch = ILLARoute.state.matches[0]
  // if (!routerMatch) return
  // const { appId, teamIdentifier } = routerMatch.params
  // if (isProductionMode) {
  //   let finalPath = `/${pagePath}`
  //   finalPath = viewPath ? finalPath + `/${viewPath}` : finalPath
  //   // ILLARoute.navigate(`/${teamIdentifier}/deploy/app/${appId}${finalPath}`, {
  //   //   replace: true,
  //   // })
  //   console.log(finalPath)
  // }
  const updateSlice: UpdateExecutionByDisplayNamePayload[] = [
    {
      displayName: "root",
      value: {
        currentPageIndex: index,
      },
    },
  ]
  if (viewPath) {
    const components = getComponentMap(store.getState())
    if (!components) return
    const pageNode = searchComponentFromMap(components, pagePath)
    if (!pageNode) return
    pageNode.childrenNode.forEach((sectionDisplayName) => {
      const sectionNode = components[sectionDisplayName]
      const sectionViewConfigs = sectionNode.props?.sectionViewConfigs || []
      const viewSortedKey = sectionNode.props?.viewSortedKey || []
      const findConfig = sectionViewConfigs.find((config: SectionViewShape) => {
        return config.path === viewPath
      })
      if (findConfig) {
        const viewDisplayName = findConfig.viewDisplayName
        const indexOfViewKey = viewSortedKey.findIndex(
          (key: string) => key === viewDisplayName,
        )
        if (indexOfViewKey !== -1) {
          updateSlice.push({
            displayName: sectionDisplayName,
            value: {
              currentViewIndex: indexOfViewKey,
            },
          })
        }
      }
    })
  }

  store.dispatch(
    executionActions.updateExecutionByMultiDisplayNameReducer(updateSlice),
  )
  if (!viewPath) {
    store.dispatch(
      executionActions.updateCurrentPagePathReducer({
        pageDisplayName: pagePath,
      }),
    )
  } else {
    store.dispatch(
      executionActions.updateCurrentPagePathReducer({
        pageDisplayName: pagePath,
        subPagePath: viewPath,
      }),
    )
  }
}

export const downloadFile = (obj
) => {
  const data = obj.data;
  const name = obj.name;
  const mimeType = obj.type || '';
  const byteCharacters = atob(data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: mimeType });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = name;
  document.body.appendChild(link);
  link.click();

  URL.revokeObjectURL(url);
  document.body.removeChild(link);
}

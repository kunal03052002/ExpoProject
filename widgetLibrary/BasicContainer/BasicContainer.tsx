
import { CONTAINER_TYPE } from "@/utils/generators/interface"

export const BasicContainerConfig = {
  type: "CANVAS",
  displayName: "View",
  widgetName: "View",
  containerType: CONTAINER_TYPE.EDITOR_DOT_PANEL,
  version: 0,
}

export const generateBasicContainerConfig = (displayName: string) => {
  return {
    ...BasicContainerConfig,
    displayName,
    widgetName: displayName,
  }
}

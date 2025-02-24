import { v4 } from "uuid"
import { ReactComponent as ContainerWidgetIcon} from "@/assets/widgetCover/container.svg"
import { BasicContainerConfig } from "@/widgetLibrary/BasicContainer/BasicContainer"
import {  WidgetConfig } from "@/widgetLibrary/interface"

const defaultListView = [
  { id: v4(), key: "View 1", label: "View 1" },
  { id: v4(), key: "View 2", label: "View 2" },
  { id: v4(), key: "View 3", label: "View 3" },
]

export const CONTAINER_WIDGET_CONFIG: any = {
  type: "CONTAINER_WIDGET",
  displayName: "container",
  widgetName: "Container",
  keywords: ["container", "容器"],
  icon: null,
  sessionType: "CONTAINER",
  version: 0,
  childrenNode: [
    BasicContainerConfig,
    BasicContainerConfig,
    BasicContainerConfig,
  ],
  defaults: {
    viewList: [],
    currentIndex: 0,
    currentKey: "View 1",
    dynamicHeight: "auto",
  },
}

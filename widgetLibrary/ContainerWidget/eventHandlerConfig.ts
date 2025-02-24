// import i18n from "@/i18n/config"
import { EventHandlerConfig } from "@/widgetLibrary/interface"
export const CONTAINER_EVENT_HANDLER_CONFIG: EventHandlerConfig = {
  events: [
    {
      label: "Click",
      value: "click",
    },
    {
      label: "Change",
      value: "change",
    },
  ],
  methods: [
    "setCurrentViewKey",
    "setCurrentViewIndex",
    "showNextView",
    "showNextVisibleView",
    "showPreviousView",
    "showPreviousVisibleView",
  ],
}

import { ACTION_RUN_TIME, ActionContent, ActionItem, IAdvancedConfig, IMockConfig } from "@/redux/currentApp/action/interface"
export interface Transformer {
  rawData: string
  enable: boolean
}

export const INIT_ACTION_ADVANCED_CONFIG: IAdvancedConfig = {
  runtime: ACTION_RUN_TIME.NONE,
  pages: [],
  delayWhenLoaded: "",
  displayLoadingPage: false,
  isPeriodically: false,
  periodInterval: "",
}

export const INIT_ACTION_MOCK_CONFIG: IMockConfig = {
  enabled: false,
  enableForReleasedApp: false,
  mockData: "",
}

export const TransformerInitial: Transformer = {
  rawData: "",
  enable: false,
}

export const TransformerInitialTrue: Transformer = {
  rawData:
    "// type your code here\n" +
    "// example: return formatDataAsArray(data).filter(row => row.quantity > 20)\n" +
    "return data",
  enable: true,
}

export const actionItemInitial: Pick<
  ActionItem<ActionContent>,
  "transformer" | "triggerMode"
> = {
  transformer: TransformerInitial,
  triggerMode: "manually",
}

export * from "./restapiAction"
export * from "./transformerAction"


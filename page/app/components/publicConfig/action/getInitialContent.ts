
import { ActionContent, ActionType } from "@/redux/currentApp/action/interface"
import { TransformerActionInitial } from "./transformerAction"
import { RestAPIActionInitial } from "./restapiAction"
export type MysqlLikeActionMode = "gui" | "sql" | "sql-safe"

export interface MysqlLikeAction {
  mode: MysqlLikeActionMode
  query: string
}
export const MysqlLikeActionInitial: MysqlLikeAction = {
  mode: "sql-safe",
  query: "",
}

export function getInitialContent(actionType: ActionType): ActionContent {
  switch (actionType) {
    // case "clickhouse":
    // case "supabasedb":
    // case "mariadb":
    // case "tidb":
    // case "mysql":
    // case "postgresql":
    // case "snowflake":
    // case "hydra":
    // case "neon":
    //   return MysqlLikeActionInitial
    case "restapi":
      return RestAPIActionInitial
    case "transformer":
      return TransformerActionInitial 
    default:
      return {} as ActionContent
  }
}

// export function getInitialAgentContent(agent: Agent): BaseAiAgentActionContent {
//   return {
//     agentType: agent.agentType,
//     model: agent.model,
//     variables: agent.variables,
//     input: "",
//     modelConfig: {
//       stream: false,
//     },
//   }
// }

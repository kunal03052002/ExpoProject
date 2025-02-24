import { ActionType } from "@/redux/currentApp/action/interface"




export const transformDataFormat = (
  actionType: ActionType,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  contents: Record<string, any>,
) => {
  switch (actionType) {
   
    case "restapi": {
      if (contents.bodyType === "raw" && contents.body?.content) {
        return {
          ...contents,
          body: {
            ...contents.body,
            content: JSON.stringify(contents.body.content),
          },
        }
      }
      return contents
    }
    default:
      return contents
  }
}

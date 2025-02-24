
import { v4 } from "uuid"
// import i18n from "@/i18n/config"
import { getIsIMPAKTGuideMode } from "@/redux/config/configSelector"
import { actionActions } from "@/redux/currentApp/action/actionSlice"
import { componentsActions } from "@/redux/currentApp/components/componentsSlice"
import store from "@/store"
import { DisplayNameGenerator } from "@/utils/generators/generateDisplayName"
import { ActionContent, ActionItem } from "@/redux/currentApp/action/interface"
import { omit } from "@/utils/model/src/omit"
import { GlobalDataActionContent } from "../PublicTypes/action/globalData"
import { configActions } from "@/redux/config/configSlice"
export async function onCopyActionItem(action: ActionItem<ActionContent>) {
  const isGuideMode = getIsIMPAKTGuideMode(store.getState())
  const newAction = omit(action, ["displayName", "actionID"])
  const displayName = DisplayNameGenerator.generateDisplayName(
    action.actionType === "globalData" ? "state" : action.actionType,
  )
  const data: Omit<ActionItem<ActionContent>, "actionID"> = {
    ...newAction,
    displayName,
  }
  if (action.actionType === "globalData") {
    store.dispatch(
      componentsActions.setGlobalStateReducer({
        key: data.displayName,
        value: (data.content as GlobalDataActionContent).initialValue,
        oldKey: "",
      }),
    )
    return
  }
  if (isGuideMode) {
    const createActionData: ActionItem<ActionContent> = {
      ...data,
      actionID: v4(),
    }
    store.dispatch(actionActions.addActionItemReducer(createActionData))
    return
  }
  try {
    // const response = await fetchCreateAction(data)
  }catch(e){
    //co
  }
}

export async function onDeleteActionItem(action: ActionItem<ActionContent>) {
  const { actionID, displayName } = action

  try {
    // await fetchDeleteAction(actionID)   
    store.dispatch(configActions.resetSelectedActionReducer(displayName))
    store.dispatch(
      actionActions.removeActionItemReducer({
        actionID: actionID,
        displayName,
      }),
    )
 
  } catch (e) {
    // if (isILLAAPiError(e)) {
    //   message.error({
    //     content: i18n.t("editor.action.action_list.message.failed"),
    //   })
    // }
  }
}

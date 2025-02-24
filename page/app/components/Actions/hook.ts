/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from "react"
import { useDispatch, } from "react-redux"
import { DisplayNameGenerator } from "@/utils/generators/generateDisplayName"
import { 
  // ActionContent,
  // ActionItem,
  ActionType } from "@/redux/currentApp/action/interface"
import { INIT_ACTION_ADVANCED_CONFIG, INIT_ACTION_MOCK_CONFIG, actionItemInitial } from "../publicConfig/action"
import { getInitialContent } from "../publicConfig/action/getInitialContent"
import { actionActions } from "@/redux/currentApp/action/actionSlice"
import { configActions } from "@/redux/config/configSlice"
import { v4 } from "uuid"

export const useCreateAction = (): any => {

  const dispatch = useDispatch()
  const handleDirectCreateAction = useCallback(
    async (
      currentActionType: ActionType,
      resourceID: string,
      content:any,
      successCallback?: () => void,
      loadingCallback?: (loading: boolean) => void,
    ) => {
      if (currentActionType == null) {
        return
      }
      const displayName =
        DisplayNameGenerator.generateDisplayName(currentActionType)
      const initialContent = getInitialContent(currentActionType)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const data: any = {
        actionType: currentActionType,
        displayName,
        resourceID,
        actionID:v4(),
        content:content||
         initialContent,
        isVirtualResource: false,
        ...actionItemInitial,
        config: {
          public: false,
          advancedConfig: INIT_ACTION_ADVANCED_CONFIG,
          mockConfig: INIT_ACTION_MOCK_CONFIG,
        },
      }
      loadingCallback?.(true)
   
        dispatch(actionActions.addActionItemReducer(data))
        dispatch(configActions.changeSelectedAction(data))
        successCallback?.()
    },
    [dispatch],
  )

  

  return [handleDirectCreateAction]
}

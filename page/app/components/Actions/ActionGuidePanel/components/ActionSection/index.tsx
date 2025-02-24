/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, memo, useCallback, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { v4 } from "uuid"
import { useCreateAction } from "@/page/app/components/Actions/hook"
import { getIsIMPAKTGuideMode } from "@/redux/config/configSelector"
// import { configActions } from "@/redux/config/configSlice"
import { actionActions } from "@/redux/currentApp/action/actionSlice"
import { componentsActions } from "@/redux/currentApp/components/componentsSlice"
import { getAllResources } from "@/redux/resource/resourceSelector"
import { resourceActions } from "@/redux/resource/resourceSlice"

import { DisplayNameGenerator } from "@/utils/generators/generateDisplayName"
// import { track } from "@/utils/mixpanelHelper"
import { PanelSectionProps } from "./interface"
import {
  basicButtonStyle,
  categoryItemContainerStyle,
  categoryItemNameStyle,
  categoryTitleStyle,
  headerContainerStyle,
} from "./style"
import { ActionContent, ActionItem, ActionType } from "@/redux/currentApp/action/interface"
import { getInitialContent } from "@/page/app/components/publicConfig/action/getInitialContent"
import { INIT_ACTION_ADVANCED_CONFIG } from "@/redux/config/configReducer"
import { INIT_ACTION_MOCK_CONFIG, actionItemInitial } from "@/page/app/components/publicConfig/action"
import { GlobalDataActionContent } from "@/page/app/components/PublicTypes/action/globalData"
import { Button } from "@mui/material"
import { ActionGenerator, ResourceGeneratorProvider, getResourceNameFromResourceType } from "@/page/app/components/PublicTypes/ResourceGenerator"
import { Resource } from "@/page/app/components/PublicTypes/resource"
import { configActions } from "@/redux/config/configSlice"

const ActionPanelSection: FC<PanelSectionProps> = (props) => {
  const { actionTypes, title, hasMore, changeLoading, filterFunc } = props
  const { t } = useTranslation()

  const [generatorVisible, setGeneratorVisible] = useState<boolean>()
  const [currentActionType, setCurrentActionType] =
    useState<ActionType | null>()

  const isGuideMode = useSelector(getIsIMPAKTGuideMode)
  const resourceList = useSelector(getAllResources)
  const dispatch = useDispatch()
  // const message = useMessage()

  const handleClickActionType = (type: ActionType | null) => {
    return async () => {
      switch (type) {
        case "transformer": {
          const displayName = DisplayNameGenerator.generateDisplayName(type)
          const initialContent = getInitialContent(type)
          const data: Omit<ActionItem<ActionContent>, "actionID"> = {
            actionType: type,
            displayName,
            content: initialContent,
            isVirtualResource: false,
            config: {
              public: false,
              advancedConfig: INIT_ACTION_ADVANCED_CONFIG,
              mockConfig: INIT_ACTION_MOCK_CONFIG,
            },
            ...actionItemInitial,
          }
          if (isGuideMode) {
            const createActionData: ActionItem<ActionContent>|any = {
              ...data,
              actionID: v4(),
            }
            dispatch(actionActions.addActionItemReducer(createActionData))
             dispatch(configActions.changeSelectedAction(createActionData))
            return
          }
          changeLoading(true)
          break
        }
        case "globalData": {
          const displayName = DisplayNameGenerator.generateDisplayName("state")
          dispatch(
            componentsActions.setGlobalStateReducer({
              key: displayName,
              value: "",
              oldKey: "",
            }),
          )
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const createActionData: ActionItem<GlobalDataActionContent>|any = {
            actionID: displayName,
            displayName: displayName,
            actionType: "globalData",
            triggerMode: "manually",
            isVirtualResource: true,
            content: {
              initialValue: "",
            },
            transformer: {
              enable: false,
              rawData: "",
            },
            config: {
              public: false,
              advancedConfig: INIT_ACTION_ADVANCED_CONFIG,
              mockConfig: INIT_ACTION_MOCK_CONFIG,
            },
          }
          dispatch(configActions.changeSelectedAction(createActionData))

          break
        }
        
        default: {
          setGeneratorVisible(true)
          setCurrentActionType(type)
        }
      }
    }
  }

  const [handleDirectCreateAction, handleCreateAgentAction] = useCreateAction()

  const handleFinishCreateNewResource = useCallback(
    (resource: Resource, isUpdate: boolean) => {
      if (isUpdate) {
        dispatch(resourceActions.updateResourceItemReducer(resource))
        
      } else {
        dispatch(resourceActions.addResourceItemReducer(resource))
      }
      handleDirectCreateAction(resource.resourceType, resource.resourceID,resource.content)
    },
    [dispatch, handleDirectCreateAction],
  )

  return (
    <>
      <div css={headerContainerStyle}>
        <h6 css={categoryTitleStyle}>{title}</h6>
        {hasMore && (
          <Button
            onClick={handleClickActionType(null)}
          >
            {t("editor.action.panel.label.option.general.more")}
          </Button>
        )}
      </div>
      <section css={categoryItemContainerStyle}>
        {actionTypes.filter(filterFunc ?? ((type) => type)).map((type) => (
          <button
            css={basicButtonStyle}
            key={type}
            onClick={handleClickActionType(type)}
          >
            <span css={categoryItemNameStyle}>
              {getResourceNameFromResourceType(type)}
            </span>
          </button>
        ))}
      </section>
      {/* {generatorVisible && ( */}
     
          <ResourceGeneratorProvider
            allResource={resourceList}
            createOrUpdateResourceCallback={handleFinishCreateNewResource}
          >
            <ActionGenerator
              visible={generatorVisible}
              onClose={() => setGeneratorVisible(false)}
              defaultStep={currentActionType ? "createAction" : "select"}
              defaultActionType={currentActionType}
              canBackToSelect={false}
              handleDirectCreateAction={handleDirectCreateAction}
              handleCreateAgentAction={handleCreateAgentAction}
            />
          </ResourceGeneratorProvider>
    </>
  )
}

export default memo(ActionPanelSection)

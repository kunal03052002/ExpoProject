/* eslint-disable @typescript-eslint/no-explicit-any */
import { ActionItem, ActionType } from "@/redux/currentApp/action/interface";
import { isEqual } from "lodash-es";
import { FC, useCallback, useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  getCachedAction,
  getSelectedAction,
} from "@/redux/config/configSelector";
import { configActions } from "@/redux/config/configSlice";
import { getActionMixedList } from "@/redux/currentApp/action/actionSelector";
import { componentsActions } from "@/redux/currentApp/components/componentsSlice";
import { getAllResources } from "@/redux/resource/resourceSelector";
import { resourceActions } from "@/redux/resource/resourceSlice";
import { DisplayNameGenerator } from "@/utils/generators/generateDisplayName";
import { ShortCutContext } from "@/utils/shortcut/shortcutProvider";
import { ActionListItem } from "../ActionListItem";
import { useCreateAction } from "../hook";
import { ListWithNewButtonProps } from "./interface";
import {
  actionListEmptyStyle,
  addNewActionButtonStyle,
  createDropListItemContainerStyle,
  listContainerStyle,
  listStyle,
  prefixIconContainerStyle,
} from "./style";
import {
  INIT_ACTION_ADVANCED_CONFIG,
  INIT_ACTION_MOCK_CONFIG,
  actionItemInitial,
} from "../../publicConfig/action";
// import { GlobalDataActionContent } from "../../PublicTypes/action/globalData"
import { getInitialContent } from "../../publicConfig/action/getInitialContent";
import { Resource } from "../../PublicTypes/resource";
import { onCopyActionItem } from "../api";
import { DropList, DropListItem, Dropdown } from "@/utils/DropDown";
import { Button } from "@mui/material";
import { useModal } from "@/utils/model/src/hook";
import { ResourceGeneratorProvider } from "../../PublicTypes/ResourceGenerator/provider";
import { ActionGenerator } from "../../PublicTypes/ResourceGenerator/components/ActionGenerator";
import { List } from "../List/list";
import { Empty } from "../empty/src";
import { createNotification } from "@/utils/Notification";
import { GlobalDataActionContent } from "../../PublicTypes/action/globalData";
import { actionActions } from "@/redux/currentApp/action/actionSlice";
import { v4 } from "uuid";
import { getIconFromResourceType } from "../../PublicTypes/ResourceGenerator/components/ResourceCard/utils";

export const ActionListWithNewButton: FC<ListWithNewButtonProps> = (props) => {
  const { searchActionValue } = props;
  const selectedAction: any = useSelector(getSelectedAction);
  const cachedAction = useSelector(getCachedAction);
  const resourceList = useSelector(getAllResources);
  const impaktResource = resourceList.filter(
    (e) => e.resourceType === "impaktapps"
  );
  const shortcut = useContext(ShortCutContext);
  const [generatorVisible, setGeneratorVisible] = useState<boolean>();
  const [currentActionType, setCurrentActionType] =
    useState<ActionType | null>();
  const actionList = useSelector(getActionMixedList);
  const searchList = actionList.filter((value) => {
    return value.displayName
      .toLowerCase()
      .includes(searchActionValue.toLowerCase());
  });
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const modal = useModal();
  const handleClickActionType = (type: ActionType | null) => {
    return async () => {
      switch (type) {
        case "transformer": {
          const displayName = DisplayNameGenerator.generateDisplayName(type);
          const initialContent = getInitialContent(type);
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const data: any = {
            actionType: type,
            displayName,
            content: initialContent,
            isVirtualResource: true,
            actionID: v4(),
            resourceID: v4(),
            config: {
              public: false,
              advancedConfig: INIT_ACTION_ADVANCED_CONFIG,
              mockConfig: INIT_ACTION_MOCK_CONFIG,
            },
            ...actionItemInitial,
          };
          try {
            dispatch(actionActions.addActionItemReducer(data));
            dispatch(configActions.changeSelectedAction(data));
          } catch (_e) {
            DisplayNameGenerator.removeDisplayName(displayName);
          }
          break;
        }
        case "impaktapps": {
          const displayName = DisplayNameGenerator.generateDisplayName(type);
          const initialContent = impaktResource[0];
          const data: any = {
            actionType: type,
            displayName,
            resourceType: "imapktapps",
            content: initialContent.content,
            isVirtualResource: true,
            actionID: v4(),
            resourceID: v4(),
            config: {
              public: false,
              advancedConfig: INIT_ACTION_ADVANCED_CONFIG,
              mockConfig: INIT_ACTION_MOCK_CONFIG,
            },
            // ...actionItemInitial,
          };
          try {
            dispatch(actionActions.addActionItemReducer(data));
            dispatch(configActions.changeSelectedAction(data));
          } catch (_e) {
            DisplayNameGenerator.removeDisplayName(displayName);
          }
          break;
        }
        case "globalData": {
          const displayName = DisplayNameGenerator.generateDisplayName("state");
          dispatch(
            componentsActions.setGlobalStateReducer({
              key: displayName,
              value: "",
              oldKey: "",
            })
          );
          const createActionData: ActionItem<GlobalDataActionContent> | any = {
            actionID: displayName,
            displayName: displayName,
            actionType: "globalData",
            triggerMode: "manually",
            isVirtualResource: true,
            resourceID: v4(),
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
          };
          dispatch(configActions.changeSelectedAction(createActionData));
          break;
        }
        default: {
          setGeneratorVisible(true);
          setCurrentActionType(type);
        }
      }
    };
  };

  const [handleDirectCreateAction] = useCreateAction();

  const handleFinishCreateNewResource = useCallback(
    (resource: Resource, isUpdate: boolean) => {
      if (isUpdate) {
        dispatch(resourceActions.updateResourceItemReducer(resource));
      } else {
        dispatch(resourceActions.addResourceItemReducer(resource));
      }
      handleDirectCreateAction(
        resource.resourceType,
        resource.resourceID,
        resource.content,
        () => {
          setGeneratorVisible(false);
        }
      );
      const notification = createNotification();
      notification.show({
        title: `Save Successfully`,
        content: "New Resource Saved Successfully",
        duration: 1000,
        type: "success",
      });
    },
    [dispatch, handleDirectCreateAction]
  );
  return (
    <>
      <Dropdown
        dropList={
          <DropList w="222px">
            <DropListItem
              value="database"
              key="database"
              title={
                <div css={createDropListItemContainerStyle}>
                  <span css={prefixIconContainerStyle}>
                    {getIconFromResourceType("impaktapps", "16px")}
                  </span>
                  Impaktapps
                </div>
              }
              onClick={handleClickActionType("impaktapps")}
            />
            <DropListItem
              key="transformer"
              value="transformer"
              title={
                <div css={createDropListItemContainerStyle}>
                  <span css={prefixIconContainerStyle}>
                    {getIconFromResourceType("transformer", "16px")}
                  </span>
                  {t("editor.action.panel.label.option.general.js")}
                </div>
              }
              onClick={handleClickActionType("transformer")}
            />
            <DropListItem
              key="globalData"
              value="globalData"
              title={
                <div css={createDropListItemContainerStyle}>
                  <span css={prefixIconContainerStyle}>
                    {getIconFromResourceType("globalData", "16px")}
                  </span>
                  {t("editor.action.panel.label.option.general.global-data")}
                </div>
              }
              onClick={handleClickActionType("globalData")}
            />
            <DropListItem
              value="database"
              key="database"
              title={
                <div css={createDropListItemContainerStyle}>
                  <span css={prefixIconContainerStyle}>
                    {getIconFromResourceType("other", "16px")}
                  </span>
                  Other
                </div>
              }
              onClick={handleClickActionType(null)}
            />
          </DropList>
        }
      >
        <Button css={addNewActionButtonStyle}>
          {/* <Space size="4px" direction="horizontal" alignItems="center"> */}
          {/* <AddIcon size="14px" /> */}
          {t("editor.action.action_list.btn.new")}
          {/* </Space> */}
        </Button>
      </Dropdown>
      <div css={listContainerStyle}>
        {searchList.length != 0 && (
          <List
            _css={listStyle}
            bordered={false}
            split={false}
            data={searchList}
            render={(data) => {
              return (
                <ActionListItem
                  action={data}
                  onCopyItem={onCopyActionItem}
                  onDeleteItem={(action) => {
                    if (action.actionType === "globalData") {
                      shortcut.showDeleteDialog(
                        [action.displayName],
                        "globalData"
                      );
                    } else {
                      shortcut.showDeleteDialog([action.displayName], "action");
                    }
                  }}
                  onItemClick={(action) => {
                    if (selectedAction === null) {
                      dispatch(configActions.changeSelectedAction(action));
                      return;
                    }
                    // is a change action
                    if (selectedAction?.displayName !== action.displayName) {
                      if (isEqual(cachedAction, selectedAction)) {
                        dispatch(configActions.changeSelectedAction(action));
                      } else {
                        // show dialog
                        modal.show({
                          children: t(
                            "editor.action.action_list.message.confirm_switch"
                          ),
                          onOk: () => {
                            dispatch(
                              configActions.changeSelectedAction(action)
                            );
                          },
                          okButtonProps: {
                            colorScheme: "red",
                          },
                        });
                      }
                    }
                  }}
                />
              );
            }}
            renderRaw
            renderKey={(data) => {
              return data.displayName;
            }}
          />
        )}
        {searchList.length == 0 && searchActionValue !== "" && <Empty />}
        {searchList.length == 0 && searchActionValue == "" && (
          <div css={actionListEmptyStyle}>
            {t("editor.action.action_list.tips.empty")}
          </div>
        )}
        {generatorVisible && (
          <ResourceGeneratorProvider
            allResource={resourceList}
            createOrUpdateResourceCallback={handleFinishCreateNewResource}
          >
            <ActionGenerator
              visible={generatorVisible}
              onClose={() => setGeneratorVisible(false)}
              defaultStep={currentActionType ? "createAction" : "select"}
              defaultActionType={currentActionType}
              canBackToSelect={!currentActionType}
              handleDirectCreateAction={handleDirectCreateAction}
              handleCreateAgentAction={() => {}}
            />
          </ResourceGeneratorProvider>
          // </MixpanelTrackProvider>
        )}
      </div>
    </>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
import { isEqual } from "lodash-es";
import { FC, useCallback, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  getCachedAction,
  getIsIMPAKTGuideMode,
  getSelectedAction,
} from "@/redux/config/configSelector";
import { actionActions } from "@/redux/currentApp/action/actionSlice";
import { componentsActions } from "@/redux/currentApp/components/componentsSlice";
import { getExecutionResult } from "@/redux/currentApp/executionTree/executionSelector";
import { trackInEditor } from "@/utils/mixpanelHelper";
import { ActionTitleBarProps } from "./interface";
import {
  actionFailBlockStyle,
  actionSuccessBlockStyle,
  actionTitleBarStyle,
  editableTitleBarWrapperStyle,
  runResultAndRunContainerStyle,
  tabsContainerStyle,
} from "./style";
import { ILLA_MIXPANEL_EVENT_TYPE } from "@/utils/shortcut/interface";
import Button from "@mui/material/Button";
import { ActionContent, ActionItem } from "@/redux/currentApp/action/interface";
import { GlobalDataActionContent } from "../../../PublicTypes/action/globalData";
import SaveIcon from "@mui/icons-material/Save";
import { createNotification } from "@/utils/Notification";
import { SimpleTabs } from "@/components/Tabs";
import { ACTION_PANEL_TABS } from "@/components/Tabs/constant";
import SuccessIcon from "@mui/icons-material/CheckCircleOutline";
import { EditableText } from "@/components/EditableText";
export type RunMode = "save" | "run" | "test_run" | "save_and_run";

export const ActionTitleBar: FC<ActionTitleBarProps> = (props) => {
  const { onResultVisibleChange, openState, activeTab, handleChangeTab } =
    props;
  const selectedAction: any = useSelector(getSelectedAction)! ?? {};
  const cachedAction: any = useSelector(getCachedAction)!;
  const isChanged = !isEqual(selectedAction, cachedAction);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const executionResult: any = useSelector(getExecutionResult);
  const isGuideOpen = useSelector(getIsIMPAKTGuideMode);
  const renderResult =
    executionResult[selectedAction.displayName]?.data !== undefined ||
    executionResult[selectedAction.displayName]?.runResult !== undefined;
  const runError =
    executionResult[selectedAction.displayName]?.runResult?.error;
  const runMode = "save";
  const innerTabItems = useMemo(() => {
    if (
      selectedAction.actionType === "transformer" ||
      selectedAction.actionType === "globalData"
    ) {
      return [ACTION_PANEL_TABS[0]];
    }
    return ACTION_PANEL_TABS;
  }, [selectedAction.actionType]);
  useEffect(() => {
    if (
      selectedAction.actionType === "transformer" ||
      selectedAction.actionType === "globalData"
    ) {
      handleChangeTab("general");
    }
  }, [handleChangeTab, selectedAction.actionType]);

  useEffect(() => {
    switch (runMode) {
      case "save": {
        trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.SHOW, {
          element: "action_edit_save",
          parameter1: cachedAction.actionType,
        });
        break;
      }
    }
  }, [cachedAction.actionType, runMode]);

  const handleActionOperation = useCallback(async () => {
    const cachedActionValue: ActionItem<ActionContent> = cachedAction;

    switch (runMode) {
      case "save":
        if (cachedAction.actionType === "globalData") {
          dispatch(
            componentsActions.setGlobalStateReducer({
              key: cachedAction.displayName,
              value: (cachedAction.content as GlobalDataActionContent)
                .initialValue,
              oldKey: cachedAction.displayName,
            })
          );
          return;
        }
        if (isGuideOpen) {
          cachedActionValue &&
            dispatch(actionActions.updateActionItemReducer(cachedActionValue));
          return;
        }
        trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
          element: "action_edit_save",
          parameter1: cachedAction.actionType,
          parameter2: cachedAction,
        });
        try {
          if (cachedActionValue) {
            dispatch(actionActions.updateActionItemReducer(cachedActionValue));
          }
          const notification = createNotification();
          notification.show({
            title: `Updated Successfully`,
            content: `Your API Updated`,
            duration: 1000,
            type: "success",
          });
        } catch (e) {
          console.log(e);
        }
        break;
    }
  }, [cachedAction, dispatch, isGuideOpen, runMode]);

  const renderButton = useMemo(() => {
    return true;
  }, []);

  if (cachedAction === undefined) {
    return <></>;
  }

  const successBlock = (
    <Button
      css={actionSuccessBlockStyle}
      onClick={() => {
        onResultVisibleChange(!openState);
      }}
      startIcon={<SuccessIcon color="success" />}
    >
      success
    </Button>
    // <div
  );

  const failBlock = (
    <div
      css={actionFailBlockStyle}
      onClick={() => {
        onResultVisibleChange(!openState);
      }}
    >
      Failed
    </div>
  );

  return (
    <>
      <div css={actionTitleBarStyle}>
        <SimpleTabs
          items={innerTabItems}
          activeKey={activeTab}
          handleClickChangeTab={handleChangeTab}
          containerStyle={tabsContainerStyle}
        />
        <div css={editableTitleBarWrapperStyle}>
          <EditableText
            key={selectedAction.displayName}
            displayName={selectedAction.displayName}
            updateDisplayNameByBlur={() => {}}
            onClick={() => {
              trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.RENAME, {
                element: "action_rename",
                parameter1: selectedAction.actionType,
                parameter2: "hover",
              });
            }}
          />
        </div>

        <div css={runResultAndRunContainerStyle}>
          {renderResult && (runError ? failBlock : successBlock)}
          {renderButton && (
            <Button
              sx={{ position: "relative" }}
              className={`${cachedAction.displayName}-run`}
              variant={isChanged ? "contained" : "outlined"}
              size="medium"
              color="success"
              // loading={isRunning || saveLoading}
              startIcon={<SaveIcon />}
              onClick={handleActionOperation}
            >
              {t(`editor.action.panel.btn.${runMode}`)}
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

ActionTitleBar.displayName = "ActionTitleBar";

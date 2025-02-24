/* eslint-disable @typescript-eslint/no-explicit-any */
import { isEqual } from "lodash-es";
import {
  Suspense,
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { ActionListItemProps } from "@/page/app/components/Actions/ActionListItem/interface";
import {
  getCachedAction,
  getIsIMPAKTGuideMode,
  getSelectedAction,
} from "@/redux/config/configSelector";
import { actionActions } from "@/redux/currentApp/action/actionSlice";
import { componentsActions } from "@/redux/currentApp/components/componentsSlice";
import { getExecutionResult } from "@/redux/currentApp/executionTree/executionSelector";
// import { fetchUpdateAction } from "@/services/action"
import { RootState } from "@/store";
import { DisplayNameGenerator } from "@/utils/generators/generateDisplayName";
import {
  ILLA_MIXPANEL_EVENT_TYPE,
  trackInEditor,
} from "@/utils/mixpanelHelper";
import {
  actionIconContainer,
  actionItemDotStyle,
  actionItemLeftStyle,
  applyActionItemContainerStyle,
  applyActionItemTitleStyle,
  runningTimeStyle,
  // warningCircleStyle,
} from "./style";
import { DropList, DropListItem, Dropdown } from "@/utils/DropDown";
import { isObject } from "@/redux/utils";
import { GlobalDataActionContent } from "../../PublicTypes/action/globalData";
import { Input } from "@mui/material";

const Item = DropListItem;

export const ActionListItem = forwardRef<HTMLDivElement, ActionListItemProps>(
  (props, ref) => {
    const { action, onItemClick, onCopyItem, onDeleteItem } = props;
    const { t } = useTranslation();
    const selectedAction: any = useSelector(getSelectedAction);
    const cachedAction = useSelector(getCachedAction);
    const error = useSelector((state: RootState) => {
      const targetActionErrors =
        state.currentApp.execution.error[action.displayName];
      if (isObject(targetActionErrors)) {
        return Object.keys(targetActionErrors).length > 0;
      }
      return false;
    });

    const isGuideMode = useSelector(getIsIMPAKTGuideMode);
    const executionResult = useSelector(getExecutionResult);

    const startRunningTime: number =
      executionResult[action.displayName]?.startTime;

    const endRunningTime: number = executionResult[action.displayName]?.endTime;

    const isRunning: boolean = executionResult[action.displayName]?.isRunning;

    const isMocking: boolean =
      executionResult[action.displayName]?.config?.mockConfig?.enabled;

    const [currentRunningTime, setCurrentRunningTime] = useState(0);

    const dealData = useCallback(() => {
      return window.setInterval(() => {
        const currentTime = new Date().getTime() - startRunningTime;
        setCurrentRunningTime(currentTime);
      }, 10);
    }, [startRunningTime]);

    useEffect((): any => {
      let time = -1;
      if (isRunning) {
        time = dealData();
      }
      return () => {
        if (time !== -1) {
          window.clearInterval(time);
        }
      };
    }, [isRunning, dealData]);

    const isChanged = useMemo(() => {
      return (
        selectedAction?.actionID === action.actionID &&
        !isEqual(selectedAction, cachedAction)
      );
    }, [action.actionID, cachedAction, selectedAction]);

    const [editName, setEditName] = useState(false);
    const [changing, setChanging] = useState(false);
    const dispatch = useDispatch();

    const changeDisplayName = useCallback(
      async (newName: string) => {
        if (newName === action.displayName) {
          setEditName(false);
          return;
        }
        if (DisplayNameGenerator.isAlreadyGenerate(newName)) {
          setEditName(false);
          return;
        }
        const newAction = {
          ...action,
          displayName: newName,
        };

        if (action.actionType === "globalData") {
          DisplayNameGenerator.addDisplayNames([newName]);
          DisplayNameGenerator.removeDisplayName(action.displayName);
          dispatch(
            componentsActions.setGlobalStateReducer({
              key: newName,
              value: (action.content as GlobalDataActionContent).initialValue,
              oldKey: action.displayName,
            })
          );
          setEditName(false);
          return;
        }

        if (isGuideMode) {
          dispatch(
            actionActions.updateActionDisplayNameReducer({
              newDisplayName: newName,
              oldDisplayName: action.displayName,
              actionID: newAction.actionID,
            })
          );
          setEditName(false);
          return;
        }
        setChanging(true);
        try {
          // await fetchUpdateAction(newAction)
          dispatch(
            actionActions.updateActionDisplayNameReducer({
              newDisplayName: newName,
              oldDisplayName: action.displayName,
              actionID: newAction.actionID,
            })
          );
          setEditName(false);
        } catch (_e) {
          // message.error({
          //   content: t("change_fail"),
          // })
          setEditName(false);
        }

        setChanging(false);
      },
      [action, isGuideMode, dispatch]
    );

    const calcTimeString = useCallback(
      (startTime?: number, endTime?: number) => {
        if (startTime && endTime) {
          const time = endTime - startTime;
          if (time > 1000) {
            return `${(time / 1000).toFixed(2)}s`;
          }
          return `${time}ms`;
        } else {
          return "";
        }
      },
      []
    );

    const calcLoadingTimeString = useCallback((currentRunningTime: number) => {
      return currentRunningTime > 1000
        ? `${(currentRunningTime / 1000).toFixed(2)}s`
        : `${currentRunningTime}ms`;
    }, []);

    return (
      <Dropdown
        trigger="contextmenu"
        position="right-start"
        dropList={
          <DropList w="184px">
            <Item
              key={"rename"}
              value={"rename"}
              title={t("editor.action.action_list.contextMenu.rename")}
              onClick={() => {
                trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.RENAME, {
                  element: "action_rename",
                  parameter1: action.actionType,
                  parameter2: "manage",
                });
                setEditName(true);
              }}
            />
            <Item
              key={"duplicate"}
              value={"duplicate"}
              title={t("editor.action.action_list.contextMenu.duplicate")}
              onClick={() => {
                trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.DUPLICATE, {
                  element: "action_duplicate",
                  parameter1: action.actionType,
                });
                onCopyItem(action);
              }}
            />
            <Item
              key={"delete"}
              value={"delete"}
              title={t("editor.action.action_list.contextMenu.delete")}
              deleted
              onClick={() => {
                trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.DELETE, {
                  element: "action_delete",
                  parameter1: action.actionType,
                });
                onDeleteItem(action);
              }}
            />
          </DropList>
        }
      >
        <div
          css={applyActionItemContainerStyle(
            selectedAction?.displayName === action.displayName
          )}
          ref={ref}
          onClick={() => {
            onItemClick(action);
          }}
          onDoubleClick={() => {
            onItemClick(action);
            setEditName(true);
          }}
        >
          <div css={actionItemLeftStyle}>
            <div css={actionIconContainer}>
              <Suspense>
                {/* <div>getIconFromResourceType</div> */}
                {/* { getIconFromResourceType(action.actionType, "16px")} */}
              </Suspense>
              {
                error && <div>Error</div>
                //  <WarningCircleIcon css={warningCircleStyle} />
              }
            </div>
            {!editName ? (
              <div css={applyActionItemTitleStyle(error)}>
                {action.displayName}
              </div>
            ) : (
              <Input
                size="small"
                // onPressEnter={(e) => {
                //   changeDisplayName(e.currentTarget.value)
                // }}
                defaultValue={action.displayName}
                autoFocus
                disabled={changing}
                onBlur={(event) => {
                  changeDisplayName(event.target.value);
                }}
              />
            )}
            {isChanged && <div css={actionItemDotStyle} />}
          </div>
          <div css={runningTimeStyle}>
            {isMocking
              ? t("editor.action.panel.option.mock.label")
              : isRunning
              ? calcLoadingTimeString(currentRunningTime)
              : calcTimeString(startRunningTime, endRunningTime)}
          </div>
        </div>
      </Dropdown>
    );
  }
);

ActionListItem.displayName = "ActionListItem";

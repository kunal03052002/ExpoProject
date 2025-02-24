import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getCachedAction } from "@/redux/config/configSelector";
import { configActions } from "@/redux/config/configSlice";
import {
  ILLA_MIXPANEL_EVENT_TYPE,
  trackInEditor,
} from "@/utils/mixpanelHelper";
import { MenuItem, Select } from "@mui/material";
import {
  ACTION_RUN_TIME,
  ActionTriggerMode,
  IAdvancedConfig,
} from "@/redux/currentApp/action/interface";

const TriggerModeChoose: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const action = useSelector(getCachedAction)!;
  return (
    <Select
      sx={{ ml: "8px", color: "techPurple", width: "360px",height:"30px" }}
      size="small"
      value={action.triggerMode}
      onChange={(event) => {
        const value = event.target.value;
        dispatch(
          configActions.updateCachedAction({
            ...action,
            triggerMode: value as ActionTriggerMode,
          })
        );
        let updateSlice: Partial<IAdvancedConfig> = {};
        if (value === "manually") {
          updateSlice = {
            runtime: ACTION_RUN_TIME.NONE,
            pages: [],
            delayWhenLoaded: "",
            displayLoadingPage: false,
          };
        }
        if (value === "automate") {
          updateSlice = {
            runtime: ACTION_RUN_TIME.APP_LOADED,
            pages: [],
            delayWhenLoaded: "",
            displayLoadingPage: false,
          };
        }
        dispatch(
          configActions.updateCachedActionAdvancedConfigReducer(updateSlice)
        );
      }}
      onClick={() => {
        trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
          element: "action_edit_auto_run",
        });
      }}
    >
      <MenuItem key="manually" value="manually">
        {t("editor.action.panel.option.trigger.on_change")}
      </MenuItem>
      <MenuItem key="automate" value="automate">
        {t("editor.action.panel.option.trigger.manually")}
      </MenuItem>
    </Select>
  );
};

export default TriggerModeChoose;

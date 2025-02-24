import { FC, ReactNode, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BodyEditor } from "./BodyEditor";
import {
  actionItemContainer,
  restapiItemLabelStyle,
  restapiItemStyle,
  urlStyle,
} from "./style";
import {
  getCachedAction,
  getSelectedAction,
} from "@/redux/config/configSelector";
import { configActions } from "@/redux/config/configSlice";
import { RootState } from "@/store";
import {
  // Params,
  RestAPIAction,
  RestAPIBodyContent,
  RestAPIBodyType,
  RestAPIMethod,
} from "@/page/app/components/PublicTypes/action/restApi";
import { ActionItem } from "@/redux/currentApp/action/interface";
import {
  Resource,
  RestApiAuth,
  RestApiResource,
} from "@/page/app/components/PublicTypes/resource";
import { Trigger } from "@/utils/trigger/trigger";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { getAllCOntrollerResources } from "@/redux/currentApp/executionController/controllerSelector";
import { RulesRequest, RulesResponse } from "@/lib";
export interface SelectOptionObject {
  label: string | ReactNode;
  value: string | number;
  disabled?: boolean;
}
export type SelectValue =
  | SelectOptionObject
  | string
  | SelectOptionObject[]
  | string[]
  | number
  | number[];
const ImapaktAppsPanel: FC = () => {
  // const { t } = useTranslation();
  const cachedAction = useSelector(getCachedAction) as ActionItem<
    RestAPIAction<RestAPIBodyContent>
  >;
  const controllerData = useSelector(getAllCOntrollerResources);
  const [RuleOptions, setRuleOptions] = useState<string[]>([]);

  const selectedAction = useSelector(getSelectedAction) as ActionItem<
    RestAPIAction<RestAPIBodyContent>
  >;
  const content = cachedAction.content as RestAPIAction<RestAPIBodyContent>;
  const dispatch = useDispatch();

  const currentResource = useSelector((state: RootState) => {
    return state.resource.find(
      (r) => r.resourceID === cachedAction?.resourceID
    );
  });

  const handleChangeMethod = useCallback(
    (value?: string) => {
      const newBodyType: RestAPIBodyType = "raw";
      let newBody = null;
      if (
        selectedAction.displayName === cachedAction.displayName

        // selectedAction.content?.method === value
      ) {
        newBody = RuleOptions[value].body;
      }
      dispatch(
        configActions.updateCachedAction({
          ...cachedAction,
          content: {
            ...content,
            method: value as RestAPIMethod,
            bodyType: newBodyType,
            body: newBody,
          },
        })
      );
    },
    [RuleOptions, cachedAction, content, dispatch, selectedAction.displayName]
  );
  useEffect(() => {
    async function setRuleOptionsInLocal() {
      const request: RulesRequest = {
        kind: "GetRules",
        resource: {
          groupName: "com",
          artifactName: "test_demo",
          version: "0.0.2",
        },
      };
      const optionsArray = (await controllerData.getImpaktServices(
        request
      )) as RulesResponse;
      console.log("optionsArray >> ", optionsArray);
      setRuleOptions(optionsArray.rules);
    }
    setRuleOptionsInLocal();
  }, [controllerData]);

  return (
    <div css={actionItemContainer}>
      <div css={restapiItemStyle}>
        <span css={restapiItemLabelStyle}>
          Rule Type
          {/* {t("editor.action.resource.restapi.label.action_type")} */}
        </span>

        <Select
          sx={{
            fontSize: "12px",
            // width: "100%",
            height: "30px",
            maxW: "140px",
            color: "techPurple",
          }}
          fullWidth
          value={
            selectedAction.displayName === cachedAction.displayName
              ? content.method
              : ""
          }
          size="small"
          onChange={(e) => {
            handleChangeMethod(e.target.value);
          }}
        >
          {RuleOptions.map((e) => (
            <MenuItem key={e} value={e}>
              {e}
            </MenuItem>
          ))}
        </Select>

        <Trigger
          position="top-start"
          content={
            currentResource?.content
              ? (currentResource as Resource<RestApiResource<RestApiAuth>>)
                  .content.baseUrl
              : ""
          }
        >
          <div css={urlStyle}>
            {currentResource?.content
              ? (currentResource as Resource<RestApiResource<RestApiAuth>>)
                  .content.baseUrl
              : ""}
          </div>
        </Trigger>
      </div>
      <div>
        <BodyEditor
          actionItem={cachedAction}
          body={RuleOptions[content.method]}
        />
      </div>
    </div>
  );
};

ImapaktAppsPanel.displayName = "ImapaktAppsPanel";
export default ImapaktAppsPanel;

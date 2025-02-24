import { FC, ReactNode, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
// import { CodeEditor } from "@/components/CodeEditor";
// import { CODE_LANG } from "@/components/CodeEditor/CodeMirror/extensions/interface";
import { BodyEditor } from "./BodyEditor";
import {
  actionItemContainer,
  // restapiItemInputStyle,
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
  Params,
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
import { RecordEditor } from "@/components/RecordEditor";
import { Trigger } from "@/utils/trigger/trigger";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
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

const resetAPIMethodSelectOptions: RestAPIMethod[] = [
  "GET",
  "POST",
  "PUT",
  "HEAD",
  "PATCH",
  "DELETE",
  "OPTIONS",
];

const RestApiPanel: FC = () => {
  const { t } = useTranslation();
  const cachedAction = useSelector(getCachedAction) as ActionItem<
    RestAPIAction<RestAPIBodyContent>
  >;
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
    (value?: SelectValue) => {
      let newBodyType: RestAPIBodyType = "none";
      let newBody = null;

      if (value !== "GET") {
        if (
          selectedAction.resourceID === cachedAction.resourceID &&
          selectedAction.content.method === value
        ) {
          newBodyType = selectedAction.content.bodyType;
          newBody = selectedAction.content.body;
        }
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
    [
      cachedAction,
      content,
      dispatch,
      selectedAction.content.body,
      selectedAction.content.bodyType,
      selectedAction.content.method,
      selectedAction.resourceID,
    ]
  );

  return (
    <div
     css={actionItemContainer}
     >
      <div
      css={restapiItemStyle}
       >
        <span css={restapiItemLabelStyle}>
          {t("editor.action.resource.restapi.label.action_type")}
        </span>
        <Select
          sx={{ fontSize:"12px", ml: "16px", w: "160px", maxW: "160px", color: "techPurple" }}
          value={content.method}
          size="small"

          onChange={(e) => {
            handleChangeMethod(e.target.value);
          }}
        >
          {resetAPIMethodSelectOptions.map((e) => (
            <MenuItem key={e} value={e}>{e}</MenuItem>
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
      {/* <RecordEditor
        records={content.urlParams}
        label={t("editor.action.resource.restapi.label.url_parameters")}
        onChangeKey={(index, key, v) => {
          const newList: Params[] = [...content.urlParams];
          newList[index] = { key, value: v } as Params;
          dispatch(
            configActions.updateCachedAction({
              ...cachedAction,
              content: {
                ...content,
                urlParams: newList,
              },
            })
          );
        }}
        onChangeValue={(index, key, v) => {
          const newList: Params[] = [...content.urlParams];
          newList[index] = { key, value: v } as Params;
          dispatch(
            configActions.updateCachedAction({
              ...cachedAction,
              content: {
                ...content,
                urlParams: newList,
              },
            })
          );
        }}
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        onDelete={(index, _record) => {
          let newList: Params[] = [...content.urlParams];
          newList.splice(index, 1);
          if (newList.length === 0) {
            newList = [{ key: "", value: "" }];
          }
          dispatch(
            configActions.updateCachedAction({
              ...cachedAction,
              content: {
                ...content,
                urlParams: newList,
              },
            })
          );
        }}
        onAdd={() => {
          const newList: Params[] = [
            ...content.urlParams,
            { key: "", value: "" } as Params,
          ];
          dispatch(
            configActions.updateCachedAction({
              ...cachedAction,
              content: {
                ...content,
                urlParams: newList,
              },
            })
          );
        }}
      /> */}
      <RecordEditor
        records={content.headers}
        label={t("editor.action.resource.restapi.label.headers")}
        onChangeKey={(index, key, v) => {
          const newList: Params[] = [...content.headers];
          newList[index] = { key, value: v } as Params;
          dispatch(
            configActions.updateCachedAction({
              ...cachedAction,
              content: {
                ...content,
                headers: newList,
              },
            })
          );
        }}
        onChangeValue={(index, key, v) => {
          const newList: Params[] = [...content.headers];
          newList[index] = { key, value: v } as Params;
          dispatch(
            configActions.updateCachedAction({
              ...cachedAction,
              content: {
                ...content,
                headers: newList,
              },
            })
          );
        }}
        onDelete={(index) => {
          let newList: Params[] = [...content.headers];
          newList.splice(index, 1);
          if (newList.length === 0) {
            newList = [{ key: "", value: "" }];
          }
          dispatch(
            configActions.updateCachedAction({
              ...cachedAction,
              content: {
                ...content,
                headers: newList,
              },
            })
          );
        }}
        onAdd={() => {
         const initHeaders =  content.headers?
          content.headers:[];
          const newList: Params[] = [
            ...initHeaders,
            { key: "", value: "" } as Params,
          ];
          dispatch(
            configActions.updateCachedAction({
              ...cachedAction,
              content: {
                ...content,
                headers: newList,
              },
            })
          );
        }}
      />
      {/* <RecordEditor
        records={content.cookies}
        label={t("editor.action.resource.restapi.label.cookies")}
        onChangeKey={(index, key, v) => {
          const newList: Params[] = [...content.cookies];
          newList[index] = { key, value: v } as Params;
          dispatch(
            configActions.updateCachedAction({
              ...cachedAction,
              content: {
                ...content,
                cookies: newList,
              },
            })
          );
        }}
        onChangeValue={(index, key, v) => {
          const newList: Params[] = [...content.cookies];
          newList[index] = { key, value: v } as Params;
          dispatch(
            configActions.updateCachedAction({
              ...cachedAction,
              content: {
                ...content,
                cookies: newList,
              },
            })
          );
        }}
        onDelete={(index) => {
          let newList: Params[] = [...content.cookies];
          newList.splice(index, 1);
          if (newList.length === 0) {
            newList = [{ key: "", value: "" }];
          }
          dispatch(
            configActions.updateCachedAction({
              ...cachedAction,
              content: {
                ...content,
                cookies: newList,
              },
            })
          );
        }}
        onAdd={() => {
          const newList: Params[] = [
            ...content.cookies,
            { key: "", value: "" } as Params,
          ];
          dispatch(
            configActions.updateCachedAction({
              ...cachedAction,
              content: {
                ...content,
                cookies: newList,
              },
            })
          );
        }}
      /> */}
   
      {!["GET", "HEAD"].includes(content.method) && (
        <BodyEditor actionItem={cachedAction} />
      )}
    
    </div>
  );
};

RestApiPanel.displayName = "RestApiPanel";
export default RestApiPanel;

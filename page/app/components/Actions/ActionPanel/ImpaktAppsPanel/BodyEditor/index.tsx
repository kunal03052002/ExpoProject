import { FC, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { CodeEditor } from "@/components/CodeEditor";
import { CODE_LANG } from "@/components/CodeEditor/CodeMirror/extensions/interface";
import { configActions } from "@/redux/config/configSlice";
import { VALIDATION_TYPES } from "@/utils/validationFactory";
import {
  bodyChooserStyle,
  bodyEditorContainerStyle,
  bodyLabelStyle,
  bodySelectorStyle,
  codeEditorStyle,
} from "./style";
import { RestAPIRawBody } from "@/page/app/components/PublicTypes/action/restApi";
import { BodyEditorProps } from "./interface";

export const BodyEditor: FC<BodyEditorProps> = (props) => {
  const { t } = useTranslation();
  const actionItem = props.actionItem;
  const bodyType = actionItem.content.bodyType;
  const body = actionItem.content.body;
  const dispatch = useDispatch();
  const mode: CODE_LANG = CODE_LANG.JSON;
  const handleRawBodyTypeChange = useCallback(
    (value: string, paramName: string) => {
      dispatch(
        configActions.updateCachedAction({
          ...actionItem,
          content: {
            ...actionItem.content,
            body: {
              ...(body as RestAPIRawBody),
              [paramName]: value,
            },
          },
        })
      );
    },
    [actionItem, body, dispatch]
  );
  return (
    <div css={bodyEditorContainerStyle}>
      <span css={bodyLabelStyle}>
        {t("editor.action.resource.restapi.label.body")}
      </span>
      {/* <div css={bodyChooserStyle}> */}
        <div css={bodySelectorStyle}>
        {bodyType === "raw" && (
          <div css={codeEditorStyle}>
            <CodeEditor
              showLineNumbers
              width="380px"
              lang={mode}
              value={
                typeof (body as RestAPIRawBody).content === "object"
                  ? `{{${JSON.stringify((body as RestAPIRawBody).content)}}}`
                  : (body as RestAPIRawBody).content
              }
              expectValueType={VALIDATION_TYPES.OBJECT}
              height="88px"
              onChange={(value) => handleRawBodyTypeChange(value, "content")}
            />
          </div>
        )}
        </div>
      {/* </div> */}
    </div>
  );
};

BodyEditor.displayName = "BodyEditor";

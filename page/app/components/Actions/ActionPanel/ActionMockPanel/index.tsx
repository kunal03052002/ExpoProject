import { FC, memo } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
import { CodeEditor } from "@/components/CodeEditor"
import {
  CODE_LANG,
  CODE_TYPE,
} from "@/components/CodeEditor/CodeMirror/extensions/interface"
import { configActions } from "@/redux/config/configSlice"
// import { TransformerComponent } from "../TransformerComponent"
import { ActionMockPanelProps } from "./interface"
import {
  mockDataContainerStyle,
  mockDataTitleStyle,
  mockPanelContainerStyle,
} from "./style"
// import { Checkbox } from "@mui/material"

// eslint-disable-next-line react-refresh/only-export-components
const ActionMockPanel: FC<ActionMockPanelProps> = (props) => {
  const { mockData } = props

  const dispatch = useDispatch()
  const { t } = useTranslation()

  const handleOnChangeMockData = (value: string) => {
    dispatch(
      configActions.updateCachedActionMockConfigReducer({
        mockData: value,
      }),
    )
  }

  const handleOnChangeEnableForReleasedApp = (checked: boolean) => {
    dispatch(
      configActions.updateCachedActionMockConfigReducer({
        enableForReleasedApp: checked,
      }),
    )
  }

  return (
    <>
      <div css={mockPanelContainerStyle}>
        <div css={mockDataContainerStyle}>
          <span css={mockDataTitleStyle}>
            {t("editor.action.panel.option.mock.json")}
          </span>
          <CodeEditor
            value={mockData}
            showLineNumbers
            canShowCompleteInfo
            height="88px"
            lang={CODE_LANG.JAVASCRIPT}
            codeType={CODE_TYPE.NO_METHOD_FUNCTION}
            onChange={handleOnChangeMockData}
          />
        </div>
        {/* <Checkbox
          checked={enableForReleasedApp}
          // colorScheme="techPurple"
          onChange={(e)=> { return handleOnChangeEnableForReleasedApp(!!e.target.value)}}
        >
          {t("editor.action.panel.option.mock.on_deploy")}
        </Checkbox> */}
      </div>
      {/* <TransformerComponent fullWidth /> */}
    </>
  )
}

export default memo(ActionMockPanel)

import { css } from "@emotion/react"
import {
  recordKeyStyle,
  recordValueStyle,
} from "@/components/RecordEditor/style"
import { globalColor } from "@/utils/colorBuilder"

export const bodyEditorContainerStyle = css`
  display: flex;
  padding: 0px;
  flex-direction: row;
`

export const bodyLabelStyle = css`
  min-width: 108px;
  height: 48px;
  display: flex;
  flex-direction: row;
  justify-content: start;
  margin-left:16px;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  color: ${globalColor("grayBlue-02")};
`

export const bodyChooserStyle = css`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  margin-left: 1px;
`

export const bodySelectorStyle = css`
  display: flex;
  height: 48px;
    max-width: 560px;
    width:100%;
  margin-top:30px;
  align-items: center;
justify-content:flex-start;
  flex-direction: row;
`

export const codeEditorStyle = css`
  margin: 8px 0;
`

export const restRecordKeyStyle = css`
  ${recordKeyStyle};
  margin-right: -1px;
`

export const restRecordValueStyle = css`
  ${recordValueStyle};
  & .cm-scroller {
    overflow-x: hidden;
  }
`

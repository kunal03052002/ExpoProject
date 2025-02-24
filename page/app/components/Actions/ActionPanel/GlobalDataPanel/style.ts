import { globalColor } from "@/utils/colorBuilder"
import { css } from "@emotion/react"

export const globalDataPanelContainerStyle = css`
  display: flex;
  width: 100%;
  padding: 8px 16px;
  gap: 16px;
`

export const labelStyle = css`
  width: 200px;
  text-align: right;
  color: ${globalColor("grayBlue-02")};
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
  white-space: nowrap;
`

export const inputAreaStyle = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`

export const tipsStyle = css`
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  color: ${globalColor("grayBlue-04")};
`

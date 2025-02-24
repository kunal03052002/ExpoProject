import { globalColor } from "@/utils/colorBuilder"
import { css } from "@emotion/react"


export const transformerPanelContainerStyle = css`
  display: flex;
  flex-direction: column;
  padding: 8px 16px;
`

export const transformerTipStyle = css`
  margin: 0 16px;
  font-size: 12px;
  color: ${globalColor(`grayBlue-04`)};
`

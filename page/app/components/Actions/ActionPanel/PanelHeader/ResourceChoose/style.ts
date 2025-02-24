import { globalColor } from "@/utils/colorBuilder"
import { css } from "@emotion/react"


export const createNewStyle = css`
  color: ${globalColor("techPurple-03")};
`

export const itemContainer = css`
  width: 100%;
  display: flex;
  align-items: center;
`

export const itemLogo = css`
  flex-shrink: 0;
`

export const itemText = css`
  margin-left: 8px;
  flex-shrink: 1;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  flex-grow: 1;
`

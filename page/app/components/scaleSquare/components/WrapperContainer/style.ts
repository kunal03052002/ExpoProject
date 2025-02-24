import { css } from "@emotion/react"
import { WIDGET_PADDING } from "../../constant/widget"
import { globalColor } from "@/utils/colorBuilder"

export const hoverHotSpotStyle = css`
  width: 100%;
  height: 100%;
`

export const applyWrapperPendingStyle = ({
  isSelected,
  hasError,
  isEditor,
  isLimitedModeAndOverLap = false,
}: {
  isSelected: boolean
  hasError: boolean
  isEditor: boolean
  isLimitedModeAndOverLap: boolean
}) => css`
  width: 100%;
  height: 100%;
 padding: ${ WIDGET_PADDING
}px;
  background-color: ${isEditor && hasError && !isSelected
    ? globalColor("red-08")
    : "transparent"};
  ${isLimitedModeAndOverLap && isSelected
    ? `border-bottom:unset !important`
    : ""}
  ${isEditor && "cursor: move"}
`

import { css } from "@emotion/react"
import { HEADER_MIN_HEIGHT } from "../../../constant/canvas"

// import { HEADER_MIN_HEIGHT } from "@/page/app/components/DotPanel/constant/canvas"

export const applyHeaderSectionWrapperStyle = (
  height: string,
  left: string = "0px",
  width: string = "0px",
  dividerColor?: string,
  background: string = "transparent",
) => css`
  position: absolute;
  top: 0;
  left: var(--ImpaktApps-canvas-header-left, ${left});
  width: var(--ImpaktApps-canvas-header-width, ${width});
  height: ${height};
  display: flex;
  flex-direction: column;
  min-height: ${HEADER_MIN_HEIGHT}px;
  border-bottom: ${dividerColor
    ? `1px solid ${dividerColor}`
    : "unset"};
  background: ${background};
`

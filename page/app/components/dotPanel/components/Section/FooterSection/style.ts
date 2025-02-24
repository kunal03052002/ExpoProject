import { css } from "@emotion/react"
import { FOOTER_MIN_HEIGHT } from "../../../constant/canvas"

// import { FOOTER_MIN_HEIGHT } from "@/page/app/components/DotPanel/constant/canvas"

export const applyFooterSectionWrapperStyle = (
  height: string,
  left: string = "0px",
  width: string = "0px",
  dividerColor?: string,
  background: string = "transparent",
) => css`
  position: absolute;
  bottom: 0;
  left: var(--ImpaktApps-canvas-footer-left, ${left});
  width: var(--ImpaktApps-canvas-footer-width, ${width});
  height: ${height};
  display: flex;
  flex-direction: column-reverse;
  min-height: ${FOOTER_MIN_HEIGHT}px;
  border-top: ${dividerColor
    ? `1px solid ${dividerColor}`
    : "unset"};
  background: ${background};
`

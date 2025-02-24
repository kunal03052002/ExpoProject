import { css } from "@emotion/react"


export const bodySectionWrapperStyle = (background: string) => {
  return css`
  position: absolute;
  width: var(--ImpaktApps-canvas-body-width, 100%);
  left: var(--ImpaktApps-canvas-body-left, 0);
  top: var(--ImpaktApps-canvas-body-top, 0);
  height: var(--ImpaktApps-canvas-body-height);
  background: ${background};
`
};

import { globalColor } from "@/utils/colorBuilder"
import { css } from "@emotion/react"

export const dotLintRectangleStyle = css`
border: 1px dashed ${globalColor("techPurple-03")};
  position: absolute;
  z-index: 6;
  pointer-events: none;
`
export const applyResizingDotLintRectangleStyle = (
  w: number,
  h: number,
  x: number,
  y: number,
) => {
  return css`
    width: ${w}px;
    height: ${h}px;
    top: 0;
    left: 0;
    transform: translate(${x}px, ${y}px);
    border: 1px dashed ${globalColor("techPurple-03")};
    position: absolute;
    z-index: 6;
    pointer-events: none;
  `
}
  // height: ${h}px;
export const rectangleStyle = css`
  width: 100%;
  height: 100%;
  background-color: ${globalColor("techPurple-03")};
  opacity: 0.16;
  pointer-events: none;
`

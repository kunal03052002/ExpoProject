import { globalColor } from "@/utils/colorBuilder"
import { css } from "@emotion/react"

export const applyMultiSelectedScaleSquareStyle = (
  width: number,
  height: number,
  left: number,
  top: number,
) => {
  return css`
    position: absolute;
    border: 1px dashed ${globalColor("techPurple-03")};
    width: ${width}px;
    height: ${height}px;
    left: 0;
    top: 0;
    transform: translate(${left}px, ${top}px);
    pointer-events: none;
  `
}

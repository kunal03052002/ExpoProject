import { globalColor } from "@/utils/colorBuilder"
import { css } from "@emotion/react"
export const dragPreviewStyle = (
  top: number,
  left: number,
  width: number,
  height: number,
  canDrop: boolean,
) => css`
  position: absolute;
  top: 0;
  left: 0;
  width: ${width}px;
  height: ${height}px;
  transform: translate(${left+5}px, ${top+5}px);
  background-color: ${canDrop
    ? `rgba(101, 74, 236, 0.1)`
    : `rgba(255, 71, 71, 0.1)`};
  border-top: 3px solid
    ${canDrop ? globalColor("techPurple-03") : globalColor("red-03")};
  z-index: 10;
`

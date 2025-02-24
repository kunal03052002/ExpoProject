import { css } from "@emotion/react"
import { ImpaktMode } from "@/redux/config/configState"
import { globalColor } from "@/utils/colorBuilder"

export const applyComponentCanvasStyle = (
  width: number,
  height: number,
  unitWidth: number,
  unitHeight: number = 8,
  showDot: boolean = false,
  addHeight: number = 0,
  minHeight?: number,
) => {
  const heightCss = minHeight
    ? css`
        height: ${addHeight}px;
        min-height: ${minHeight}px;
      `
    : css`
        min-height: 100vh;
        height: ${addHeight}px;
      `
  return css`
    width: 100%;
    ${heightCss};
    ${showDot
      ? applyDotBackgroundStyle(width, height, unitWidth, unitHeight)
      : normalCanvasBackgroundStyle}
    position: relative;
  `
}

const normalCanvasBackgroundStyle = css`
  background: unset;
`

const applyDotBackgroundStyle = (
  width: number,
  height: number,
  unitWidth: number,
  unitHeight: number = 8,
) => {
  return css`
    background-image: radial-gradient(
        circle at 1px 1px,
        grayBlue 1px,
        transparent 0px
      ),
      radial-gradient(
        circle at ${width - 1}px 1px,
        grayBlue 1px,
        transparent 0px
      );
    background-repeat: repeat;
    background-size:
      ${unitWidth}px ${unitHeight}px,
      100% ${unitHeight}px;
  `
}
// border: 1px dashed ${getColor("techPurple", "03")}
export const applyDotLintRectangleStyle = (
  w: number,
  h: number,
  x: number = 0,
  y: number = 0,
) => {
  return css`
    width: ${w}px;
    height: ${h}px;
    position: absolute;
    transform: translate(${x}px, ${y}px);
    z-index: 6;
    pointer-events: none;
  `
}

export const applyRectangleStyle = (
  w: number,
  h: number,
  x: number,
  y: number,
  canDrop: boolean = false,
) => {
  return css`
    width: ${w}px;
    height: ${h}px;
    background-color: ${canDrop
      ? "techPurple"
      : "red"};
    opacity: 0.16;
    position: absolute;
    transform: translate(${x}px, ${y}px);
    z-index: 6;
    pointer-events: none;
  `
}

export const borderLineStyle = css`
  width: 100%;
  height: 100%;
  border: 2px solid #f7f8fa;
  pointer-events: none;
`
// border: 1px dashed ${getColor("techPurple", "03")}
export const applyFreezePlaceholderShapeStyle = (
  top: number,
  left: number,
  height: number,
  width: number,
) => {
  return css`
    position: absolute;
    left: ${left}px;
    top: ${top}px;
    width: ${width}px;
    height: ${height}px;
  
    z-index: 6;
  `
}

export const applyViewportContainerWrapperStyle = (
  mode: ImpaktMode,
  width?: number,
  height?: number,
) => {
  const borderStyle =
    mode === "preview" && width != undefined
      ? css`
          border: 1px solid ${globalColor("grayBlue-09")};
        `
      : null
  return css`
    width: ${mode === "production"
      ? "100%"
      : width != undefined
        ? `${width}px`
        : "100%"};
    height: ${mode === "production"
      ? "100%"
      : height != undefined
        ? `${height}px`
        : "100%"};
    background-color: ${globalColor("white-01")};
    overflow: auto;
    margin: 0 auto;
    position: relative;
    ${borderStyle}
  `
}


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

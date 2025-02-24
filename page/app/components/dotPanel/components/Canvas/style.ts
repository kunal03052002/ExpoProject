import { css } from "@emotion/react"
import {
  BORDER_WIDTH,
  SCROLL_CONTAINER_PADDING,
  UNIT_HEIGHT,
} from "@/page/app/components/dotPanel/constant/canvas"
import { getPaddingShape } from "../../utils/styleutils/padding"
import { globalColor } from "@/utils/colorBuilder"

export const outerComponentCanvasContainerStyle = (
  _padding: string,
  _background: string,
  _shadowSize: "none" | "small" | "medium" | "large",
  dividerColor?: string,
) => {
  // const { paddingTop, paddingBottom, paddingLeft, paddingRight } = getPaddingShape(padding)
  return css`
    height: 100%;
    width: 100%;
    position: relative;
    overflow: hidden;
 
    margin:none;
   
    border: ${dividerColor ? `1px solid ${dividerColor}` : "unset"};
  `
}
//  padding: ${paddingTop}px ${paddingRight}px ${paddingBottom}px  ${paddingLeft}px;
export const outerModalCanvasContainerStyle = (padding: string) => {
  const { paddingTop, paddingBottom, paddingLeft, paddingRight } =
    getPaddingShape(padding)
  return css`
    height: 100%;
    width: 100%;
    padding: ${paddingTop}px ${paddingRight}px ${paddingBottom}px
      ${paddingLeft}px;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  `
}

export const outerComponentCanvasContainerWithJsonStyle = (
  padding: number,
) => css`
  height: 100%;
  width: 100%;
  padding: 
  position: relative;
  overflow: auto;
 ` //${padding}px;

export const componentCanvasContainerStyle = css`
  width: 100%;
  height: 100%;
  position: relative;

  overflow: hidden auto;;
`
  // padding: ${SCROLL_CONTAINER_PADDING}px;

export const containerShapeStyle = (padding: string) => {
  const { paddingTop, paddingBottom, paddingLeft, paddingRight } =
    getPaddingShape(padding)
  return css`

    position: absolute;
    border: ${BORDER_WIDTH}px solid ${globalColor("grayBlue-09")};
    pointer-events: none;
  `
}
    // top: ${paddingTop}px;
    // bottom: ${paddingBottom}px;
    // left: ${paddingLeft}px;
    // right: ${paddingRight}px;
export const dropZoneStyle = (canvasHeight?: number) => css`
  width: 100%;
  height: ${canvasHeight ? `100%` : canvasHeight};
`
// ${canvasHeight}px
export const applyComponentCanvasStyle = (
  unitWidth: number,
  showDot: boolean = false,
) => {
  return css`
    width: 100%;
    height: 100%;
    ${showDot
      ? applyDotBackgroundStyle(unitWidth)
      : normalCanvasBackgroundStyle}
    position: relative;
  `
}

const normalCanvasBackgroundStyle = css`
  background: unset;
`

const applyDotBackgroundStyle = (unitWidth: number) => {
  return css`
    background-image: radial-gradient(
      circle at 1px 1px,
      ${globalColor("grayBlue-08")} 1px,
      transparent 0px
    );
    background-repeat: repeat;
    background-size: ${unitWidth}px ${UNIT_HEIGHT}px;
  `
}

export const selectoSelectionStyle = css`
  > .selecto-selection {
    position: absolute !important;
    transform: translate(
      var(--ImpaktApps-select-area-left, 0),
      var(--ImpaktApps-select-area-top, 0)
    ) !important;
    width: var(--ImpaktApps-select-area-width, 0) !important;
    height: var(--ImpaktApps-select-area-height, 0) !important;
    background: rgba(101, 74, 236, 0.08) !important;
    border: 1px solid ${globalColor("techPurple-03")} !important;
  }
`

export const maskStyle = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${globalColor("blackAlpha-04")};
  z-index: -1;
`

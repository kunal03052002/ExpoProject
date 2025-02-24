import { SerializedStyles, css } from "@emotion/react"
import { ScaleSquareType } from "@/page/app/components/scaleSquare/interface"
import { globalColor } from "@/utils/colorBuilder"

export type BarPosition = "l" | "r" | "t" | "b" | "tl" | "tr" | "bl" | "br"

export function getSelectedColor(selected: boolean): string {
  return selected ?"techPurple" : "transparent"
}

export function applySquarePointerStyle(
  selected: boolean,
  scaleSquareType: ScaleSquareType,
  pointerPosition: BarPosition,
): SerializedStyles {
  if (scaleSquareType === "production") {
    return css`
      visibility: hidden;
    `
  }
  let positionStyle: SerializedStyles
  switch (pointerPosition) {
    case "tl":
      positionStyle = css`
        top: 8px;
        left: 8px;
        cursor: ${selected ? "nwse-resize" : "default"};
      `
      break
    case "tr":
      positionStyle = css`
        cursor: ${selected ? "nesw-resize" : "default"};
        top: 8px;
        right: 8px;
      `
      break
    case "bl":
      positionStyle = css`
        cursor: ${selected ? "nesw-resize" : "default"};
        bottom: 8px;
        left: 8px;
      `
      break
    case "br":
      positionStyle = css`
        cursor: ${selected ? "nwse-resize" : "default"};
        bottom: 8px;
        right: 8px;
      `
      break
    default:
      positionStyle = css``
      break
  }

  const baseColor = getSelectedColor(selected)

  return css`
    ${positionStyle};
    box-sizing: border-box;
    border: 1px solid ${baseColor};
    height: 5px;
    width: 5px;
    position: absolute;
    background: ${selected
      ? "white"
      : "transparent"};
    z-index: 150;
    &:active {
      background: ${baseColor};
    }

    &:hover {
      background: ${baseColor};
    }
  `
}

export const applyBarPointerShapeStyle = (barPosition: BarPosition) => {
  let barPositionStyle: SerializedStyles

  switch (barPosition) {
    case "t":
      barPositionStyle = css`
        left: 0;
        right: 0;
        margin: auto;
        height: 5px;
        width: 24px;
      `
      break
    case "b":
      barPositionStyle = css`
        left: 0;
        right: 0;
        margin: auto;
        height: 5px;
        width: 24px;
      `
      break
    case "l":
      barPositionStyle = css`
        bottom: 0;
        top: 0;
        margin: auto;
        width: 5px;
        height: 24px;
      `
      break
    case "r":
      barPositionStyle = css`
        bottom: 0;
        top: 100;
        margin: auto;
        width: 5px;
        height: 24px;
      `
      break
    default:
      barPositionStyle = css``
  }
  return css`
    ${barPositionStyle};
    box-sizing: border-box;
    position: absolute;
    border-radius: 2.5px;
    background-color:white-01;
  `
}

export function applyBarPointerStyle(
  selected: boolean,
  scaleSquareType: ScaleSquareType,
  barPosition: BarPosition,
  isLimitedMode: boolean = false,
): SerializedStyles {
  if (scaleSquareType === "production") {
    return css`
      visibility: hidden;
    `
  }

  const barPositionStyle: SerializedStyles =
    applyBarPointerShapeStyle(barPosition)

  const baseColor =
    isLimitedMode && selected
      ? globalColor("techPink-03")
      : getSelectedColor(selected)
  return css`
    ${barPositionStyle};
    border: 1px solid ${baseColor};
    :hover {
      background-color: ${isLimitedMode
        ? globalColor("techPink-03")
        : globalColor("techPurple-03")};
    }
    :active {
      background-color: ${isLimitedMode
        ? globalColor("techPink-03")
        : globalColor("techPurple-03")};
    }
  `
}

export function applyBarHandlerStyle(
  selected: boolean,
  scaleSquareType: ScaleSquareType,
  barPosition: BarPosition,
): SerializedStyles {
  if (scaleSquareType === "production") {
    return css`
      visibility: hidden;
    `
  }
  let barPositionStyle: SerializedStyles
  switch (barPosition) {
    case "t":
      barPositionStyle = css`
        top: 3px;
        left: 0;
        right: 0;
        height: 5px;
        cursor: ${selected ? "row-resize" : "default"};
      `
      break
    case "b":
      barPositionStyle = css`
        bottom: 3px;
        left: 0;
        right: 0;
        height: 5px;
        cursor: ${selected ? "row-resize" : "default"};
      `
      break
    case "l":
      barPositionStyle = css`
        bottom: 0;
        left: 3px;
        top: 0;
        width: 5px;
        cursor: ${selected ? "col-resize" : "default"};
      `
      break
    case "r":
      barPositionStyle = css`
        bottom: 0;
        right: 3px;
        top: 0;
        cursor: ${selected ? "col-resize" : "default"};
        width: 5px;
      `
      break
    default:
      barPositionStyle = css``
  }

  return css`
    ${barPositionStyle};
    position: absolute;
  `
}

const getWrapperBorderColor = (
  isSelected: boolean,
  hasEditors: boolean,
  isHover: boolean,
  shownDot: boolean,
) => {
  if (isSelected || hasEditors || isHover || shownDot) {
    return globalColor("techPurple-03")
  }
  return "transparent"
}

const getWrapperBorderStyle = (
  hasEditors: boolean,
  isSelected: boolean,
  isDragging: boolean,
  isHover: boolean,
  shownDot: boolean,
) => {
  if (shownDot || (hasEditors && !isSelected && !isDragging && !isHover)) {
    return "dashed"
  }
  return "solid"
}

export const getWrapperBorder = (
  isLikProductionMode: boolean,
  isSelected: boolean,
  hasEditors: boolean,
  isHover: boolean,
  isDragging: boolean,
  shownDot: boolean,
) => {
  if (isLikProductionMode) {
    return css`
      border: none;
    `
  }
  return css`

    border-width: 1px;
    border-style: ${getWrapperBorderStyle(
      hasEditors,
      isSelected,
      isDragging,
      isHover,
      shownDot,
    )};
    border-color: ${getWrapperBorderColor(
      isSelected,
      hasEditors,
      isHover,
      shownDot,
    )};
  `
}

export const jsonWrapperPendingStyle = css`
  width: 100%;
  height: 100%;
  padding: 2px;
  background-color: transparent;
`

export const applyDashedLineStyle = (
  isSelected: boolean,
  isShowCanvasDot: boolean,
  isDragging: boolean,
  maxHeight?: number,
) => css`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  max-height: ${maxHeight ? `${maxHeight}px` : "unset"};
  pointer-events: none;
  border: ${isShowCanvasDot && !isSelected && !isDragging
    ? `1px dashed techPurple`
    : "none"};
`

export const applyXDirectionDashedLineStyle = (
  isSelected: boolean,
  isShowCanvasDot: boolean,
  isDragging: boolean,
  maxHeight?: number,
) => css`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  max-height: ${maxHeight ? `${maxHeight}px` : "unset"};
  pointer-events: none;
  border-left: ${isShowCanvasDot && !isSelected && !isDragging
    ? `1px dashed techPurple`
    : "none"};
  border-right: ${isShowCanvasDot && !isSelected && !isDragging
    ? `1px dashed techPurple`
    : "none"};
`

export const modalstopPropagationContainerStyle = css`
  width: 100%;
  height: 100%;
`

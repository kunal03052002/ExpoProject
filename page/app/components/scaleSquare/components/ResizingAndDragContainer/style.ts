import { css } from "@emotion/react"
import { getWrapperBorder } from "../../style"
export const resizingGridContainerStyle = (
  shapeInfo: {
    width: string
    height: number
    minWidth: number
  },
  borderInfo: {
    isLikeProductionMode: boolean
    isSelected: boolean
    hasEditors: boolean
    isHover: boolean
    isDragging: boolean
    shownDot: boolean
  },
) => {
  const { width, minWidth } = shapeInfo
  const {
    isLikeProductionMode: isLikProductionMode,
    isSelected,
    hasEditors,
    isHover,
    isDragging,
    shownDot,
  } = borderInfo
  return css`
      width:${width};
    height: auto;
      min-width: ${minWidth}px;
    position: relative;
   background:white;
    ${getWrapperBorder(
    isLikProductionMode,
    isSelected,
    hasEditors,
    isHover,
    isDragging,
    shownDot,
  )}
  `
}
// export const resizingContainerStyle = (
//   shapeInfo: {
//     width: number
//     height: number
//     minWidth: number
//     minHeight: number

//   },
//   borderInfo: {
//     isLikeProductionMode: boolean
//     isSelected: boolean
//     hasEditors: boolean
//     isHover: boolean
//     isDragging: boolean
//     shownDot: boolean,
//     isVariantOutlined: boolean
//   },
// ) => {
//   const { width, height, minHeight, minWidth } = shapeInfo
//   const {
//     isLikeProductionMode: isLikProductionMode,
//     isSelected,
//     hasEditors,
//     isHover,
//     isDragging,
//     shownDot,
//     isVariantOutlined
//   } = borderInfo
//   return css`
//     width:${width}px;
//     height: ${height}px;
//     min-width: ${minWidth}px;
//     min-height: ${minHeight}px;
//     position: relative;
//     ${getWrapperBorder(
//     isLikProductionMode,
//     isSelected,
//     hasEditors,
//     isHover,
//     isDragging,
//     shownDot,

//   )}
//   `
// }

export const resizingPlaceholderStyle = css`
  background-color: rgba(101, 74, 236, 0.1);
  width: 100%;
  height: 100%;
`

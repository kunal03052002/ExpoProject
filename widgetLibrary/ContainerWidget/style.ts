import {  UNIT_HEIGHT } from "@/page/app/components/dotPanel/constant/canvas"
import { globalColor } from "@/utils/colorBuilder"
import { css } from "@emotion/react"

export const emptyStateStyle = css`
  font-size: 14px;
  color: ${globalColor("grayBlue-04")};
  text-align: center;
`
// export const applyEmptyStateStyle = (
//   rowCount:number
// ) =>{

// }
export const applyEmptyStateWrapperStyle = (
  _isInner: boolean = false,
  _paddingTopBottom: number,
  isEditMode:boolean,
  rowCount:number
) =>{
  return css`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  border: 0.5px dashed #edf2ee;
  padding: ${isEditMode?"20px":"none"}
  justify-content: center;
  min-height:${rowCount*13*UNIT_HEIGHT}px;
  z-index:${_isInner?1:_paddingTopBottom}
`
}
export const applyContainerWrapperStyle = css`
  width: 100%;
  height: 100%;
  display: flex;
`

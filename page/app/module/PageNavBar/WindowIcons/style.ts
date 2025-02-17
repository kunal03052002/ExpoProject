import { globalColor } from "@/utils/colorBuilder"
import { SerializedStyles, css } from "@emotion/react"


export const lineStyle = css`
  display: inline-block;
  width: 1px;
  height: 16px;
  margin: 0 16px;
  background-color: ${globalColor("grayBlue-08")};
`

export const windowIconBodyStyle = css`
  width: 24px;
  height: 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 2px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: ${globalColor("grayBlue-09")};
  }
`

export function windowIconStyle(selected: boolean): SerializedStyles {
  return css`
    flex: none;
 
  height: 16px;
  font - size: 16px;
  color: ${
    selected
      ?
      globalColor("grayBlue-03")
      : globalColor("grayBlue-05")
  };
   width: ${selected
    ?
    "20px"
    : "16px"};
  `
 

}

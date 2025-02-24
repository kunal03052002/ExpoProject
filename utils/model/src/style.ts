// import { ModalAlignType } from "./interface"
import { globalColor } from "@/utils/colorBuilder"
import { css, SerializedStyles } from "@emotion/react"
import zIndex from "@mui/material/styles/zIndex"
import { Variants } from "framer-motion"
import { BoxProps } from "./interface"
import { omit } from "./omit"

export function applyModalMask(z?: string | number): SerializedStyles {
  return css`
    z-index: ${z ? z : zIndex.modal};
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: ${globalColor("white-05")};
    backdrop-filter: blur(5px);
  `
}

export function applyModalContainer(z?: string | number): SerializedStyles {
  return css`
    position: fixed;
    cursor: auto;
    overflow: auto;
    text-align: center;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: ${z ? z : zIndex.modal};

    &:after {
      display: inline-block;
      vertical-align: middle;
      width: 0;
      height: 100%;
      content: "";
    }
  `
}

export function applyModal(): SerializedStyles {
  return css`
    box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.08);
    box-sizing: content-box;
    display: inline-block;
    position: relative;
    vertical-align: middle;
    text-align: left;
    min-width: 520px;
    width: 520px;
    margin: 24px auto;
    border-radius: 8px;
    border: 1px solid ${globalColor("grayBlue-08")};
    background-color: ${globalColor("white-01")};
  `
}

export function applyModalHeader(
  closable?: boolean,
  withoutLine?: boolean,
): SerializedStyles {
  let border = css``
  if (!withoutLine) {
    border = css`
      border-bottom: 1px solid ${globalColor(`grayBlue-08`)};
    `
  }

  const paddingCss = closable
    ? css`
        padding: 16px 40px;
      `
    : css`
        padding: 16px;
      `

  return css`
    ${paddingCss};
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    ${border};
  `
}

export function applyModalTitle(): SerializedStyles {
  return css`
    text-align: center;
    font-size: 16px;
    font-weight: 600;
    color: ${globalColor(`grayBlue-02`)};
  `
}

export function applyModalContent(withoutPadding?: boolean): SerializedStyles {
  const paddingCSS = withoutPadding
    ? css`
        padding: 0;
      `
    : ""
  return css`
    font-size: 14px;
    color: ${globalColor("grayBlue-02")};
    font-weight: 400;
    line-height: 22px;
    padding: 16px 24px;
    ${paddingCSS}
  `
}

export const modalCloseIconStyle = css`
  position: absolute;
  width: 24px;
  height: 24px;
  line-height: 24px;
  text-align: center;
  top: 16px;
  right: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${globalColor(`grayBlue-03`)};
`

export function applyModalFooter(withoutLine?: boolean): SerializedStyles {
  const line = withoutLine
    ? css``
    : css`
        border-top: 1px solid ${globalColor(`grayBlue-08`)};
      `
  return css`
    display: flex;
    gap: 8px;
    flex-direction: row;
    width: 100%;
    box-sizing: border-box;
    padding: 24px 24px;
    ${line};
  `
}

export const maskAnimation: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
}

export const modalAnimation: Variants = {
  initial: {
    opacity: 0,
    scaleX: 0.5,
    scaleY: 0.5,
  },
  animate: {
    opacity: 1,
    scaleX: 1,
    scaleY: 1,
  },
  exit: {
    opacity: 0,
    scaleX: 0.5,
    scaleY: 0.5,
  },
}




export function applyBoxStyle(props: BoxProps): SerializedStyles {
  return css`
    //SizeStyledProps
    width: ${props.w};
    min-width: ${props.minW};
    max-width: ${props.maxW};
    height: ${props.h};
    min-height: ${props.minH};
    max-height: ${props.maxH};
    padding-top: ${props.pt};
    padding-bottom: ${props.pb};
    padding-left: ${props.pl};
    padding-right: ${props.pr};
    padding: ${props.pd};
    margin-left: ${props.ml};
    margin-right: ${props.mr};
    margin-top: ${props.mt};
    margin-bottom: ${props.mb};
    margin: ${props.mg};
    //ShapeStyledProps
    border-top: ${props.bt};
    border-bottom: ${props.bb};
    border-left: ${props.bl};
    border-right: ${props.br};
    border-radius: ${props.bdRadius};
    border: ${props.bd};
    //ColorStyledProps
    background: ${props.bg};
    background-color: ${props.bgColor};
    border-color: ${props.bdColor};
    color: ${props.c};
    opacity: ${props.opac};
    //PositionStyledProps
    position: ${props.pos};
    top: ${props.posT};
    left: ${props.posL};
    bottom: ${props.posB};
    right: ${props.posR};
    z-index: ${props.z};
    overflow: ${props.ov};
    overflow-x: ${props.ovX};
    overflow-y: ${props.ovY};
    // FlexStyledProps
    display: ${props.disp};
    align-items: ${props.alignItems};
    align-content: ${props.alignContent};
    justify-content: ${props.justifyContent};
    justify-items: ${props.justifyItems};
    flex-wrap: ${props.flexWrap};
    flex-direction: ${props.flexDirection};
    flex: ${props.flex};
    flex-grow: ${props.flexGrow};
    flex-shrink: ${props.flexShrink};
    flex-basis: ${props.flexBasis};
    justify-self: ${props.justifySelf};
    align-self: ${props.alignSelf};
    order: ${props.o};
    //FontStyledProps
    font-size: ${props.fs};
    font-family: ${props.ff};
    font-weight: ${props.fw};
    visibility: ${props.v};
    // UserProps
    cursor: ${props.cur};
    ${props._css};
    // DisplayStyledProps
    left: ${props.l};
    top: ${props.t};
    right: ${props.r};
    bottom: ${props.b};
  `
}

export function deleteCssProps(obj: object): object {
  return omit(obj, [
    //SizeStyledProps
    "w",
    "minW",
    "maxW",
    "h",
    "minH",
    "maxH",
    "pt",
    "pb",
    "pl",
    "pr",
    "pd",
    "ml",
    "mr",
    "mt",
    "mb",
    "mg",
    //ShapeStyledProps
    "bt",
    "bb",
    "bl",
    "br",
    "bdRadius",
    "bd",
    //ColorStyledProps
    "bg",
    "bgColor",
    "bdColor",
    "c",
    "opac",
    //PositionStyledProps
    "pos",
    "posT",
    "posL",
    "posB",
    "posR",
    "z",
    "ov",
    "ovX",
    "ovY",
    "v",
    // FlexStyledProps
    "disp",
    "alignItems",
    "alignContent",
    "justifyContent",
    "justifyItems",
    "flexWrap",
    "flexDirection",
    "flex",
    "flexGrow",
    "flexShrink",
    "flexBasis",
    "justifySelf",
    "alignSelf",
    "o",
    //FontStyledProps
    "fs",
    "ff",
    "fw",
    //UserProps
    "cur",
    "_css",
    //DisplayStyledProps
    "l",
    "t",
    "r",
    "b",
  ])
}

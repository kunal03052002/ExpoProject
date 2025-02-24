import { css, SerializedStyles } from "@emotion/react"

import { PaginationSize } from "./interface"
import { globalColor } from "../colorBuilder"
import { getSpecialThemeColor } from "../color-palette"

export const paginationContainer = css`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
`

export const totalStyle = css`
  font-size: 14px;
  margin-right: 8px;
  color: ${globalColor("grayBlue-02")};
`

export function applyJumperStyle(disabled?: boolean): SerializedStyles {
  return css`
    font-size: 14px;
    margin-left: 8px;
    margin-right: 16px;
    white-space: nowrap;
    color: ${disabled
      ? globalColor("grayBlue-07")
      : globalColor("grayBlue-02")};
  `
}

export const jumperContainerStyle = css`
  display: inline-flex;
  align-items: center;
  flex-direction: row;
`

export const selectorContainerStyle = css`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
`

export function applySimpleTextStyle(
  marginStyle?: SerializedStyles,
  disabled?: boolean,
): SerializedStyles {
  let textColor = css`
    color: ${globalColor("grayBlue-02")};
  `
  if (disabled) {
    textColor = css`
      color: ${globalColor("grayBlue-07")};
    `
  }

  return css`
    font-size: 14px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: ${disabled ? "not-allowed" : "auto"};
    ${marginStyle};
    ${textColor};
  `
}

export function applyDirectorIconStyle(
  marginStyle?: SerializedStyles,
  size?: PaginationSize,
  disabled?: boolean,
  activeColorScheme?: string | undefined,
  active?: boolean,
): SerializedStyles {
  let textColor = css`
    color: ${active
      ? getSpecialThemeColor(activeColorScheme ?? "blue")
      : globalColor("grayBlue-02")};
  `
  let bgColor = css`
    background-color: ${active
      ? globalColor(activeColorScheme ?? "blue-08")
      : "unset"};
  `

  if (disabled) {
    textColor = css`
      color: ${active
        ? globalColor(activeColorScheme ?? "blue-05")
        : globalColor("grayBlue-07")};
    `
    bgColor = css`
      background-color: ${active
        ? activeColorScheme
          ? globalColor(`${activeColorScheme}-07`)
          : globalColor("grayBlue-09")
        : "unset"};
    `
  }

  let hoverStyle = css``

  if (!disabled && !active) {
    hoverStyle = css`
      &:hover {
        background-color: ${globalColor("grayBlue-09")};
      }
    `
  }

  let s = "32px"

  switch (size) {
    case "small":
      s = "24px"
      break
    case "medium":
      s = "32px"
      break
    case "large":
      s = "40px"
      break
  }

  return css`
    font-size: 14px;
    width: ${s};
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: ${s};
    border-radius: 4px;
    cursor: ${disabled ? "not-allowed" : "pointer"};
    ${marginStyle};
    ${textColor};
    ${bgColor};
    ${hoverStyle};
  `
}

export function applySelectorInputStyle(
  size: PaginationSize,
  inputBorderColorScheme?: string,
): SerializedStyles {
  let s = "32px"

  switch (size) {
    case "small":
      s = "24px"
      break
    case "medium":
      s = "32px"
      break
    case "large":
      s = "40px"
      break
  }

  return css`
    font-family: inherit;
    font-size: 14px;
    color: ${globalColor("grayBlue-02")};
    width: ${s};
    box-sizing: border-box;
    text-align: center;
    background-color: ${globalColor("grayBlue-09")};
    border-radius: 4px;
    height: ${s};
    outline: none;
    border: none;

    &:hover {
      background-color: ${globalColor("grayBlue-08")};
    }

    &:focus-within {
      outline: none;
      background: none;
      border: 1px solid
        ${inputBorderColorScheme
          ? getSpecialThemeColor(inputBorderColorScheme)
          : globalColor("blue-03")};
      box-shadow: 0 0 8px 0 blue;
    }

    &:disabled {
      cursor: not-allowed;
      color: ${globalColor("grayBlue-05")};
    }

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
    }

    &[type="number"] {
      -moz-appearance: textfield;
    }
  `
}

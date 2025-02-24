import { css } from "@emotion/react"

export const actionPanelStyle = css`
  flex-grow: 1;
  height: 100%;
  overflow-x: auto;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  position: relative;
  scrollbar-width:none;
`

export const actionPanelContainerStyle = css`
  width: 100%;
  height: 100%;
  min-width: 877px;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
`
export const stylePanelContainerStyle = css`
  width: 100%;
  height: 100%;
  min-width: 130px;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
`

export const actionContentStyle = css`
  width: 100%;
  display: flex;
  justify-content:flex-start;
  flex-direction: column;
`
export const styleContentStyle = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  position:relative
`

export const outterActionContainerStyle = css`
  padding-bottom: 48px;
  width: 100%;
  height: calc(100% - 48px);
  overflow-y: auto;
  padding-top: 8px;
`

export const actionItemContainer = css`
  padding: 8px 0;
`

import { globalColor } from "@/utils/colorBuilder";
import { css } from "@emotion/react";
export const LEFT_PANEL_WIDTH = 280;
export const RIGHT_PANEL_WIDTH = 320;
export const MIDDLE_PANEL_WIDTH = 300;
export const NAVBAR_HEIGHT = 48;

export const editorContainerStyle = css`
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  position: relative;
`;

export const contentStyle = css`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  background: #fafafb;
  flex-grow: 1;
  width: 100%;
  overflow: hidden;
`;

export const loadingStyle = css`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const navbarStyle = css`
  box-sizing: border-box;
  width: 98%;
  height: ${NAVBAR_HEIGHT}px;
  flex: none;
`;
export const sidebarStyle = css`
  box-sizing: border-box;
  display:flex;
  justify-content:center;
//   border-right:0.5px solid gray;
//  background:#edf2fa;
  flex: none;
 `;

export const leftPanelStyle = css`
  width: ${LEFT_PANEL_WIDTH}px;
  height: 100%;
  min-width: ${LEFT_PANEL_WIDTH}px;
  overflow: hidden;
  box-sizing: border-box;
  border-right: 1px solid grayBlue;
  background: white-01;
  padding-bottom: 48px;
`;

export const centerPanelStyle = css`
  height: 100%;
  width: 100%;
`;

export const bottomPanelStyle = css`
  box-sizing: border-box;
  width: 100%;
`;

export const rightPanelStyle = css`
  box-sizing: border-box;
  width: ${RIGHT_PANEL_WIDTH}px;
  min-width: ${RIGHT_PANEL_WIDTH}px;
  height: 100%;
  border-left: 1px solid grayBlue;
  background: white-01;
`;

export const middlePanelStyle = css`
  flex-grow: 1;
  min-width: ${RIGHT_PANEL_WIDTH}px;
   height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: ${globalColor(`white-01`)};
`;

export const modalStyle = css`
  position: absolute;
  top: 47px;
  width: 100vw;
  height: calc(100vh - 47px);
  z-index: 100;
  display: flex;
  justify-content: center;
  user-select: none;
`;

export const messageWrapperStyle = css`
  position: absolute;
  top: 17px;
  height: 40px;
  background-color: ${globalColor("white-01")};
  padding: 9px 16px;
  border: 1px solid ${globalColor("grayBlue-08")};
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  border-radius: 2px;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const waringIconStyle = css`
  color: ${globalColor("orange-03")};
  font-size: 16px;
`;

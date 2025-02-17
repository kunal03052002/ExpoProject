import { css, SerializedStyles } from "@emotion/react";
import { Variants } from "framer-motion"
import { NotificationPosition } from "./interface"
import { globalColor } from "../colorBuilder"
// ${closable ? "40px" : "16px"} 16px  16px16px 16px;
export function applyNotification(closable?: boolean): SerializedStyles {
  return css`
    position: relative;
    pointer-events: visible;
    padding: 8px;
    
    margin-bottom: 20px;
    width: 220px;
    display: flex;
    box-sizing: border-box;
    box-shadow: 0 4px 10px 0 ${globalColor(`blackAlpha-07`)};
    border-radius: 8px;
    border: 1px solid ${globalColor(`grayBlue-08`)};
    background-color: ${globalColor(`white-01`)};
    flex-direction: column;
  `
}

export const applyNotificationContentWrapper = css`
  flex: 1;
  word-break: break-all;
`

export const applyNotificationTitle = css`
  font-size: 12px;
  font-weight: 500;
  color: ${globalColor(`grayBlue-02`)};
  margin-top:3px;
  margin-bottom: 4px;
`

export const applyNotificationContentStyle = css`
  font-size: 10px;
  color: ${globalColor(`grayBlue-04`)};
`

export const applyNotificationCloseBtn = css`
  position: absolute;
  right: 4px;
  top: 8px;
  font-size: 8px;
  line-height: 0;
  color: red;
  cursor: pointer;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const applyNotificationAction = css`
  text-align: right;
  margin-top: 16px;
`

export function applyNotificationSlide(
  position: NotificationPosition,
): Variants {
  const originX =
    position === "topLeft" || position === "bottomLeft" ? "-100%" : "100%"
  return {
    initial: {
      x: `${originX}`,
    },
    animate: {
      opacity: 1,
      x: 0,
    },
    exit: {
      opacity: 0,
      transition: {
        opacity: { duration: 0.2, ease: "linear" },
      },
    },
  }
}

export const applyContentWrapperStyle = css`
  display: flex;
  flex-direction: row;
`

export function applyContentStyle(showIcon: boolean) {
  return css`
    flex: 1;
    word-break: break-word;
    margin-left: ${showIcon ? "8px" : "0"};
  `
}

export const applyNotificationLeftStyle = css`
  padding-right: 8px;
`

export function applyNotificationContainerStyle(
  position: NotificationPosition,
): SerializedStyles {
  let positionStyle = css``
  switch (position) {
    case "topLeft":
      positionStyle = css`
        top: 20px;
        left: 20px;
        align-items: start;
      `
      break
    case "topRight":
      positionStyle = css`
        top: 20px;
        right: 20px;
        align-items: end;
      `
      break
    case "bottomLeft":
      positionStyle = css`
        bottom: 0;
        left: 20px;
        align-items: start;
      `
      break
    case "bottomRight":
      positionStyle = css`
        bottom: 0;
        right: 20px;
        align-items: end;
      `
      break
  }

  return css`
    display: inline-flex;
    pointer-events: none;
    z-index: ${400};
    position: fixed;
    flex-direction: column;
    ${positionStyle};
  `
}

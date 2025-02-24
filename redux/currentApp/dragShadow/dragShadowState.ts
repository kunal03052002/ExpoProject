/* eslint-disable @typescript-eslint/no-explicit-any */
// import { MovingMessageBin } from "@/api/ws/ILLA_PROTO"

// export interface DragShadowInfo {
//   userID: MovingMessageBin["userID"]
//   nickname: MovingMessageBin["nickname"]
//   parentDisplayName: MovingMessageBin["parentDisplayName"]
//   displayNames: MovingMessageBin["displayNames"]
//   status: MovingMessageBin["status"] // 1 is Dragging move, 2 is resize,-1 is dragging end
//   xInteger: MovingMessageBin["cursorXInteger"]
//   yInteger: MovingMessageBin["cursorYInteger"]
//   xMod: MovingMessageBin["cursorXMod"]
//   yMod: MovingMessageBin["cursorYMod"]
//   rectX: MovingMessageBin["widgetX"]
//   rectY: MovingMessageBin["widgetY"]
//   rectW: MovingMessageBin["widgetW"]
//   rectH: MovingMessageBin["widgetH"]
//   lastUpdateTime: number
// }


export type UpdateCursorPayload = any

export type DragShadowState = Record<string, any[]>

export const DragShadowInitialState: DragShadowState = {}

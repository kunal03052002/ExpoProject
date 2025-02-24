/* eslint-disable @typescript-eslint/no-explicit-any */
import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"
export type ControllerListState = Record<string,any>

export const updateControllerListReducer: CaseReducer<
  ControllerListState,
  PayloadAction<any>
> = (_, action) => {
  return action.payload
} 

export const addControllerItemReducer: CaseReducer<
  ControllerListState,
  PayloadAction<any>
> = (state, action) => {
  state = {...action.payload, ...state}
  return state
}

export const updateControllerItemReducer: CaseReducer<
  ControllerListState,
  PayloadAction<any>
> = (state, action) => {
  const targetIndex = state.findIndex(
    (i) => i.ControllerID === action.payload.ControllerID,
  )
  if (targetIndex != -1) {
    state[targetIndex] = action.payload
  }
}

export const removeControllerItemReducer: CaseReducer<
  ControllerListState,
  PayloadAction<string>
> = (state, action) => {
  const index = state.findIndex((i) => {
    return i.ControllerID === action.payload
  })
  if (index !== -1) {
    state.splice(index, 1)
  }
}

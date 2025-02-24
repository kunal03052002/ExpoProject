import { createSlice } from "@reduxjs/toolkit"
import {
  addControllerItemReducer,
  removeControllerItemReducer,
  updateControllerItemReducer,
  updateControllerListReducer,
} from "@/redux/currentApp/executionController/controllerReducer"
import { ControllerInitialState } from "@/redux/currentApp/executionController/controllerState"

const ControllerSlice = createSlice({
  name: "Controller",
  initialState: ControllerInitialState,
  reducers: {
    updateControllerListReducer,
    addControllerItemReducer,
    updateControllerItemReducer,
    removeControllerItemReducer,
  },
})

export default ControllerSlice.reducer
export const ControllerActions = ControllerSlice.actions

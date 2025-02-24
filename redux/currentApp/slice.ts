import { combineReducers } from "@reduxjs/toolkit"
import actionReducer from "./action/actionSlice"
import layoutInfoReducer from "./layoutInfo/layoutInfoSlice"
import componentsReducer from "./components/componentsSlice"
import executionReducer from "./executionTree/executionSlice"
import cursorSlice from "./cursor/cursorSlice"
import dragShadowReducer from "./dragShadow/dragShadowSlice"
import styleReducer from "./style/cursorSlice"
import controllerReducer from "./executionController/controllerSlice"

export const appReducer = combineReducers({
  components: componentsReducer,
  action: actionReducer,
  controller:controllerReducer,
  execution: executionReducer,
  cursor: cursorSlice,
  style: styleReducer,
  dragShadow: dragShadowReducer,
  layoutInfo: layoutInfoReducer,
})

import { createSlice } from "@reduxjs/toolkit"

import { StyleInitialState } from "./styleState"
import {
  deleteStyleClassReducer, deleteThemeReducer,
  initStyleListReducer, updateAppliedTheme, updateCachedClass,
  updateCachedTheme, updateClassNameReducer, updateStyleClassReducer,
  updateThemeReducer,
  updateThemeNameReducer
} from "./styleReducer"

const styleSlice = createSlice({
  name: "style",
  initialState: StyleInitialState,
  reducers: {
    updateStyleClassReducer,
    updateThemeReducer,
    deleteThemeReducer,
    updateCachedClass,
    updateCachedTheme,
    deleteStyleClassReducer,
    initStyleListReducer,
    updateClassNameReducer,
    updateAppliedTheme,
    updateThemeNameReducer
  },
})

export const styleActions = styleSlice.actions
export default styleSlice.reducer

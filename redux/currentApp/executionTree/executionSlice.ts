import { createSlice } from "@reduxjs/toolkit"
import {
  clearLocalStorageInExecutionReducer,
  resetExecutionResultReducer,
  setDependenciesReducer,
  setExecutionDebuggerDataReducer,
  setExecutionErrorReducer,
  setExecutionResultReducer,
  setGlobalStateInExecutionReducer,
  setInGlobalStateInExecutionReducer,
  // updateExecutionStyleClassesReducer,
  setIndependenciesReducer,
  setLocalStorageInExecutionReducer,
  startExecutionReducer,
  updateCurrentPagePathReducer,
  updateExecutionByDisplayNameReducer,
  updateExecutionByMultiDisplayNameReducer,
  updateModalDisplayReducer,
  // removeExecutionStyleClasseReducer,
  // updateExecutionResultByClassNameReducer,
  // updateExecutionThemeReducer,
  // updateExecutionResultThemeReducer
} from "@/redux/currentApp/executionTree/executionReducer"
import { executionInitialState } from "@/redux/currentApp/executionTree/executionState"

const executionSlice = createSlice({
  name: "execution",
  initialState: executionInitialState,
  reducers: {
    setDependenciesReducer,
    setIndependenciesReducer,
    setExecutionResultReducer,
    setExecutionErrorReducer,
    setExecutionDebuggerDataReducer,
    startExecutionReducer,
    // updateExecutionStyleClassesReducer,
    updateExecutionByDisplayNameReducer,
    updateExecutionByMultiDisplayNameReducer,
    updateModalDisplayReducer,
    resetExecutionResultReducer,
    setGlobalStateInExecutionReducer,
    setInGlobalStateInExecutionReducer,
    clearLocalStorageInExecutionReducer,
    setLocalStorageInExecutionReducer,
    updateCurrentPagePathReducer,
    // removeExecutionStyleClasseReducer,
    // updateExecutionResultByClassNameReducer,
    // updateExecutionThemeReducer,
    // updateExecutionResultThemeReducer
  },
})

export const executionActions = executionSlice.actions
export default executionSlice.reducer

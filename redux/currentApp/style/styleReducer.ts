import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"
import {
  ClassValues,
  StyleState,
  ThemeValues, 
} from "@/redux/currentApp/style/styleState"
export const initStyleListReducer: CaseReducer<
  StyleState,
  PayloadAction<StyleState>>
  = (_, action) => {
    return action.payload
  }
  export const updateAppliedTheme:CaseReducer<
  StyleState,
  PayloadAction<string>
  > = (state,action) =>{
   state.appliedTheme = action.payload
  }
export const updateStyleClassReducer: CaseReducer<
  StyleState,
  PayloadAction<{ class: ClassValues, className: string }>
> = (state, action) => {
  const className = action.payload.className
  state.classes[className] = action.payload.class
}
export const updateThemeNameReducer:CaseReducer<
StyleState,
PayloadAction<{newThemeName:string,themeName:string}>
> = (state,action) =>{
 state.themes[action.payload.newThemeName]  =  state.themes[action.payload.themeName];
 delete state.themes.themeName
}
export const updateClassNameReducer:CaseReducer<
StyleState,
PayloadAction<{newClassName:string,className:string}>
> = (state,action) =>{
 state.classes[action.payload.newClassName]  =  state.classes[action.payload.className];
}
export const updateCachedClass: CaseReducer<
  StyleState,
  PayloadAction<ClassValues>
> = (state, action) => {
  state.cachedClass = action.payload
} 
export const deleteStyleClassReducer: CaseReducer<
  StyleState,
  PayloadAction<string>
> = (state, action) => {
  const className = action.payload
  delete state.classes[className]

}

export const updateThemeReducer: CaseReducer<
  StyleState,
  PayloadAction<{ theme: ThemeValues, themeName: string }>
> = (state, action) => {
  const themeName = action.payload.themeName
  state.themes[themeName] = action.payload.theme
}
export const updateCachedTheme: CaseReducer<
  StyleState,
  PayloadAction<ThemeValues>
> = (state, action) => {
  state.cacheTheme = action.payload
}
export const deleteThemeReducer: CaseReducer<
  StyleState,
  PayloadAction<string>
> = (state, action) => {
  const themeName = action.payload
  delete state.themes[themeName]

}


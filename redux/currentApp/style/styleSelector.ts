import { createSelector } from "@reduxjs/toolkit"
import { RootState } from "@/store"

export const getStyle = (state: RootState) => {
  return state.currentApp.style
}
export const getClaasesObject = createSelector([getStyle], (style) =>
  style.classes
)
export const getAppliedTheme = createSelector([getStyle], (style) =>
  style.themes[style.appliedTheme]
)
export const getAppliedThemeName = createSelector([getStyle], (style) =>
  style.appliedTheme
)
export const getThemesObject = createSelector([getStyle], (style) =>
  style.themes
)
export const getCachedClass = createSelector([getStyle], (style) =>
  style.cachedClass
)
export const getCachedTheme = createSelector([getStyle], (style) =>
  style.cacheTheme
)

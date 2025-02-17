/* eslint-disable @typescript-eslint/no-explicit-any */

import { createSelector } from "@reduxjs/toolkit"
import { RootState } from "@/store"
import { ACTION_RUN_TIME, INIT_ACTION_ADVANCED_CONFIG } from "./configReducer"

export const getEditorConfig = (state: RootState) => {
  return state.config
}

const isEditMode = (state: RootState) => {
  return state.config.mode === "edit" || state.config.mode === "template-edit"
}

export const isOpenLeftPanel = (state: RootState) => {
  return state.config.openLeftPanel && isEditMode(state)
}
export const isOpenMobileScreen = (state: RootState) => {
  return state.config.screen == "Mobile" && isEditMode(state)
}
export const isOpenTabletScreen = (state: RootState) => {
  return state.config.screen == "Tablet" && isEditMode(state)
}
export const isOpenDesktopScreen = (state: RootState) => {
  return state.config.screen == "Desktop" && isEditMode(state)
}

export const isOpenThemePanel = (state: RootState) => {
  return state.config.openThemePanel && isEditMode(state)
}
export const isOpenScreenPanel = (state: RootState) => {
  return state.config.openScreenPanel && isEditMode(state)
}
export const isOpenBottomPanel = (state: RootState) => {
  return state.config.openBottomPanel && isEditMode(state)
}
export const isOpenStylePanel = (state: RootState) => {
  return state.config.openStylePanel && isEditMode(state)
}
export const isOpenRightPanel = (state: RootState) => {
  return state.config.openRightPanel && isEditMode(state)
}

export const isOpenDebugger = (state: RootState) => {
  return state.config.openDebugger && isEditMode(state)
}
export const getLayoutSectionState = (state: RootState) => {
  return state.config.layoutSectionState
}
export const getPreviewEdgeWidth = (state: RootState) => {
  return state.config.mode === "edit" ? 16 : 0
}
export const getSelectedTheme = (state: RootState) => {
  return state.config.selectedThemePanel
}
export const getSelectedScreen = (state: RootState) => {
  return state.config.screen
}
export const getIsIMPAKTMode = (state: RootState) => {
  return state.config.mode
}

export const isShowDot = createSelector(
  [getEditorConfig, isEditMode],
  (editorConfig, isEditMode) => {
    return editorConfig.showDot && isEditMode
  },
)

export const getScale = (state: RootState) => {
  return state.config.scale
}

export const getSelectedComponentDisplayNames = createSelector(
  [getEditorConfig],
  (editorConfig) => {
    return editorConfig.selectedComponents
  },
)

export const getSelectedAction = (state: RootState) => {
  return state.config.selectedAction
}

export const getSelectedClass = (state: RootState) => {
  return state.config.selectedClass
}

export const getCachedAction = (state: RootState): any => {
  return state.config.cachedAction
}

export const getCachedTheme = (state: RootState): any => {
  return state.config.cacheTheme
}


export const isSelected = (state: RootState, displayName: string) => {
  return (
    state.config.selectedComponents.findIndex((value) => {
      return value == displayName
    }) != -1
  )
}

export const getExpandedKeys = (state: RootState) => {
  return state.config.expandedKeys
}

export const getCanvasShape = createSelector(
  [getEditorConfig],
  (editorConfig) => {
    return {
      canvasWidth: editorConfig.canvasWidth,
      canvasHeight: editorConfig.canvasHeight,
    }
  },
)

export const getIsOnline = (state: RootState) => {
  return state.config.isOnline
}
export const getIsGridCanvas = (state: RootState) => {
  return state.config.gridCanvas
}
export const getIsIMPAKTEditMode = (state: RootState) => {
  return state.config.mode === "edit" || state.config.mode === "template-edit"
}

export const getIsIMPAKTGuideMode = (state: RootState) => {
  return state.config.mode === "template-edit"
}

export const getIsIMPAKTPreviewMode = (state: RootState) => {
  return state.config.mode === "preview"
}

export const getIsIMPAKTProductMode = (state: RootState) => {
  return state.config.mode === "production"
}

export const getIsLikeProductMode = createSelector(
  [getEditorConfig],
  (editorConfig) => {
    return editorConfig.mode === "preview" || editorConfig.mode === "production"
  },
)

// export const getWSStatus = (state: RootState) => {
//   return state.config.wsStatus
// }

// export const getDashboardWSStatus = (state: RootState) => {
//   return state.config.wsStatus.DASHBOARD
// }

// export const getAppWSStatus = (state: RootState) => {
//   return state.config.wsStatus.APP
// }

// export const getAgentWSStatus = (state: RootState) => {
//   return state.config.wsStatus.AI_AGENT
// }

export const getHoveredComponents = createSelector(
  [getEditorConfig],
  (editorConfig) => {
    return editorConfig.hoveredComponents
  },
)

export const getCachedActionAdvancedConfig = createSelector(
  [getCachedAction],
  (cachedAction) => {
    if (
      !cachedAction ||
      !cachedAction?.config ||
      !cachedAction?.config?.advancedConfig
    ) {
      const initAdvancedConfig = INIT_ACTION_ADVANCED_CONFIG
      if (cachedAction?.triggerMode === "automate") {
        initAdvancedConfig.runtime = ACTION_RUN_TIME.APP_LOADED
      }
      return initAdvancedConfig
    }
    return cachedAction.config.advancedConfig
  },
)

export const getExpandedWidgets = createSelector(
  [getEditorConfig],
  (config) => config.expandedWidgets,
)

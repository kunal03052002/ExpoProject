import { FC,  useMemo } from "react"
import { useSelector } from "react-redux"
// import { useParams } from "react-router-dom"
import { applyViewportContainerWrapperStyle } from "./style"
import {
  getIsIMPAKTMode,
  getIsIMPAKTPreviewMode,
  getIsIMPAKTProductMode,
} from "@/redux/config/configSelector"
import { getViewportSizeSelector } from "@/redux/currentApp/components/componentsSelector"
import {
  getRootNodeExecutionResult,
} from "@/redux/currentApp/executionTree/executionSelector"

import { RenderPage } from "./components/Page/renderPage"
import { MouseHoverProvider } from "./context/mouseHoverContext"
import { MouseMoveProvider } from "./context/mouseMoveContext"

export const DotPanel: FC = () => {
  const rootExecutionProps = useSelector(getRootNodeExecutionResult)
  const mode = useSelector(getIsIMPAKTMode)
  const isProductionMode = useSelector(getIsIMPAKTProductMode)
  const viewportSize = useSelector(getViewportSizeSelector)
  const isPreviewMode = useSelector(getIsIMPAKTPreviewMode)
  const { currentPageIndex, pageSortedKey, homepageDisplayName } = rootExecutionProps
  // const { pageName } = useParams()
  const currentDisplayName = useMemo(() => {
    if (isProductionMode) {
      return (
        // pageName ||
        homepageDisplayName ||
        pageSortedKey[currentPageIndex] ||
        "page1"
      )
    } else {
      return pageSortedKey[currentPageIndex] || homepageDisplayName
    }
  }, [
    currentPageIndex,
    homepageDisplayName,
    isProductionMode,
    // pageName,
    pageSortedKey,
  ])
  if (!rootExecutionProps) return null
  return (
    <MouseHoverProvider>
      <MouseMoveProvider>
        <div
          css={applyViewportContainerWrapperStyle(
            mode,
            isPreviewMode ? viewportSize.viewportWidth : undefined,
            isPreviewMode ? viewportSize.viewportHeight : undefined,
          )}
        >
          <RenderPage
            key={currentDisplayName}
            currentPageDisplayName={currentDisplayName}
          />
        </div>
      </MouseMoveProvider>
    </MouseHoverProvider>
  )
}

DotPanel.displayName = "DotPanel"

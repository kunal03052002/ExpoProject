import { FC } from "react"
import { useSelector } from "react-redux"
// import { useParams } from "react-router-dom"
import RenderComponentCanvasContainer from "@/page/app/components/dotPanel/components/Canvas/renderComponentCanvasContainer"
import { EmptyState } from "@/page/app/components/dotPanel/components/Page/emptyState"
import { BASIC_CANVAS_PADDING } from "@/page/app/components/dotPanel/constant/canvas"
import { getCurrentDisplayName } from "@/page/app/components/dotPanel/hooks/sectionUtils"
import { getIsIMPAKTProductMode } from "@/redux/config/configSelector"
import { getCurrentPageBodySection } from "@/redux/currentApp/executionTree/executionSelector"
import { containerWrapperStyle } from "../style"
import { RenderSectionProps } from "./interface"
import { bodySectionWrapperStyle } from "./style"
export const RenderBodySection: FC<RenderSectionProps> = (props) => {
  const { columnNumber,isGridCanvas} = props
  // const { viewPath } = useParams()
  const isProductionMode = useSelector(getIsIMPAKTProductMode)
  const bodySection = useSelector(getCurrentPageBodySection)
  if (!bodySection) return null

  const {
    viewSortedKey,
    currentViewIndex,
    defaultViewKey,
    sectionViewConfigs,
    style,
  } = bodySection
  const { padding, background =  "white"  } = style ?? {}
  const currentViewDisplayName = getCurrentDisplayName(
    sectionViewConfigs,
    viewSortedKey,
    defaultViewKey,
    isProductionMode,
    "",
    currentViewIndex,
  )

  const componentNode = bodySection.$childrenNode?.find(
    (node: string) => node === currentViewDisplayName,
  )
  return (
    <div css={bodySectionWrapperStyle(background)}>
      <div css={containerWrapperStyle}>
        {componentNode ? (
          
          <RenderComponentCanvasContainer
            displayName={componentNode}
            containerPadding={padding?.size ?? `${BASIC_CANVAS_PADDING}`}
            columnNumber={columnNumber}
            isRootCanvas
            isGridCanvas={isGridCanvas}
          />
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  )
}

RenderBodySection.displayName = "RenderBodySection"

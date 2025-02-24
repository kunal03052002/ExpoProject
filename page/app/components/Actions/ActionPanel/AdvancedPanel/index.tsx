import { FC } from "react"
import { AdvancedPanelSpace } from "./Components/Space"
// import { AdvancedOptionSetting } from "./Model/AdvancedOption"
import { advancedPanelStyle } from "./style"
import { TimingSetting } from "./Model/Timing"

const AdvancedPanel: FC = () => {
  return (
    <div css={advancedPanelStyle}>   
    <TimingSetting />
      <AdvancedPanelSpace />
      <AdvancedPanelSpace />
      {/* <AdvancedOptionSetting /> */}
    </div>
  )
}

AdvancedPanel.displayName = "ActionAdvancedPanel"
export default AdvancedPanel

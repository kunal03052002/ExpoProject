import { FC } from "react"
import { TipPanelProps } from "./interface"
import { 
  // linkContainerStyle,
   tipsPanelContainerStyle } from "./style"

export const TipPanel: FC<TipPanelProps> = (props) => {
console.log(props)
  // const { t } = useTranslation()
  return (
    <div css={tipsPanelContainerStyle}>

    </div>
  )
}

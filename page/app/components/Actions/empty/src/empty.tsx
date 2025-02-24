import { forwardRef, useContext } from "react"

import { applyDescriptionStyle, applyEmptyContainerStyle } from "./style"
import { EmptyProps } from "./interface"
import { ConfigProviderContext, ConfigProviderProps } from "@/utils/configProvider"
import { globalColor } from "@/utils/colorBuilder"
import { applyBoxStyle, deleteCssProps } from "@/utils/model/src"
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
export const Empty = forwardRef<HTMLDivElement, EmptyProps>((props, ref) => {
  const configProviderProps = useContext<ConfigProviderProps>(
    ConfigProviderContext,
  )
  const locale = configProviderProps?.locale?.empty ?? def.empty

  const {
    icon = (
      <ErrorOutlineIcon
        
        sx={{color:globalColor(`grayBlue-04`),fontSize:"48px"}}
      />
    ),
    imgSrc,
    divideSize = "16px",
    paddingVertical = "23px",
    description = locale["noData"],
    ...rest
  } = props

  return (
    <div
      ref={ref}
      css={[applyEmptyContainerStyle(paddingVertical), applyBoxStyle(props)]}
      {...deleteCssProps(rest)}
    >
      <div>
        {imgSrc ? (
          <img src={imgSrc} style={{objectFit:"contain"}} width="48px" height="48px" />
        ) : (
          icon
        )}
      </div>
      <div css={applyDescriptionStyle(divideSize)}>{description}</div>
    </div>
  )
})

Empty.displayName = "Empty"

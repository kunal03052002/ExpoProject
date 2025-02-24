import { forwardRef, useContext } from "react"
import { TrProps } from "./interface"
import { TableContext } from "./table-context"
import {
  applyBgHoverStyle,
  applyNormalStyle,
  applySelectedStyle,
} from "./style"
import { applyBoxStyle, deleteCssProps } from "../model/src"

export const Tr = forwardRef<HTMLTableRowElement, TrProps>((props, ref) => {
  const { hoverable, selected, ...otherProps } = props
  const context = useContext(TableContext)

  return (
    <tr
      css={[
        applyNormalStyle(),
        applyBgHoverStyle(hoverable ?? context?.hoverable),
        applySelectedStyle(selected),
        applyBoxStyle(props),
      ]}
      ref={ref}
      {...deleteCssProps(otherProps)}
    />
  )
})

Tr.displayName = "Tr"

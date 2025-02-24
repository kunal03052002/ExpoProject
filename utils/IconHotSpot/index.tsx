import { ForwardRefRenderFunction, forwardRef } from "react"

import { IconHotSpotProps } from "./interface"
import { iconHotSpotContainerStyle } from "./style"
import { globalColor } from "../colorBuilder"

export const IconHotSpot: ForwardRefRenderFunction<
  HTMLButtonElement,
  IconHotSpotProps
> = (props, ref) => {
  const {
    children,
    iconSize = 16,
    inactiveColor = globalColor("grayBlue-04"),
    activeColor = globalColor("grayBlue-02"),
    activeBgColor = globalColor("grayBlue-09"),
    ...otherProps
  } = props

  return (
    <button
      {...otherProps}
      css={iconHotSpotContainerStyle(
        iconSize,
        activeColor,
        inactiveColor,
        activeBgColor,
      )}
      ref={ref}
    >
      {children}
    </button>
  )
}

export default forwardRef<HTMLButtonElement, IconHotSpotProps>(IconHotSpot)

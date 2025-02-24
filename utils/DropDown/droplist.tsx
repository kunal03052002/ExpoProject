import { createContext, forwardRef, MouseEvent, ReactNode } from "react"
import { DropListProps } from "./interface"
import {applyListCss, deleteCssProps } from "./style"
import { TriggerColorScheme } from "../trigger"
import { applyBoxStyle } from "../model/src/style"



export const DropListContext = createContext<{
  onClickItem?: (
    key: string | number,
    clickedNode: ReactNode,
    event: MouseEvent,
  ) => void
  hoverColorScheme?: TriggerColorScheme
}>({})

export const DropList = forwardRef<HTMLDivElement, DropListProps>(
  (props, ref) => {
    const {
      children,
      onClickItem,
      hoverColorScheme = "grayBlue",
      ...otherProps
    } = props

    return (
      <div
        ref={ref}
        css={[applyListCss(), applyBoxStyle]}
        {...deleteCssProps(otherProps)}
      >
        <DropListContext.Provider
          value={{
            onClickItem,
            hoverColorScheme,
          }}
        >
          {children}
        </DropListContext.Provider>
      </div>
    )
  },
)

DropList.displayName = "DropList"

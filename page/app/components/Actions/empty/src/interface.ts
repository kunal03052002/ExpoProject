import { BoxProps } from "@/widgetLibrary/ButtonWidget/interface"
import { ReactNode, HTMLAttributes } from "react"

export interface EmptyProps extends HTMLAttributes<HTMLDivElement>, BoxProps {
  description?: ReactNode
  divideSize?: string
  paddingVertical?: string
  icon?: ReactNode
  imgSrc?: string
}

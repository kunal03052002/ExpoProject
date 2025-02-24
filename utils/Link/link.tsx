import { forwardRef } from "react"
import { LinkProps } from "./interface"
import { applyDisable, applyLeftIcon, applyLinkContainer } from "./style"
import { css } from "@emotion/react"
import AddIcon from '@mui/icons-material/Add';
import { applyBoxStyle, deleteCssProps } from "../model/src";

export const Link = forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => {
  const {
    disabled,
    icon,
    colorScheme = "blue",
    hoverable = true,
    ...otherProps
  } = props

  const leftIcon = typeof icon == "boolean" && icon ? <AddIcon /> : icon

  const finalCss = css`
    ${applyLinkContainer(colorScheme, hoverable)};
    ${applyDisable(colorScheme, disabled)};
  `

  return (
    <a
      ref={ref}
      css={[finalCss, applyBoxStyle(props)]}
      {...deleteCssProps(otherProps)}
    >
      {leftIcon && <span css={applyLeftIcon}>{leftIcon}</span>}
      {/* <span style={{marginBottom:"30px"}}> */}
      
    </a>
  )
})
{/* {props.children}</span> */}
Link.displayName = "Link"

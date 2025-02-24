import { forwardRef } from "react"
import { ListItemMetaProps } from "./interface"
import {
  applyItemMetaAvatar,
  applyItemMetaContainer,
  applyListItemMetaTitleStyle,
  applyTypoStyle,
} from "./style"
import { applyBoxStyle, deleteCssProps } from "@/utils/model/src"
import { Avatar, Typography } from "@mui/material"
import { globalColor } from "@/utils/colorBuilder"



export const ListItemMeta = forwardRef<HTMLDivElement, ListItemMetaProps>(
  (props, ref) => {
    const { title, avatar, description, ...otherProps } = props
    return (
      <div
        css={[applyItemMetaContainer(), applyBoxStyle(props)]}
        ref={ref}
        {...deleteCssProps(otherProps)}
      >
        {avatar && (
          <Avatar
            css={applyItemMetaAvatar}
            // size="medium"
            // shape="square"
            src={avatar}
          />
        )}
        <Typography css={applyTypoStyle}>
          {title && typeof title === "string" ? (
            // <Text fs="14px" fw="500" colorScheme="gray">
            <div>
              {title}</div>
            // </Text>
          ) : (
            <div css={applyListItemMetaTitleStyle}>{title}</div>
          )}
          {title && description && <div style={{ height: "4px" }} />}
          {description && (
            <div
              // fs="14px"
              style={{
                color:title == undefined
                  ? globalColor(`grayBlue-02`)
                  : globalColor(`grayBlue-04`)
              }}
            >
              {description}
            </div>
          )}
        </Typography>
      </div>
    )
  },
)

ListItemMeta.displayName = "ListItemMeta"

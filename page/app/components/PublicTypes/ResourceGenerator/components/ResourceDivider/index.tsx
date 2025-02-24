import { TFunction } from "i18next"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { ResourceDividerProps, ResourceDividerType } from "./interface"
import { optionLabelStyle } from "./style"
import { Divider } from "@mui/material"

const getDividerContent = (type: ResourceDividerType, t: TFunction) => {
  switch (type) {
    case "Service Account":
      return t("editor.action.form.group.gs.service_account")
    case "General Option":
      return t("editor.action.resource.db.title.general_option")
    case "Advanced Option":
      return t("editor.action.resource.db.title.advanced_option")
    default:
      return t("editor.action.resource.db.title.general_option")
  }
}

export const ResourceDivider: FC<ResourceDividerProps> = (props) => {
  const { type } = props
  const { t } = useTranslation()
  const content = getDividerContent(type, t)

  return (
    <>
      <Divider
        // direction="horizontal"
        // ml="24px"
        // mr="24px"
        // mt="8px"
        // mb="8px"
        // w="unset"
      />
      <div css={optionLabelStyle}>{content}</div>
    </>
  )
}
ResourceDivider.displayName = "ResourceDivider"

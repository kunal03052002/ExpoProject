
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { getResourceNameFromResourceType } from "../../utils"
import { ResourceHeaderProps } from "./interface"
import {
  buttonContainerStyle,
  headerContainerStyle,
  headerOuterContainerStyle,
  titleContainerStyle,
  titleNameContainerStyle,
  titleNameStyle,
} from "./style"
import { Button } from "@mui/material"
import { CreateButton } from "../ConfigElements/ActionButtons/CreateButton"
import GoogleCreateButton from "../ConfigElements/ActionButtons/GoogleCreateButton"
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { getIconFromResourceType } from "../ResourceCard/utils";

export const Header: FC<ResourceHeaderProps> = (props) => {
  const { t } = useTranslation()
  const { resourceType, onClickBack } = props

  return (
    <div css={headerOuterContainerStyle}>
      <div css={headerContainerStyle}>
        <div>
          <Button
          startIcon={<ArrowBackIosIcon fontSize="small" sx={{fontSize:"8px"}} />}
            variant="text"
            type="button"
            size={"small"}
            sx={{fontSize:"13px"}}
            onClick={onClickBack}
          >
            {t("back")}
          </Button>
        </div>
        <div css={titleContainerStyle}>
          <div css={titleNameContainerStyle}>
            {getIconFromResourceType(resourceType)}
            <h1 css={titleNameStyle}>
              {getResourceNameFromResourceType(resourceType)}
            </h1>
          </div>
          <div css={buttonContainerStyle}>
            {import.meta.env.ILLA_APP_ENV === "test" &&
            resourceType === "googlesheets" ? (
              <GoogleCreateButton  />
            ) : (
              
              <CreateButton />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

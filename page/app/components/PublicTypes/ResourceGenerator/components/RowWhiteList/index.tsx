
import { FC, 
  // useCallback, useState 
} from "react"
import { useTranslation } from "react-i18next"
// import { WHITE_LIST_IP } from "../../config"
import {
  // ipListContainerStyle,
  // ipListStyle,
  // whiteListButtonContainerStyle,
  // whiteListButtonStyle,
  whiteListContentContainerStyle,
  whiteListContentStyle,
  whiteListDescriptionStyle,
  // whiteListOperationIconStyle,
  whiteListTitleStyle,
} from "./style"

interface IWhiteList {
  onCopyIpReport?: () => void
}

export const WhiteList: FC<IWhiteList> = (props) => {
  const { t } = useTranslation();
  return (
    <div>
      <div css={whiteListContentContainerStyle}>
        <div css={whiteListContentStyle}>
          <div css={whiteListTitleStyle}>
            {t("editor.action.resource.tip.allowlist.title")}
          </div>
          <div css={whiteListDescriptionStyle}>
            {t("editor.action.resource.tip.allowlist.message")}
          </div>
        </div>
    
      </div>
    </div>
  )
}
WhiteList.displayName = "WhiteList"

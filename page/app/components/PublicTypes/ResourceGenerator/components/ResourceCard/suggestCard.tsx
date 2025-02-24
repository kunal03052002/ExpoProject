import { FC } from "react"
import { useTranslation } from "react-i18next"
import CommentIcon from '@mui/icons-material/Comment';
import { applyItemStyle, nameStyle, titleContainerStyle } from "./style"

export const SuggestResourceCard: FC = () => {
  const { t } = useTranslation()
  return (
    <div
      css={applyItemStyle}
      onClick={() => {
        window.open(
          "https://www.act21.io/",
          "_blank",
        )
      }}
    >
   <CommentIcon fontSize="small"/>
      <div css={titleContainerStyle}>
        <div css={nameStyle}>{t("editor.action.form.option.tell_us")}</div>
      </div>
    </div>
  )
}

SuggestResourceCard.displayName = "SuggestResourceCard"

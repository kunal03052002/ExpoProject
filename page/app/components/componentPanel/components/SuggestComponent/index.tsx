import { FC } from "react"
// import { useTranslation } from "react-i18next"
import {
  // columnSessionTitleStyle,
  columnSuggestComponentContainerStyle,
  rowSuggestComponentContainerStyle,
  // sessionTitleStyle,
} from "./style"

export const RowSuggestComponent: FC = () => {
  // const { t } = useTranslation()
  return (
    <div css={rowSuggestComponentContainerStyle}>
      {/* <h6 css={sessionTitleStyle}>{t("editor.action.form.title.feedback")}</h6> */}
      {/* <Button
        leftIcon={<CommentIcon />}
        colorScheme="grayBlue"
        variant="outline"
        onClick={clickSuggest}
      >
        {t("editor.action.form.option.tell_us")}
      </Button> */}
    </div>
  )
}

export const ColumnSuggestComponent: FC = () => {
  // const { t } = useTranslation()
  return (
    <div css={columnSuggestComponentContainerStyle}>
      {/* <h6 css={columnSessionTitleStyle}>
        {t("editor.action.form.title.feedback")}
      </h6>
      <Button
        leftIcon={<CommentIcon />}
        colorScheme="grayBlue"
        variant="outline"
        onClick={clickSuggest}
      >
        {t("editor.action.form.option.tell_us")}
      </Button> */}
    </div>
  )
}

import { FC } from "react"
// import { useTranslation } from "react-i18next"
import { emptyContainerStyle } from "./style"

export const EmptyState: FC = () => {
  return <div css={emptyContainerStyle}>empty</div>
}

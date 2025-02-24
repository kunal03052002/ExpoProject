import { FC } from "react"

import { pageLoadingStyle } from "./style"

export const PageLoading: FC = () => {
  return (
    <div css={pageLoadingStyle}>
  
       Loading...
    </div>
  )
}

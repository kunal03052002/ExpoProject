import { FC, HTMLAttributes, useCallback, useState } from "react"
import { SearchHeader } from "@/page/app/components/Actions/SearchHeader"
import { ActionListWithNewButton } from "./listWithNewButton"
import { searchHeaderContainerStyle } from "./style"

export const ActionList: FC<HTMLAttributes<HTMLDivElement>> = (props) => {
  const { className } = props

  const [searchActionValue, setSearchActionValue] = useState("")

  const handleOnSearch = useCallback((value: string) => {
    setSearchActionValue(value)
  }, [])

  return (
    <div className={className} css={searchHeaderContainerStyle}>
      <SearchHeader onSearch={handleOnSearch} />
      <ActionListWithNewButton searchActionValue={searchActionValue} />
    </div>
  )
}

ActionList.displayName = "ActionList"

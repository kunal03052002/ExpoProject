/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react"
import { useSelector } from "react-redux"
import { ShadowPreview } from "./Shadow"
import { DragShadowPreviewProps } from "./interface"
import { getDragShadowInfoArray } from "@/redux/currentApp/dragShadow/dragShadowSelector"

export const DragShadowPreview: FC<DragShadowPreviewProps> = (props) => {
  const { unitW, parentDisplayName, columns } = props

  const dragShadowInfoArray:any = useSelector(getDragShadowInfoArray)

  return (
    <>
      {dragShadowInfoArray.map((item:any) => {
        const currentItem = item[0]
        return (
          currentItem?.parentDisplayName === parentDisplayName && (
            <ShadowPreview
              key={currentItem.userID}
              x={currentItem.rectX}
              y={currentItem.rectY}
              landingX={currentItem.rectW}
              landingY={currentItem.rectH}
              unitW={unitW}
              displayNames={currentItem.displayNames}
              userID={currentItem.userID}
              status={currentItem.status}
              parentDisplayName={currentItem.parentDisplayName}
              columns={columns}
              integerPartX={currentItem.xInteger}
              integerPartY={currentItem.yInteger}
              decimalPartX={currentItem.xMod}
              decimalPartY={currentItem.yMod}
              nickname={currentItem.nickname}
            />
          )
        )
      })}
    </>
  )
}

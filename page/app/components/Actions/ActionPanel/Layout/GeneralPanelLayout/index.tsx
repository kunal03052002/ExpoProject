import { FC } from "react"
import { ActionEventHandler } from "@/page/app/components/Actions/ActionPanel/ActionEventHandler"
import PanelHeader from "@/page/app/components/Actions/ActionPanel/PanelHeader"
import { NO_EVENT_HANDLER } from "./constants"
import { GeneralPanelLayoutProps } from "./interface"
import {
  actionContainerStyle,
  headerOptionContainerStyle,
  headerOptionTitleStyle,
  // spaceStyle,
} from "./style"

const MockPanelHeader: FC = () => {
  return (
    <>
      <div css={headerOptionContainerStyle}>
        <span css={headerOptionTitleStyle}>
         
        </span>

      </div>
      {/* <Space w="100%" h="8px" css={spaceStyle} disp="block" /> */}
    </>
  )
}

const DataPanelHeader: FC<Pick<GeneralPanelLayoutProps, "actionType">> = ({
  actionType,
}) => {
  switch (actionType) {
    case "transformer":
    case "globalData":
      return null
    default: {
      return <PanelHeader />
    }
  }
}

const GeneralPanelLayout: FC<GeneralPanelLayoutProps> = ({
  actionType,
  mockEnabled,
  children,
}) => {
  if (!actionType) return null
  return (
    <>
      {/* {!NO_OPTIONS_HEADER.includes(actionType) && (
        <div>Header</div>
      )} */}
      <div css={actionContainerStyle}>
        {mockEnabled ? (
          <MockPanelHeader />
        ) : (
          <DataPanelHeader actionType={actionType} />
        )}
        {children}
        {!NO_EVENT_HANDLER.includes(actionType) && <ActionEventHandler />}
      </div>
    </>
  )
}

export default GeneralPanelLayout

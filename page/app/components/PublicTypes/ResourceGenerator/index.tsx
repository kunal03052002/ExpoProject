/* eslint-disable react-refresh/only-export-components */
import { FC,
  //  useContext, useEffect, 
   useState } from "react"
// import { useTranslation } from "react-i18next"
import { ResourceCreator } from "./components/ResourceCreator"
import { ResourceTypeSelector } from "./components/ResourceTypeSelector"
// import { ACTION_MODAL_WIDTH } from "./config"
import { ResourceCreatorPage, ResourceGeneratorProps } from "./interface"
// import { modalContentStyle } from "./style"
import { Modal } from "@/utils/model/src/modal"
import { ResourceType } from "../resource"
import { modalContentStyle } from "./components/ActionGenerator/style"
export * from "./components/ResourceTypeSelector"
export * from "./components/ActionGenerator"
export * from "./components/ResourceCreator"
export * from "./components/ResourceCreatePanel"
export * from "./provider"
export * from "./utils"
export * from "./config"
//  const m
export const ResourceGenerator: FC<ResourceGeneratorProps> = (props) => {
  const { visible, onClose, filterResourceType, defaultConfig } = props
  const [currentStep, setCurrentStep] = useState<ResourceCreatorPage>(
    defaultConfig?.defaultStep ?? "select",
  )
  // const { track } = useContext(MixpanelTrackContext)

  const [currentResource, setCurrentResource] = useState<ResourceType | null>(
    defaultConfig?.defaultResourceType ?? null,
  )

  const onCancel = () => {
    onClose()
    setCurrentStep("select")
    setCurrentResource(null)
  }

  // const { t } = useTranslation();

  let title
  switch (currentStep) {
    case "select":
      // title = t("editor.action.form.title.select")
      break
  }
  const isMaskCloseable = currentStep === "select"

  return (
    <Modal
      // w={`${ACTION_MODAL_WIDTH}px`}
      visible={visible}
      footer={false}
      closable
      maskClosable={isMaskCloseable}
      withoutLine
      withoutPadding
      title={title}
      onCancel={onCancel}
    >
      <div
       css={modalContentStyle}
       >
        {currentStep === "select" && (
          <ResourceTypeSelector
            onSelect={(resourceType) => {
              setCurrentStep("createResource")
              setCurrentResource(resourceType)
              // track?.(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
              //   element: "resource_type_modal_resource",
              //   parameter5: resourceType,
              // })
            }}
            filterResourceType={filterResourceType}
          />
        )}
        {currentStep === "createResource" && currentResource != null && (
          <ResourceCreator
            onBack={() => {
              if (defaultConfig?.canBack ?? true) {
                setCurrentStep("select")
                setCurrentResource(null)
              } else {
                onCancel()
              }
            }}
            resourceType={currentResource}
          />
        )}
      </div>
    </Modal>
  )
}

ResourceGenerator.displayName = "ResourceGenerator"

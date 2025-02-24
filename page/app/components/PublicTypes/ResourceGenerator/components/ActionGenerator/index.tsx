import { FC, useCallback, useContext, useEffect, useState } from "react";

import { ACTION_MODAL_WIDTH } from "../../config";
import { ResourceGeneratorContext } from "../../provider";
import { ResourceCreator } from "../ResourceCreator";
import { ResourceTypeSelector } from "../ResourceTypeSelector";
import { ActionResourceSelector } from "./ActionResourceSelector";
import { ModalHeader } from "./Header";
import { ActionCreatorPage, ActionGeneratorProps } from "./interface";
import { modalContentStyle } from "./style";
import { ActionType } from "@/redux/currentApp/action/interface";
import { Modal } from "@/utils/model/src/modal";
import { ResourceType } from "../../../resource";
import { useTranslation } from "react-i18next";

export const ActionGenerator: FC<ActionGeneratorProps> = function (props) {
  const {
    visible,
    onClose,
    defaultStep = "select",
    defaultActionType = null,
    canBackToSelect = true,
    handleDirectCreateAction,
    // handleCreateAgentAction,
    filterResourceType,
  } = props;
  const [currentStep, setCurrentStep] =
    useState<ActionCreatorPage>(defaultStep);

  const [currentActionType, setCurrentActionType] = useState<ActionType | null>(
    defaultActionType
  );
  const { t } = useTranslation();
  const { getResourceByType } = useContext(ResourceGeneratorContext);

  useEffect(() => {
    if (currentStep === "createAction") {
      if (getResourceByType(currentActionType as ResourceType).length === 0) {
        setCurrentStep("createResource");
      }
    }
  }, [currentStep, currentActionType, getResourceByType]);
  const handleBack = useCallback(
    (page: ActionCreatorPage) => {
      // track?.(
      //   ILLA_MIXPANEL_EVENT_TYPE.CLICK,
      //   {
      //     element: "resource_configure_back",
      //     parameter5: currentActionType,
      //   },
      //   "both",
      // )
      setCurrentStep(page);
    },
    [
      // track,
      // currentActionType
    ]
  );

  const handleCancelModal = useCallback(() => {
    onClose();
    setCurrentStep("select");
    setCurrentActionType(null);
  }, [
    // currentStep,
    onClose,
    //  track,
    // currentActionType
  ]);

  const handleActionTypeSelect = useCallback(
    (actionType: ActionType) => {
      setCurrentStep("createAction");
      setCurrentActionType(actionType);
    },
    []
  );

  const handleCreateResource = useCallback((actionType: ActionType) => {
    setCurrentActionType(actionType);
    setCurrentStep("createResource");
  }, []);

  const handleCreateAction = useCallback(() => {
    setCurrentStep("select");
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (currentStep === "createResource" && currentActionType && visible) {
      // track?.(
      //   ILLA_MIXPANEL_EVENT_TYPE.SHOW,
      //   {
      //     element: "resource_configure_modal",
      //     parameter5: currentActionType,
      //   },
      //   "both",
      // )
    }
  }, [
    currentStep,
    // track,
    currentActionType,
    visible,
  ]);

  useEffect(() => {
    if (currentStep === "select" && visible) {
      // track?.(
      //   ILLA_MIXPANEL_EVENT_TYPE.SHOW,
      //   {
      //     element: "resource_type_modal",
      //     parameter5: currentActionType,
      //   },
      //   "both",
      // )
    }
  }, [
    currentStep,
    // track,
    currentActionType,
    visible,
  ]);

  const isMaskClosable = currentStep !== "createResource";

  return (
    <Modal
      w={`${ACTION_MODAL_WIDTH}px`}
      visible={visible}
      footer={false}
      closable
      maskClosable={isMaskClosable}
      withoutLine
      withoutPadding
      onCancel={handleCancelModal}
      focusLock={false}
    >
      <div css={modalContentStyle}>
        {currentStep === "select" && (
          <>
            <ModalHeader
              title={t(
                "editor.action.action_list.action_generator.selector.title"
              )}
              onClickClose={handleCancelModal}
            />
            <ResourceTypeSelector
              onSelect={handleActionTypeSelect}
              filterResourceType={filterResourceType}
            />
          </>
        )}
        {currentStep === "createAction" && currentActionType && (
          <>
            <ModalHeader
              title={t(
                "editor.action.action_list.action_generator.title.choose_resource"
              )}
              onClickClose={handleCancelModal}
            />
            <ActionResourceSelector
              actionType={currentActionType}
              onBack={handleBack}
              handleCreateAction={handleDirectCreateAction}
              onCreateResource={handleCreateResource}
              onCreateAction={handleCreateAction}
              canBack={canBackToSelect}
              onClose={onClose}
            />
          </>
        )}
        {currentStep === "createResource" && currentActionType && (
          <ResourceCreator
            resourceType={currentActionType as ResourceType}
            onBack={handleBack}
          />
        )}
      </div>
    </Modal>
  );
};

ActionGenerator.displayName = "ActionGenerator";

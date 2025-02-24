import { FC, memo, useState } from "react";
import { useTranslation } from "react-i18next";
import ActionPanelSection from "./components/ActionSection";
import {
  MORE_DATA_TYPE_SELF_HOST,
  // RECOMMEND_RESOURCES_CLOUD,
  RECOMMEND_RESOURCES_SELF_HOST,
} from "./constans";
import {
  guidePanelContainerStyle,
  guidePanelOutContainerStyle,
  loadingContainerStyle,
} from "./style";

const ActionGuidePanel: FC = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <div css={guidePanelOutContainerStyle}>
        <div css={guidePanelContainerStyle}>
          <>
            <ActionPanelSection
              title={t("editor.action.panel.label.general.connect-data-source")}
              actionTypes={RECOMMEND_RESOURCES_SELF_HOST}
              changeLoading={setIsLoading}
              hasMore
            />
            <ActionPanelSection
              title={t("editor.action.panel.label.general.more-type")}
              actionTypes={MORE_DATA_TYPE_SELF_HOST}
              changeLoading={setIsLoading}
              hasMore={false}
            />
          </>

          {isLoading && (
            <div css={loadingContainerStyle}>
              <div>Loading</div>
              {/* <Loading colorScheme="techPurple" /> */}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default memo(ActionGuidePanel);

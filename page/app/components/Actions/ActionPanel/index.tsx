/* eslint-disable @typescript-eslint/no-explicit-any */
import { Suspense, lazy } from "react";
import { FC, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { ActionResult } from "@/page/app/components/Actions/ActionPanel/ActionResult";
import {
  actionContentStyle,
  actionPanelContainerStyle,
  actionPanelStyle,
  outterActionContainerStyle,
} from "@/page/app/components/Actions/ActionPanel/style";
import {
  getCachedAction,
  getSelectedAction,
} from "@/redux/config/configSelector";
import ActionMockPanel from "./ActionMockPanel";
import GeneralPanelLayout from "./Layout/GeneralPanelLayout";
import { INIT_ACTION_MOCK_CONFIG } from "../../publicConfig/action";
import { ActionTitleBar } from "./ActionTitleBar";

const AdvancedPanel = lazy(
  () => import("@/page/app/components/Actions/ActionPanel/AdvancedPanel")
);
const RestApiPanel = lazy(
  () => import("@/page/app/components/Actions/ActionPanel/RestApiPanel")
);
const GlobalDataPanel = lazy(
  () => import("@/page/app/components/Actions/ActionPanel/GlobalDataPanel")
);
const TransformerPanel = lazy(
  () => import("@/page/app/components/Actions/ActionPanel/TransformerPanel")
);
const ImpaktAppsPanel = lazy(
  () => import("@/page/app/components/Actions/ActionPanel/ImpaktAppsPanel")
);
export const ActionPanel: FC = () => {
  const cachedAction: any = useSelector(getCachedAction);
  const selectedAction: any = useSelector(getSelectedAction)!;

  const [resultVisible, setResultVisible] = useState(false);
  const [activeKey, setActiveKey] = useState("general");
  const mockConfig =
    cachedAction?.config?.mockConfig ?? INIT_ACTION_MOCK_CONFIG;
  const panel = useMemo(() => {
    switch (cachedAction?.actionType) {
      case "restapi":
        return <RestApiPanel />;
      case "globalData":
        return <GlobalDataPanel />;
      case "transformer":
        return <TransformerPanel />;
      case "impaktapps":
        return <ImpaktAppsPanel />;
      default:
        return <></>;
    }
  }, [cachedAction]);

  if (!cachedAction) {
    return <></>;
  }

  return (
    <div css={actionPanelStyle}>
      <div css={actionPanelContainerStyle}>
        <ActionTitleBar
          onResultVisibleChange={(visible) => {
            setResultVisible(visible);
          }}
          openState={resultVisible}
          activeTab={activeKey}
          handleChangeTab={(active) => setActiveKey(active)}
        />
        <Suspense
          fallback={<div css={outterActionContainerStyle}>Loading</div>}
        >
          {activeKey === "general" && (
            <div css={outterActionContainerStyle}>
              <GeneralPanelLayout
                actionType={cachedAction?.actionType}
                mockEnabled={mockConfig?.enabled}
              >
                {mockConfig?.enabled ? (
                  <ActionMockPanel
                    enableForReleasedApp={mockConfig.enableForReleasedApp}
                    mockData={mockConfig.mockData}
                  />
                ) : (
                  <div css={actionContentStyle}>{panel}</div>
                )}
              </GeneralPanelLayout>
            </div>
          )}
          {activeKey === "advanced" && <AdvancedPanel />}
        </Suspense>
        {resultVisible && (
          <ActionResult
            key={selectedAction?.actionID}
            visible={resultVisible}
            onClose={() => {
              setResultVisible(false);
            }}
          />
        )}
      </div>
    </div>
  );
};

ActionPanel.displayName = "ActionPanel";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
// import {
//   isOpenBottomPanel,
//   isOpenDebugger,
//   isOpenLeftPanel,
//   isOpenRightPanel,
//   isOpenScreenPanel,
//   isOpenStylePanel,
//   isOpenThemePanel,
// } from "@/redux/config/configSelector";
import {
  centerPanelStyle,
  contentStyle,
  editorContainerStyle,
  middlePanelStyle,
  navbarStyle,
} from "./style";
import { PageNavBar } from "./module/PageNavBar";
import { CanvasPanel } from "./module/CanvasPanel";
// import { useResize } from "./components/scaleSquare/components/ResizingAndDragContainer/ResizeHandler/hooks";
// import { Unsubscribe } from "redux";
// import { setupExecutionListeners } from "@/redux/currentApp/executionTree/executionListener";
// import { startAppListening } from "@/store";
// import { setupLayoutInfoListeners } from "@/redux/currentApp/layoutInfo/layoutInfoListener";
// import { setupComponentsListeners } from "@/redux/currentApp/components/componentsListener";
// import { setupConfigListeners } from "@/redux/config/configListener";
// import ComponentsManager from "./module/ComponentManager";
import { TriggerProvider } from "@/utils/trigger/trigger-provider";
// import LeftPanel from "./module/LeftPanel";
// import { Shortcut } from "@/utils/shortcut";
// import { ActionEditor } from "./module/ActionEditor";
// import { useInitBuilderApp } from "@/hooks/useInitApp";
// import CircularProgress from "@mui/material/CircularProgress";
// import { Backdrop } from "@mui/material";
// import { setupActionListeners } from "@/redux/currentApp/action/actionListener";
// import { StyleEditor } from "./module/StyleEditor";
// import { ThemeEditor } from "./module/ThemeEditor";
// import { ScreenEditor } from "./module/ScreenEditor";
export const Editor: FC = (props:any) => {
//   const showRightPanel = useSelector(isOpenRightPanel);
//   const showBottomPanel = useSelector(isOpenBottomPanel);
//   const showDebugger = useSelector(isOpenDebugger);
//   const showStyle = useSelector(isOpenStylePanel);
//   const isOpenTheme = useSelector(isOpenThemePanel);
//   const isOpenScreen = useSelector(isOpenScreenPanel);
//   const showLeftPanel = useSelector(isOpenLeftPanel);
//   const [, resizeDropRef] = useResize();
//   useEffect(() => {
//     const subscriptions: Unsubscribe[] = [
//       setupLayoutInfoListeners(startAppListening),
//       setupComponentsListeners(startAppListening),
//       setupActionListeners(startAppListening),
//       setupConfigListeners(startAppListening),
//       setupExecutionListeners(startAppListening),
//     ];
//     return () => subscriptions.forEach((unsubscribe) => unsubscribe());
//   }, []);
  // const loadingState = false;
//    const { loadingState } = useInitBuilderApp("edit",props);
  return (
    <>
      {/* <Backdrop 
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loadingState}
      >
        <CircularProgress color="inherit" />
      </Backdrop> */}
      {/* <Shortcut> */}
        {/* <div css={editorContainerStyle} ref={resizeDropRef}> */}
          <PageNavBar css={navbarStyle} />
          <div css={contentStyle}>
            {/* {showLeftPanel ? <LeftPanel /> : null} */}
            <div css={middlePanelStyle}>
              <TriggerProvider renderInBody zIndex={10}>
                <CanvasPanel css={centerPanelStyle} />
              </TriggerProvider>
              {/* <TriggerProvider renderInBody zIndex={10}>
                {showBottomPanel && !showDebugger && !showStyle ? (
                  <ActionEditor />
                ) : null}
                {showBottomPanel && showStyle ? <StyleEditor /> : null}
              </TriggerProvider> */}
            </div>

            {/* {showRightPanel && (
              <TriggerProvider renderInBody zIndex={10}>
                <ComponentsManager />
              </TriggerProvider>
            )}
            
            {isOpenTheme && <ThemeEditor />}
            {isOpenScreen && <ScreenEditor />} */}
          </div>
        {/* </div> */}
      {/* </Shortcut> */}
    </>
  );
};

export default Editor;

Editor.displayName = "Editor";

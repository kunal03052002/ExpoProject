import { FC, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  // getIsGridCanvas,
  getIsIMPAKTEditMode,
} from "@/redux/config/configSelector";
// @assets/act21Icon.svg
import { ReactComponent as Act21Logo } from "@/assets/Act21Icon.svg";
// import { configActions } from "@/redux/config/configSlice";
import {
  descriptionStyle,
  informationStyle,
  navBarStyle,
  rightContentStyle,
  rowCenter,
  viewControlStyle,
} from "./style";
import { Button, IconButton } from "@mui/material";
import { PageNavBarProps } from "./interface";
import { WindowIcons } from "./WindowIcons";
// import { getActionList } from "@/redux/currentApp/action/actionSelector";
// import { getComponentMap } from "@/redux/currentApp/components/componentsSelector";
import { createNotification } from "@/utils/Notification";
import axios from "axios";
import { globalColor } from "@/utils/colorBuilder";
import Preview from "@mui/icons-material/SettingsEthernet";
import ExitPreview from "@mui/icons-material/ExitToApp";
import { ScreenIcons } from "./ScreenIcons";
import SaveIcon from "@mui/icons-material/Save";
import DeployIcon from "@mui/icons-material/CollectionsBookmark";
// import { useParams } from "react-router-dom";
// import {
//   getClaasesObject,
//   getThemesObject,
// } from "@/redux/currentApp/style/styleSelector";
export const PageNavBar: FC<PageNavBarProps> = (props) => {
  const { className } = props;
  const dispatch = useDispatch();
  const isEditMode = useSelector(getIsIMPAKTEditMode);
  // const actions = useSelector(getActionList);
  // const components = useSelector(getComponentMap);
  // const classes = useSelector(getClaasesObject);
  // const themes = useSelector(getThemesObject);
  // const { id } = useParams();
  const handlePreviewButtonClick = useCallback(() => {
    // if (isEditMode) {
    //   dispatch(configActions.updateImpaktAppsMode("preview"));
    // } else {
    //   dispatch(configActions.updateImpaktAppsMode("edit"));
    // }
  }, [dispatch, isEditMode]);

  const PreviewButton = (
    <Button
      variant="outlined"
      color="success"
      sx={{
        borderRadius: "10px",
        marginLeft: "5px",
        background: globalColor("grayBlue-09"),
        color: "black",
        fontSize: "12px",
        // padding:"1px 5px"
      }}
      startIcon={
        isEditMode ? (
          <Preview sx={{ fontSize: "12px", fontWeight: 400 }} />
        ) : (
          <ExitPreview
            sx={{
              fontSize: "12px",
              fontWeight: 300,
              fontFamily: "inter", 
              color: "#424240",
            }}
          />
        )
      }
      onClick={handlePreviewButtonClick}
    >
      {isEditMode ? "Preview" : "Exit"}
    </Button>
  );
  const saveHandler = (title?: string) => {
    // const saveData = {
    //   appInfo: {},
    //   actions: actions,
    //   components: components,
    //   style: {
    //     classes,
    //     themes,
    //     cachedClass: {},
    //     cacheTheme: {},
    //     appliedTheme: "Default_Theme",
    //   },
    //   dragShadowState: {},
    //   dottedLineSquareState: {},
    //   displayNameState: [],
    // };
    // localStorage.setItem("pageConfig", JSON.stringify(saveData));
    // axios
    //   .put(`${"http://52.183.132.161/backend"}/api/apps/${id}`, {
    //     config: saveData,
    //     app_name: id,
    //   })
    //   .then(() => {
    //     const notification = createNotification();
    //     notification.show({
    //       title: title || `Save Successfully`,
    //       duration: 1000,
    //       type: "success",
    //     });
    //   });
  };
  const SaveButton = (
    <IconButton
      color="success"
      size="small"
      title="Save Work"
      sx={{
        borderRadius: "8px",
        marginLeft: "5px",
        fontSize: "10px",
        border: `0.2px solid #498f3b`,

        color: "black",
      }}
      onClick={() => saveHandler()}
    >
      <SaveIcon color="inherit" sx={{ fontSize: "18px", padding: "-10px" }} />
    </IconButton>
  );
  const DeployButton = (
    <IconButton
      color="success"
      size="small"
      title="Deploy App"
      sx={{
        borderRadius: "8px",
        marginLeft: "5px",
        fontSize: "10px",
        border: `0.4px solid #498f3b`,

        color: "black",
      }}
      onClick={() => {
        saveHandler("Deploy Seccessfully");
        // window.open(`${
        //     "http://52.183.132.161"
        //   // "http://localhost:3000"
        //   // window.appConfig.deployHost
        // }/app/${id}`,"_blank");
      }}
    >
      <DeployIcon color="inherit" sx={{ fontSize: "18px", padding: "-10px" }} />
    </IconButton>
  );
  return (
    <div className={className} css={navBarStyle}>
      <div css={rowCenter}>
        <div style={{ width: "80px", height: "80px", marginTop: "20px" }}>
          <Act21Logo style={{ width: "100%", height: "100%" }} />
        </div>
        <div css={informationStyle} style={{ marginLeft: "-30px" }}>
          ImpaktApps UiBuilder
          <div css={descriptionStyle}>New Way of Web Development</div>
        </div>
      </div>
      <div css={viewControlStyle()}>
        {isEditMode && (
          <div
            style={{
              border: "1px solid gray",
              width: "80px",
              justifyContent: "center",
              borderRadius: "5px",
              marginRight: "10px",
            }}
          >
            <WindowIcons />
          </div>
        )}
        {isEditMode && (
          <div
            style={{
              border: "1px solid gray",
              width: "80px",
              justifyContent: "space-around",
              // paddingLeft:"4px",

              borderRadius: "5px",
            }}
          >
            <ScreenIcons />
          </div>
        )}
      </div>
      <div css={rightContentStyle}>
        {/* {GridContainerButton} */}
        {PreviewButton}
        {isEditMode && SaveButton}
        {isEditMode && DeployButton}
      </div>
    </div>
  );
};

PageNavBar.displayName = "PageNavBar";

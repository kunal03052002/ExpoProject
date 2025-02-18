import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as DesktopIcon } from "@assets/Desktop.svg";
import { ReactComponent as MobileIcon } from "@assets/Mobile.svg";
import { ReactComponent as TabletIcon } from "@assets/Tablet.svg";
import {
  isOpenMobileScreen,
  isOpenDesktopScreen,
  isOpenTabletScreen,
} from "@/redux/config/configSelector";
import { configActions } from "@/redux/config/configSlice";
import { windowIconBodyStyle, windowIconStyle } from "./style";

export const ScreenIcons = () => {
  const dispatch = useDispatch();

  const isDesktopVisible = useSelector(isOpenDesktopScreen);
  const isTabletVisible = useSelector(isOpenTabletScreen);
  const isMobileVisible = useSelector(isOpenMobileScreen);

  const handleClickDesktopIcon = useCallback(() => {
    dispatch(configActions.updateSelectedScreen("Desktop"));
  }, [dispatch]);
  const handleClickTabletIcon = useCallback(() => {
    dispatch(configActions.updateSelectedScreen("Tablet"));
  }, [dispatch]);
  const handleMobileIcon = useCallback(() => {
    dispatch(configActions.updateSelectedScreen("Mobile"));
  }, [dispatch]);

  return (
    <div
      style={{
        pointerEvents: "auto",
      }}
    >
      <span css={windowIconBodyStyle} onClick={handleClickDesktopIcon}>
         {/* <DesktopIcon style={{ width: "100%", height: "100%" }} /> */}
        <DesktopIcon css={windowIconStyle(isDesktopVisible)}  />
      </span>
      <span css={windowIconBodyStyle} onClick={handleClickTabletIcon}>
        <TabletIcon css={windowIconStyle(isTabletVisible)} />
      </span>
      <span css={windowIconBodyStyle} onClick={handleMobileIcon}>
        <MobileIcon css={windowIconStyle(isMobileVisible)} />
      </span>
    </div>
  );
};

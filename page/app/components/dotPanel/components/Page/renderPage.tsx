import { FC, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useMeasure from "react-use-measure";
import { DEFAULT_BODY_COLUMNS_NUMBER } from "@/page/app/components/dotPanel/constant/canvas";
import { getCanvasShape, getIsIMPAKTMode } from "@/redux/config/configSelector";
import { configActions } from "@/redux/config/configSlice";
import {
  getCurrentPageExecutionResult,
  getPageLoadingActions,
} from "@/redux/currentApp/executionTree/executionSelector";
import store from "@/store";
import { PageLoading } from "../PageLoading/pageLoading";
import { RenderBodySection } from "../Section";
import { RenderPageProps } from "./interface";
import {
  applyCanvasContainerWrapperStyle,
  pageContainerWrapperStyle,
} from "./style";
import {
  IExecutionActions,
  runActionWithDelay,
  runActionWithExecutionResult,
} from "@/utils/action/runAction";
export const RenderPage: FC<RenderPageProps> = (props) => {
  const { currentPageDisplayName } = props;
  const containerWrapperRef = useRef<HTMLDivElement>(null);
  const [containerRef, bounds] = useMeasure();
  const canvasShape = useSelector(getCanvasShape);
  const mode = useSelector(getIsIMPAKTMode);
  const dispatch = useDispatch();
  const pageNode = useSelector(getCurrentPageExecutionResult);
  const { canvasSize, canvasWidth, bottomHeight, bodyColumns } = pageNode;
  useLayoutEffect(() => {
    if (
      canvasShape.canvasHeight !== bounds.height ||
      canvasShape.canvasWidth !== bounds.width
    ) {
      dispatch(
        configActions.updateCanvasShapeReducer({
          canvasHeight: bounds.height,
          canvasWidth: bounds.width,
        })
      );
    }
  }, [
    bounds.height,
    bounds.width,
    canvasShape.canvasHeight,
    canvasShape.canvasWidth,
    dispatch,
  ]);

  useLayoutEffect(() => {
    if (bounds.width <= 0) return;
    const bodyWidth = bounds.width;
    const bodyTop = 0;
    const bodyLeft = 0;
    const bodyHeight = bounds.height;

    sessionStorage.setItem("bodyWidth", `${bodyWidth}`);
    const containerWrapperStyle: CSSStyleDeclaration | undefined =
      containerWrapperRef.current?.style;
    if (containerWrapperStyle) {
      containerWrapperStyle.setProperty(
        "--ImpaktApps-canvas-body-width",
        `${bodyWidth}px`
      );
      containerWrapperStyle.setProperty(
        "--ImpaktApps-canvas-body-left",
        `${bodyLeft}px`
      );
      containerWrapperStyle.setProperty(
        "--ImpaktApps-canvas-body-top",
        `${bodyTop}px`
      );
      containerWrapperStyle.setProperty(
        "--ImpaktApps-canvas-body-height",
        `${bodyHeight}px`
      );
    }
  }, [bottomHeight, bounds, canvasSize]);

  const [isPageLoading, setIsPageLoading] = useState(false);
  useEffect(() => {
    const abortController = new AbortController();
    const rootState = store.getState();
    const pageLoadingActions = getPageLoadingActions(rootState);
    const currentPageActions = pageLoadingActions.filter((action) =>
      action.config?.advancedConfig.pages.includes(currentPageDisplayName)
    );
    const canShowPageActions = currentPageActions.filter(
      (action) => action?.config.advancedConfig.displayLoadingPage
    );
    if (canShowPageActions.length > 0) {
      setIsPageLoading(true);
    }
    const requests = currentPageActions.map((action) => {
      if (action.config.advancedConfig.delayWhenLoaded > 0) {
        return runActionWithDelay(
          action as IExecutionActions,
          abortController.signal
        );
      } else {
        return runActionWithExecutionResult(
          action as IExecutionActions,
          true,
          abortController.signal
        );
      }
    });
    Promise.all(requests)

      .catch(() => {
        //_e
      })
      .finally(() => {
        setIsPageLoading(false);
      });

    return () => {
      abortController.abort();
    };
  }, [currentPageDisplayName]);

  if (isPageLoading) {
    return <PageLoading />;
  }

  if (!pageNode || pageNode.$widgetType !== "PAGE_NODE") return null;

  const finalCanvasWidth =
    canvasSize === "fixed" ? `${canvasWidth}px` : `${canvasWidth}%`;

  return (
    <div
      css={applyCanvasContainerWrapperStyle(finalCanvasWidth, mode)}
      ref={containerWrapperRef}
    >
      <div css={pageContainerWrapperStyle} ref={containerRef}>
        {currentPageDisplayName && (
          <RenderBodySection
            columnNumber={bodyColumns ?? DEFAULT_BODY_COLUMNS_NUMBER}
          />
        )}
      </div>
    </div>
  );
};

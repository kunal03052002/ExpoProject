import { FC, useCallback, useEffect, useMemo, useRef } from "react";
import { ContainerProps } from "@/widgetLibrary/ContainerWidget/interface";
// import { TooltipWrapper } from "@/widgetLibrary/PublicSector/TooltipWrapper"
import { ContainerEmptyState } from "./emptyState";
import { applyContainerWrapperStyle } from "./style";
import RenderChildrenCanvas from "../RenderChildrenCanvas";
import { useSelector } from "react-redux";
import { getIsGridCanvas } from "@/redux/config/configSelector";
import { getStyleMap } from "@/utils/getStyleMap";

export const ContainerWidget: FC<ContainerProps> = (props) => {
  const {
    currentIndex,
    updateComponentRuntimeProps,
    
    isClassTrue = true,
    context,
    trueClasses = [],
    falseClasses=[],
    // deleteComponentRuntimeProps,
    viewList,
    childrenNode,
    columnNumber,
    dynamicHeight = "auto",
    triggerEventHandler,
    updateComponentHeight,
    linkWidgetDisplayName,
    padding,
    displayName,
    handleUpdateMultiExecutionResult,
  } = props;
 
  const preCurrentViewIndex = useRef<number>(currentIndex);
  const isGridContainer = useSelector(getIsGridCanvas);
  useEffect(() => {
    if (typeof preCurrentViewIndex.current !== "number") {
      preCurrentViewIndex.current = currentIndex;
    }
    if (preCurrentViewIndex.current !== currentIndex) {
      triggerEventHandler("change");
      preCurrentViewIndex.current = currentIndex;
    }
  }, [currentIndex, triggerEventHandler]);

  const handleOnClick = useCallback(() => {
    triggerEventHandler("click");
  }, [triggerEventHandler]);

  const enableAutoHeight = useMemo(() => {
    switch (dynamicHeight) {
      case "auto":
        return true;
      case "limited":
        return true;
      case "fixed":
      default:
        return false;
    }
  }, [dynamicHeight]);

  const handleUpdateHeight = useCallback(
    (height: number) => {
      if (!updateComponentHeight || !enableAutoHeight) return;
      updateComponentHeight(height + 2);
    },
    [enableAutoHeight, updateComponentHeight]
  );

  const handleUpdateOriginalDSLAttrs = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (updateSlice: Record<string, any>) => {
      handleUpdateMultiExecutionResult([
        {
          displayName,
          value: updateSlice,
        },
      ]);
      if (linkWidgetDisplayName && linkWidgetDisplayName.length > 0) {
        const curUpdateSlice = linkWidgetDisplayName.map((name) => ({
          displayName: name,
          value: updateSlice,
        }));

        handleUpdateMultiExecutionResult(curUpdateSlice);
      }
    },
    [displayName, handleUpdateMultiExecutionResult, linkWidgetDisplayName]
  );

  useEffect(() => {
    updateComponentRuntimeProps?.({
      setCurrentViewKey: (key: string) => {
        const index = viewList.findIndex((viewItem) => viewItem.key === key);
        if (index === -1) return;
        handleUpdateOriginalDSLAttrs({
          currentIndex: index,
          currentKey: key,
        });
      },
      setCurrentViewIndex: (index: string) => {
        const numberIndex = parseInt(index);
        const view = viewList[numberIndex];
        if (!view) return;
        handleUpdateOriginalDSLAttrs({
          currentIndex: numberIndex,
          currentKey: view.key,
        });
      },
      showNextView: (loop: boolean) => {
        let newCurrentIndex = currentIndex + 1;
        if (newCurrentIndex >= viewList.length) {
          if (!loop) return;
          newCurrentIndex = 0;
        }
        const currentView = viewList[newCurrentIndex];
        handleUpdateOriginalDSLAttrs({
          currentIndex: newCurrentIndex,
          currentKey: currentView.key,
        });
      },
      showNextVisibleView: (loop: boolean) => {
        let newCurrentIndex = currentIndex + 1;
        if (newCurrentIndex >= viewList.length) {
          if (!loop) return;
          newCurrentIndex = 0;
        }
        let currentView = viewList[newCurrentIndex];
        while (currentView.hidden || currentView.disabled) {
          newCurrentIndex++;
          currentView = viewList[newCurrentIndex];
          if (newCurrentIndex >= viewList.length) {
            if (!loop) return;
            newCurrentIndex = 0;
          }
        }
        handleUpdateOriginalDSLAttrs({
          currentIndex: newCurrentIndex,
          currentKey: currentView.key,
        });
      },
      showPreviousView: (loop: boolean) => {
        let newCurrentIndex = currentIndex - 1;

        if (newCurrentIndex < 0) {
          if (!loop) return;
          newCurrentIndex = viewList.length - 1;
        }
        const currentView = viewList[newCurrentIndex];
        handleUpdateOriginalDSLAttrs({
          currentIndex: newCurrentIndex,
          currentKey: currentView.key,
        });
      },
      showPreviousVisibleView: (loop: boolean) => {
        let newCurrentIndex = currentIndex - 1;

        if (newCurrentIndex < 0) {
          if (!loop) return;
          newCurrentIndex = viewList.length - 1;
        }
        let currentView = viewList[newCurrentIndex];
        while (currentView.hidden || currentView.disabled) {
          newCurrentIndex--;
          currentView = viewList[newCurrentIndex];
          if (newCurrentIndex < 0) {
            if (!loop) return;
            newCurrentIndex = viewList.length - 1;
          }
        }
        handleUpdateOriginalDSLAttrs({
          currentIndex: newCurrentIndex,
          currentKey: currentView.key,
        });
      },
    });
    // return () => {
    //   deleteComponentRuntimeProps()
    // }
  }, [
    // deleteComponentRuntimeProps,
    updateComponentRuntimeProps,
    handleUpdateOriginalDSLAttrs,
    viewList,
    currentIndex,
  ]);


//  const style  = useMemo(()=>{
//   return getStyleMap( trueClasses,falseClasses,isClassTrue,context)
//  },[trueClasses, falseClasses, isClassTrue, context])


  return (
    <div  css={style||applyContainerWrapperStyle} onClick={handleOnClick}>
      {Array.isArray(childrenNode) && currentIndex < childrenNode.length ? (
        <RenderChildrenCanvas
          displayName={childrenNode[currentIndex]}
          columnNumber={columnNumber}
          handleUpdateHeight={handleUpdateHeight}
          canResizeCanvas={false || enableAutoHeight}
          containerPadding={padding?.size}
          gridContainer={isGridContainer}
        />
      ) : (
        <ContainerEmptyState />
      )}
    </div>
  );
};

export default ContainerWidget;

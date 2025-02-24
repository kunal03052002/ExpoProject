/* eslint-disable @typescript-eslint/no-explicit-any */
import { klona } from "klona";
import { get, isFunction, isNumber, set, toPath } from "lodash-es";
import { FC, Suspense, memo, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UNIT_HEIGHT } from "@/page/app/components/dotPanel/constant/canvas";
import {
  WIDGET_PADDING,
  WIDGET_SCALE_SQUARE_BORDER_WIDTH,
} from "@/page/app/components/scaleSquare/constant/widget";
import { LayoutInfo } from "@/redux/currentApp/components/componentsPayload";
import {
  getContainerListDisplayNameMappedChildrenNodeDisplayName,
  searchDSLByDisplayName,
} from "@/redux/currentApp/components/componentsSelector";
import { componentsActions } from "@/redux/currentApp/components/componentsSlice";
import {
  // getExecutionClasses,
  getExecutionResult,
  getExecutionResultToGlobalCodeMirror,
  getIsDragging,
} from "@/redux/currentApp/executionTree/executionSelector";
import { executionActions } from "@/redux/currentApp/executionTree/executionSlice";
import { RootState } from "@/store";
import store from "@/store";
import { ILLAEditorRuntimePropsCollectorInstance } from "@/utils/executionTreeHelper/runtimePropsCollector";
import { widgetBuilder } from "@/widgetLibrary/widgetBuilder";
import { MIN_HEIGHT } from "./config";
import { getClientWidgetLayoutInfo } from "@/redux/currentApp/layoutInfo/layoutInfoSelector";
import { TransformWidgetProps } from "./interface";
import { convertPathToString, isObject } from "@/redux/utils";
import { layoutInfoActions } from "@/redux/currentApp/layoutInfo/layoutInfoSlice";
import { evaluateDynamicString } from "@/utils/evaluateDynamicString";
import { applyWrapperStylesStyle } from "./style";
import CircularProgress from "@mui/material/CircularProgress";
import { runEventHandler } from "@/utils/eventHandlerHelper";
import { v4 } from "uuid";
import { getClaasesObject } from "@/redux/currentApp/style/styleSelector";
import CommonSkeleton from "@/Skeleton";

export const TransformWidgetWrapper: FC<TransformWidgetProps> = memo(
  (props: TransformWidgetProps) => {
    const { columnNumber, displayName, widgetType, parentNodeDisplayName } =
      props;

    const displayNameMapProps = useSelector(getExecutionResult);
    const classMap = useSelector(getClaasesObject);
    const tmpCalcContext = useSelector<RootState, Record<string, unknown>>(
      (rootState) => {
        return getExecutionResultToGlobalCodeMirror(rootState);
      }
    );
    const layoutInfo = useSelector<RootState, LayoutInfo>((rootState) => {
      const layoutInfos = getClientWidgetLayoutInfo(rootState);
      return layoutInfos[displayName].layoutInfo;
    });
    const originComponentNode = searchDSLByDisplayName(displayName);

    const realProps = useMemo(
      () => displayNameMapProps[displayName] ?? {},
      [displayName, displayNameMapProps]
    );

    const dispatch = useDispatch();

    const containerListMapChildName = useSelector(
      getContainerListDisplayNameMappedChildrenNodeDisplayName
    );

    const isDraggingInGlobal = useSelector(getIsDragging);

    const listContainerDisplayName = [""]
    
    useMemo(() => {
      const listWidgetDisplayNames = Object.keys(containerListMapChildName);
      let currentListDisplayName = "";
      for (let i = 0; i < listWidgetDisplayNames.length; i++) {
        if (
          containerListMapChildName[listWidgetDisplayNames[i]].includes(
            displayName
          )
        ) {
          currentListDisplayName = listWidgetDisplayNames[i];
          break;
        }
      }
      return currentListDisplayName;
    }, [containerListMapChildName, displayName]);

    const listContainerDisabled = useMemo(() => {
      const currentListDisplayName = listContainerDisplayName;
      const listWidgetProps = displayNameMapProps[currentListDisplayName];
      if (
        isObject(listWidgetProps) &&
        Object.prototype.hasOwnProperty.call(listWidgetProps, "disabled") &&
        listWidgetProps.disabled != undefined
      )
        return listWidgetProps.disabled;
      return realProps?.disabled;
    }, [displayNameMapProps, listContainerDisplayName, realProps?.disabled]);




    const updateComponentRuntimeProps = useCallback(
      (runtimeProp: unknown) => {
        ILLAEditorRuntimePropsCollectorInstance.addRuntimeProp(
          displayName,
          runtimeProp
        );
      },
      [displayName]
    );

    const deleteComponentRuntimeProps = useCallback(() => {
      ILLAEditorRuntimePropsCollectorInstance.deleteRuntimeProp(displayName);
    }, [displayName]);

    const {
      dynamicHeight = "fixed",
      dynamicMinHeight,
      dynamicMaxHeight,
    } = realProps;

    const updateComponentHeight = useCallback(
      (newHeight: number) => {
        if (isDraggingInGlobal) return;
        const rootState = store.getState();
        const widgetLayoutInfos = getClientWidgetLayoutInfo(rootState);
        const oldH = widgetLayoutInfos[displayName]?.layoutInfo.h ?? 0;

        if (dynamicHeight !== "fixed") {
          if (
            dynamicMaxHeight &&
            newHeight >
              dynamicMaxHeight -
                (WIDGET_PADDING + WIDGET_SCALE_SQUARE_BORDER_WIDTH) * 2
          ) {
            newHeight =
              dynamicMaxHeight -
              (WIDGET_PADDING + WIDGET_SCALE_SQUARE_BORDER_WIDTH) * 2;
          }

          if (
            dynamicMinHeight &&
            newHeight <=
              dynamicMinHeight -
                (WIDGET_PADDING + WIDGET_SCALE_SQUARE_BORDER_WIDTH) * 2
          ) {
            newHeight =
              dynamicMinHeight -
              (WIDGET_PADDING + WIDGET_SCALE_SQUARE_BORDER_WIDTH) * 2;
          }
        }

        const newH = Math.max(
          Math.ceil(
            (newHeight +
              (WIDGET_PADDING + WIDGET_SCALE_SQUARE_BORDER_WIDTH) * 2) /
              UNIT_HEIGHT
          ),
          MIN_HEIGHT
        );

        if (newH === oldH) return;

        dispatch(
          layoutInfoActions.updateWidgetLayoutInfoReducer({
            displayName,
            layoutInfo: {
              h: newH,
            },
            parentNode: parentNodeDisplayName,
            effectRows: newH - oldH,
          })
        );
      },
      [
        dispatch,
        displayName,
        dynamicHeight,
        dynamicMaxHeight,
        dynamicMinHeight,
        isDraggingInGlobal,
        parentNodeDisplayName,
      ]
    );

    const handleUpdateDsl = useCallback(
      (value: Record<string, any>) => {
        dispatch(
          executionActions.updateExecutionByDisplayNameReducer({
            displayName,
            value,
          })
        );
      },
      [dispatch, displayName]
    );

    const handleUpdateMultiExecutionResult = useCallback(
      (allUpdate: { displayName: string; value: Record<string, any> }[]) => {
        dispatch(
          executionActions.updateExecutionByMultiDisplayNameReducer(allUpdate)
        );
      },
      [dispatch]
    );

    const handleUpdateOriginalDSLMultiAttr = useCallback(
      (updateSlice: Record<string, any>, notUseUndoRedo?: boolean) => {
        if (!isObject(updateSlice)) return;
        dispatch(
          componentsActions.updateComponentPropsReducer({
            displayName: displayName,
            updateSlice,
            notUseUndoRedo,
          })
        );
      },
      [dispatch, displayName]
    );

    const handleUpdateOriginalDSLOtherMultiAttr = useCallback(
      (
        displayName: string,
        updateSlice: Record<string, any>,
        notUseUndoRedo?: boolean
      ) => {
        if (!displayName || !isObject(updateSlice)) return;
        dispatch(
          componentsActions.updateComponentPropsReducer({
            displayName,
            updateSlice,
            notUseUndoRedo,
          })
        );
      },
      [dispatch]
    );

    const getRunEvents = useCallback(
      (
        eventType: string,
        path: string,
        otherCalcContext?: Record<string, any>
      ) => {
        const originEvents = get(originComponentNode.props, path, []) as any[];
        const dynamicPaths = get(
          originComponentNode.props,
          "$dynamicAttrPaths",
          []
        );

        const needRunEvents = klona(originEvents)
          .filter((originEvent) => {
            return originEvent.eventType === eventType;
          })
          .map((originEvent) => {
            return {
              ...originEvent,
              originEnable: originEvent.enabled,
            };
          });
        const finalContext =
          ILLAEditorRuntimePropsCollectorInstance.getCurrentPageCalcContext(
            otherCalcContext
          );
        const actualNeedRunEvents = needRunEvents.map((e) => {
          return { ...e, id: v4() };
        });
        return {
          dynamicPaths,
          needRunEvents: actualNeedRunEvents,
          finalContext,
        };
      },
      [originComponentNode?.props]
    );





    const triggerEventHandler = useCallback(
      (
        eventType: string,
        path: string = "events",
        otherCalcContext?: Record<string, any>,
        formatPath?: (path: string) => string
      ) => {
        const { dynamicPaths, needRunEvents, finalContext } = getRunEvents(
          eventType,
          path,
          otherCalcContext
        );

        dynamicPaths?.forEach((path: string) => {
          const realPath = isFunction(formatPath)
            ? formatPath(path)
            : convertPathToString(toPath(path).slice(1));
          try {
            const dynamicString = get(needRunEvents, realPath, "");
            if (dynamicString) {
              const calcValue = evaluateDynamicString(
                `events${realPath}`,
                dynamicString,
                finalContext
              );
              if (listContainerDisplayName) {
                set(
                  needRunEvents,
                  realPath,
                  Array.isArray(calcValue) ? calcValue[0] : calcValue
                );
              } else {
                set(needRunEvents, realPath, calcValue);
              }
            }
          } catch (_ignore) {
            console.log("error");
          }
        });

        needRunEvents.forEach((scriptObj: any) => {
          runEventHandler(scriptObj, finalContext);
        });
      },
      [getRunEvents, listContainerDisplayName]
    );

    const triggerMappedEventHandler = useCallback(
      (
        eventType: string,
        path: string = "events",
        index?: number,
        formatPath?: (path: string) => string,
        isMapped?: (dynamicString: string, calcValue: unknown) => boolean
      ) => {
        const { dynamicPaths, needRunEvents, finalContext } = getRunEvents(
          eventType,
          path
        );
        dynamicPaths?.forEach((path: string) => {
          const realPath = isFunction(formatPath)
            ? formatPath(path)
            : convertPathToString(toPath(path).slice(2));

          try {
            const dynamicString = get(needRunEvents, realPath, "");

            if (dynamicString) {
              const calcValue = evaluateDynamicString(
                `events${realPath}`,
                dynamicString,
                finalContext
              );
              let valueToSet = calcValue;

              if (listContainerDisplayName) {
                valueToSet = Array.isArray(calcValue)
                  ? calcValue[0]
                  : calcValue;
              }

              if (Array.isArray(calcValue) && isNumber(index)) {
                if (
                  !isFunction(isMapped) ||
                  isMapped(dynamicString, calcValue)
                ) {
                  valueToSet = calcValue[index];
                }
              }
              set(needRunEvents, realPath, valueToSet);
            }
          } catch (e) {
            console.log(e);
          }
        });
        needRunEvents.forEach((scriptObj: any) => {
          runEventHandler(scriptObj, finalContext);
        });
      },
      [getRunEvents, listContainerDisplayName]
    );


    // if (displayName.startsWith("button")) {
    //   console.log("realProps >>", realProps);
    // }
    const widgetConfig = widgetBuilder(widgetType);
    if (!widgetConfig) return null;
    const Component = widgetConfig.widget;
    const {
      hidden,
      borderColor,
      backgroundColor,
      radius,
      borderWidth,
      shadow,
    } = realProps;
    const _radius = !isNaN(Number(radius)) ? radius + "px" : radius?.toString();
    const _borderWidth = !isNaN(Number(borderWidth))
      ? borderWidth + "px"
      : borderWidth?.toString();
    return (
      <>
        {hidden ? null : (
          <div
            css={applyWrapperStylesStyle(
              borderColor,
              _borderWidth,
              _radius,
              backgroundColor,
              shadow,
              widgetType
            )}
            id={displayName}
          >
            <Suspense
              fallback={
                <div
                  id={displayName}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <CommonSkeleton />
                
                </div>
              }
            >
              <Component
                {...realProps}
                h={layoutInfo.h}
                w={layoutInfo.w}
                classMap={classMap}
                context={tmpCalcContext}
                columnNumber={columnNumber}
                handleUpdateOriginalDSLMultiAttr={
                  handleUpdateOriginalDSLMultiAttr
                }
                handleUpdateOriginalDSLOtherMultiAttr={
                  handleUpdateOriginalDSLOtherMultiAttr
                }
                handleUpdateDsl={handleUpdateDsl}
                updateComponentHeight={updateComponentHeight}
                handleUpdateMultiExecutionResult={
                  handleUpdateMultiExecutionResult
                }
                displayName={displayName}
                childrenNode={originComponentNode.childrenNode}
                componentNode={originComponentNode}
                disabled={listContainerDisabled}
                triggerEventHandler={triggerEventHandler}
                triggerMappedEventHandler={triggerMappedEventHandler}
                updateComponentRuntimeProps={updateComponentRuntimeProps}
                deleteComponentRuntimeProps={deleteComponentRuntimeProps}
              />
            </Suspense>
          // </div>
        )}
      </>
    );
  }
);
TransformWidgetWrapper.displayName = "TransformWidgetWrapper";

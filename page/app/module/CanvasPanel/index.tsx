import { forwardRef } from "react";
import { useSelector } from "react-redux";
import {
  getIsIMPAKTEditMode,
  getIsIMPAKTPreviewMode,
} from "@/redux/config/configSelector";
import { CanvasPanelProps } from "./interface";
import { applyScaleContainerStyle } from "./style";
import { DotPanel } from "../../components/dotPanel";
import { getExecutionResult } from "@/redux/currentApp/executionTree/executionSelector";

export const CanvasPanel = forwardRef<HTMLDivElement, CanvasPanelProps>(
  (props, ref) => {
    const { ...otherProps } = props;
    const isEditMode = useSelector(getIsIMPAKTEditMode);
    const isEditPreviewMode = useSelector(getIsIMPAKTPreviewMode);
    const executionResult = useSelector(getExecutionResult);
    if (!executionResult || !executionResult.root) {
      return null;
    }
    return (
      <div
        {...otherProps}
        ref={ref}
        css={applyScaleContainerStyle(isEditPreviewMode, isEditMode)}
      >
        <DotPanel />
      </div>
    );
  }
);

CanvasPanel.displayName = "CanvasPanel";

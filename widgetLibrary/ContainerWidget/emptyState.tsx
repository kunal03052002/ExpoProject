import { FC } from "react";
import {
  applyEmptyStateWrapperStyle,
  emptyStateStyle,
} from "@/widgetLibrary/ContainerWidget/style";
// import { getPaddingShape } from "@/page/app/components/DotPanel/components/Canvas/renderComponentCanvasContainer"
import { getPaddingShape } from "@/page/app/components/dotPanel/utils/styleutils/padding";
import { useSelector } from "react-redux";
import { getIsIMPAKTEditMode } from "@/redux/config/configSelector";
export const ContainerEmptyState: FC<{
  isInner?: boolean;
  containerPadding?: string;
  handleUpdateHeight?: (height: number) => void;
  rowCount?: string;
}> = ({
  handleUpdateHeight,
  isInner,
  containerPadding = "0",
  rowCount = "1",
}) => {
  const paddings = getPaddingShape(containerPadding);
  const isEditMode = useSelector(getIsIMPAKTEditMode);
  const paddingTopBottom = paddings.paddingTop + paddings.paddingBottom;

  return (
    <div
      css={applyEmptyStateWrapperStyle(
        isInner,
        paddingTopBottom,
        isEditMode,
        Number(rowCount)
      )}
    >
      <span css={emptyStateStyle}>{isEditMode && "Drag components here"}</span>
    </div>
  );
};

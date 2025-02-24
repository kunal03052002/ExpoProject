import { FC } from "react";
import {
  getResourceNameFromResourceType,
  useResourceTypeToResourceName,
} from "../../utils";
import { ResourceCardSelectorProps } from "./interface";
import {
  applyItemStyle,
  nameStyle,
  subTitleStyle,
  titleContainerStyle,
} from "./style";
import { getIconFromResourceType } from "./utils";


export const ResourceCard: FC<ResourceCardSelectorProps> = (props) => {
  const { resourceType, onSelect } = props;

  const subTitle = useResourceTypeToResourceName(resourceType);

  return (
    <div
      css={applyItemStyle}
      onClick={() => {
        onSelect?.(resourceType);
      }}
    >
      {getIconFromResourceType(resourceType)}
      <div css={titleContainerStyle}>
        <div css={nameStyle}>
          {getResourceNameFromResourceType(resourceType)}
        </div>
        {subTitle !== "" && <div css={subTitleStyle}>{subTitle}</div>}
      </div>
    </div>
  );
};

ResourceCard.displayName = "ResourceCard";

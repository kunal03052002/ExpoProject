import { FC, Suspense } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  getCachedAction,
  getSelectedAction,
} from "@/redux/config/configSelector";
import { configActions } from "@/redux/config/configSlice";
import { getAllResources } from "@/redux/resource/resourceSelector";
import {  itemContainer, itemLogo, itemText } from "./style";
import { getIconFromResourceType } from "@/page/app/components/PublicTypes/ResourceGenerator/components/ResourceCard/utils";
import { getInitialContent } from "@/page/app/components/publicConfig/action/getInitialContent";
import { globalColor } from "@/utils/colorBuilder";
import { ActionType } from "@/redux/currentApp/action/interface";
import { MenuItem, Select } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
interface ResourceChooseProps {
  setGeneratorVisible: (v: boolean) => void;
  setEditorVisible: (v: boolean) => void;
}

const ResourceChoose: FC<ResourceChooseProps> = ({
  setGeneratorVisible,
  setEditorVisible,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const resourceList = useSelector(getAllResources);
  const action = useSelector(getCachedAction)!;
  const selectedAction = useSelector(getSelectedAction)!;

  //maybe empty
  const currentSelectResource = resourceList.find(
    (r) => r.resourceID === action.resourceID
  );

  return (
    <Select
      sx={{ color: "techPurple", width: "360px", height: "30px" }}
      size="small"
      value={
        currentSelectResource
          ? action.resourceID
          : t("editor.action.resource_choose.deleted")
      }
      startAdornment={
        <CreateIcon
          sx={
            currentSelectResource
              ? {
                  cursor: "pointer",
                  color: globalColor(`grayBlue-04`),
                  paddingRight: "5px",
                  marginRight: "5px",
                  borderRight: "1px solid gray",
                     fontSize:"20px"
                  // width: "50px",
                }
              : {
                  cursor: "not-allowed",
                  color: globalColor(`grayBlue-04`),
                  paddingRight: "5px",
                  marginRight: "5px",
                  borderRight: "1px solid gray",
                  fontSize:"20px"
                  // width: "50px",
                }
          }
          onClick={(e) => {
            if (currentSelectResource.resourceType !== "impaktapps") {
              e.stopPropagation();
              if (currentSelectResource) {
                setEditorVisible(true);
              }
            }
          }}
        />
      }
      onChange={(event) => {
        const value = event.target.value;
        if (value === "create") {
          setGeneratorVisible(true);
          return;
        }
        const resource = resourceList.find((r) => r.resourceID === value);
        if (resource != undefined) {
          dispatch(
            configActions.updateCachedAction({
              ...action,
              // selected resource is same as action type
              actionType: resource.resourceType,
              resourceID: value as string,
              content:
                selectedAction.actionType === resource.resourceType
                  ? selectedAction.content
                  : getInitialContent(resource.resourceType as ActionType),
            })
          );
        }
      }}
    >
      {resourceList.map((item) => {
        return (
          <MenuItem
          sx={{height:"30px"}}
            // css={itemContainer}
            key={item.resourceID}
            value={item.resourceID}
          >
            <div css={itemContainer}>
              <span css={itemLogo}>
                <Suspense>
                  {getIconFromResourceType(item.resourceType,"20")}
                </Suspense>
              </span>
              <span css={itemText}>{item.resourceName}</span>
            </div>
          </MenuItem>
        );
      })}
    </Select>
  );
};

export default ResourceChoose;

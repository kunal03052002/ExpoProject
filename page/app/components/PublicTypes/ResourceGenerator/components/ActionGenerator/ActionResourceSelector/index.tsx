import {
  FC,
  Suspense,
  // Suspense,
  useCallback,
  useContext,
  // useEffect,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { ResourceGeneratorContext } from "../../../provider";
import { ActionResourceSelectorProps } from "./interface";
import {
  applyResourceItemStyle,
  // applyResourceItemStyle,
  containerStyle,
  footerStyle,
  resourceItemTimeStyle,
  resourceItemTitleStyle,
} from "./style";
import { ResourceType } from "../../../../resource";
import { Button, ButtonGroup } from "@mui/material";
import { List } from "@/page/app/components/Actions/List/list";
import { getIconFromResourceType } from "../../ResourceCard/utils";

export const ActionResourceSelector: FC<ActionResourceSelectorProps> = (
  props
) => {
  const {
    actionType,
    canBack,
    onBack,
    onCreateAction,
    onCreateResource,
    handleCreateAction,
    onClose
  } = props;

  const { t } = useTranslation();

  const { getResourceByType } = useContext(ResourceGeneratorContext);

  const resourceList = getResourceByType(actionType as ResourceType).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  const [selectedResourceId, setSelectedResourceId] = useState<string>(
    resourceList[0]?.resourceID
  );

  const [
    ,
    setLoading,
  ] = useState(false);

  const handleClickCreateAction = useCallback(() => {
    handleCreateAction(
      actionType,
      selectedResourceId,
      () => onCreateAction?.(actionType, selectedResourceId),
      setLoading
    );
  }, [actionType, handleCreateAction, onCreateAction, selectedResourceId]);

  return (
    <div css={containerStyle}>
      <List
        bordered={false}
        height={324}
        data={resourceList}
        split={false}
        itemHeight={48}
        renderKey={(data) => {
          return data.resourceID;
        }}
        h="324px"
        renderRaw
        render={(r) => {
          return (
            <div
              css={applyResourceItemStyle(r.resourceID === selectedResourceId)}
              onClick={() => {
                setSelectedResourceId(r.resourceID);
              }}
            >
              <Suspense>
                <div>{getIconFromResourceType(actionType)}</div>
              </Suspense>
              <span css={resourceItemTitleStyle}>{r.resourceName}</span>
              <span css={resourceItemTimeStyle}>
                {
                  t("created_at") + " " + "fromNow"
                  // fromNow(r.createdAt)
                }
              </span>
            </div>
          );
        }}
      />
      <div css={footerStyle}>
        {canBack ? (
          <Button
            // leftIcon={<PreviousIcon />}
            // variant="text"
            // colorScheme="gray"
            onClick={() => {
              onBack("select");
            }}
          >
            {t("back")}
          </Button>
        ) : (
          <span />
        )}
        <ButtonGroup>
          {actionType !== "impaktapps" && (
            <Button
              // leftIcon={<AddIcon />}
              // colorScheme="gray"
              onClick={() => {
                onCreateResource?.(actionType as ResourceType);
              }}
            >
              {t(
                "editor.action.action_list.action_generator.btns.new_resource"
              )}
            </Button>
          )}

          <Button
            onClick={()=>{
              handleClickCreateAction()
              onClose()
            }}
            disabled={resourceList.length <= 0}
          >
            {t("editor.action.action_list.action_generator.btns.create_action")}
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
};

ActionResourceSelector.displayName = "ActionResourceSelector";

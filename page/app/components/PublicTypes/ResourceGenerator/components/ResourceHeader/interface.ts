import { ResourceType } from "../../../resource"


export interface ResourceHeaderProps {
  resourceType: ResourceType
  onClickBack: () => void
}

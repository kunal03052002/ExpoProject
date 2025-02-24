import { ResourceType } from "../../../resource"


export interface ResourceCardSelectorProps {
  resourceType: ResourceType
  onSelect?: (item: ResourceType) => void
}

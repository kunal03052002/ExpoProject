import { ResourceType } from "../../../resource"


export interface ResourceTypeSelectorProps {
  onSelect: (item: ResourceType) => void
  filterResourceType?: (item: ResourceType) => boolean
}

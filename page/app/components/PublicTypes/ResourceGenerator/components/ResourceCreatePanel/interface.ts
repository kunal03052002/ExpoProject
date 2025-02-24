import { ResourceType } from "../../../resource"

export interface ResourceCreatePanelProps {
  resourceType: ResourceType
  resourceID?: string
  handleOnClickBack: () => void
}

import { ResourceType } from "../../../resource"


export interface BaseConfigElementProps {
  resourceID?: string
}

export interface ConfigElementProps extends BaseConfigElementProps {
  resourceType?: ResourceType
}

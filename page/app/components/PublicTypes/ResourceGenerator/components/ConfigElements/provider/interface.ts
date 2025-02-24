
import { ReactNode } from "react"
import { ResourceType } from "../../../../resource"

export interface ConfigElementProviderProps {
  children: ReactNode
  resourceID?: string
  resourceType: ResourceType
}

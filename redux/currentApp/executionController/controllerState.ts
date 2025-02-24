import { ControllerContent } from "./interface"


export type ResourceInitialConfig = unknown;
// <T extends ResourceContent> {
//   resourceName: string
//   resourceType: ResourceType
//   content: T
// }

// export type ResourceListState = Resource<ResourceContent>
export const ControllerInitialState: ControllerContent = {}

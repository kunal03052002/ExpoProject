import { Resource, ResourceContent, ResourceType } from "@/page/app/components/PublicTypes/resource"
import { v4 } from "uuid"


export interface ResourceInitialConfig<T extends ResourceContent> {
  resourceName: string
  resourceType: ResourceType
  content: T
}

export type ResourceListState = Resource<ResourceContent>[]
export const resourceInitialState: ResourceListState = [
  {
    content: {
      impaktResourceContent: {
        groupId: "com.hyperform",
        artifactId: "common",
        version: "1.0.11",
      },
      authentication: "none",
      baseUrl: "https://jsonplaceholder.typicode.com/posts",

    },
    resourceName: "Raghav",
    resourceType: "impaktapps",
    resourceID: v4(),
    createdBy: "Raghav",
    updatedBy: "Raghav",
    updatedAt: new Date().toLocaleDateString(),
    createdAt: new Date().toLocaleDateString(),
  }]

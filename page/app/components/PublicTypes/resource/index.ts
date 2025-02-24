/* eslint-disable @typescript-eslint/no-explicit-any */

import { RestApiAuth, RestApiResource } from "./restapi"


export interface impaktAPIResource {
  baseUrl:string,
  method:"post",
  authentication:unknown,
  content:Record<string,any>
}
export * from "./restapi"


export type ResourceType =
  | "restapi"|"impaktapps"


export type ResourceContent =
 | RestApiResource<RestApiAuth>|impaktAPIResource

export interface Resource<T extends ResourceContent = ResourceContent> {
  resourceID: string
  resourceName: string
  resourceType: ResourceType
  createdBy: string
  updatedBy: string
  createdAt: string
  updatedAt: string
  content: T
}

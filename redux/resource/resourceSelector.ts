import { createSelector } from "@reduxjs/toolkit"
import { RootState } from "@/store"
import { Resource, ResourceContent } from "@/page/app/components/PublicTypes/resource"

export const getAllResources = (state: RootState) => state.resource

export const getResourceIDMapResource = createSelector(
    [getAllResources],
    (allResource) => {
        const resourceIDMapResource: Record<string, Resource<ResourceContent>> = {}
        allResource.forEach((resource) => {
            resourceIDMapResource[resource.resourceID] = resource
        })
        return resourceIDMapResource
    },
)

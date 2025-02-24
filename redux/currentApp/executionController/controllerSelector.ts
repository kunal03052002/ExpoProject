/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSelector } from "@reduxjs/toolkit"
import { RootState } from "@/store"
// import { getAllResources } from "@/redux/resource/resourceSelector"
export const getAllCOntrollerResources = (state: RootState) => state.currentApp.controller

export const getControllerIDMapResource = createSelector(
    [getAllCOntrollerResources],
    (allResource) => {
        return allResource
    },
)

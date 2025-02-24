/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValues, UseFormHandleSubmit } from "react-hook-form"
import {
  IActionTestConnectionRequestData,
  fetchActionTestConnection,
} from "./service"
import { RestApiAuth } from "../resource/restapi"
import { Resource, ResourceContent, ResourceType } from "../resource";
import { v4 } from "uuid";


export type AccessType = "r" | "rw";
function getActionContentByType(data: FieldValues, type: ResourceType) {

  switch (type) {
  
    case "restapi":
      // eslint-disable-next-line no-case-declarations
      const {
        // _resourceName: _restApiResName,
        baseUrl,
        caCert = "",
        clientKey = "",
        clientCert = "",
        mode = "verify-full",
        ...otherRestApiParams
      } = data
      return {
        ...otherRestApiParams,
        baseUrl: baseUrl.trim(),
        authContent: generateRestAPIAuthContent(data),
        certs: {
          caCert,
          clientKey,
          clientCert,
          mode,
        },
      }
  }
}

export const generateRestAPIAuthContent = (data: {
  [p: string]: any
}): RestApiAuth => {
  let authContent: RestApiAuth = {}
  switch (data.authentication) {
    case "basic":
    case "digest":
      authContent = {
        username: data.username,
        password: data.password,
      }
      break
    case "bearer":
      authContent = {
        token: data.token,
      }
      break
    default:
      authContent = {}
      break
  }
  return authContent
}

export function onActionConfigElementSubmit(
  teamID: string,
  handleSubmit: UseFormHandleSubmit<FieldValues>,
  resourceID: string | undefined,
  resourceType: ResourceType,
  finishedHandler: (
    resource: Resource<ResourceContent>,
    isUpdate: boolean,
  ) => void,
) {
  const isUpdate = resourceID != undefined;
  return handleSubmit(async (data: FieldValues) => {
    let content
    try {
      content = getActionContentByType(data, resourceType)
    } catch (e) {
      return
    }
    const requestData:any = {
       ...(isUpdate && { resourceID: data.resourceID||v4() }),
      resourceName: data.resourceName,
      resourceType: resourceType,
      resourceID:v4(),
      content,
    }

    try {
      if (isUpdate) {
        finishedHandler(requestData, true)
      } else {
        finishedHandler(requestData, false)
      }
    } catch (e) {
    // 
    }
  })
}

export async function onActionConfigElementTest(
  teamID: string,
  data: IActionTestConnectionRequestData,
  loadingHandler: (value: boolean) => void,
) {
  loadingHandler(true)
  try {
    await fetchActionTestConnection(teamID, data)
  } catch (error) {
    //  (error)
  } finally {
    loadingHandler(false)
  }
}

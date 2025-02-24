import { builderRequest } from "../../../publicConfig/Act21Service"
import { Resource, ResourceContent } from "../../resource"

export const requestUpdateResource = async (
  resourceID: string,
  data: unknown,
) => {
  const url = `/resources/${resourceID}`
  return await builderRequest<Resource<ResourceContent>>(
    {
      url,
      method: "PUT",
      data,
    }
  )
}

export const requestCreateResource = async ( data: unknown) => {
  return await 
  builderRequest<Resource<ResourceContent>>({
      url: "/resources",
      method: "POST",
      data,
    }
  )
}

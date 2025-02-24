import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
import { actionRuntimeAxios, notNeedAuthAxios } from "./base"

export interface RequestHandlerOptions {
  teamIdentifier?: string
  teamID?: string
}

const getURLWithPrefix = (
  url: string | undefined,
  prefix: string,
) => {
return prefix + url 
}

export const needAuthRequest = async <
  ResponseData = unknown,
  RequestData = unknown,
>(
  requestConfig: AxiosRequestConfig<RequestData>,
): Promise<AxiosResponse<ResponseData, RequestData>> => {
  try {
    return await notNeedAuthAxios.request({
      ...requestConfig,
    })
  } catch (e) {
    if (axios.isAxiosError(e) && e.response) {
      throw e.response
    }

    throw e
  }
}

export const notNeedAuthRequest = async <
  ResponseData = unknown,
  RequestData = unknown,
>(
  requestConfig: AxiosRequestConfig<RequestData>,
): Promise<AxiosResponse<ResponseData, RequestData>> => {
  try {
    return await notNeedAuthAxios.request({
      ...requestConfig,
    })
  } catch (e) {
    if (axios.isAxiosError(e) && e.response) {
      throw e.response
    }

    throw e
  }
}




export const actionBasicRequest = async <
  ResponseData = unknown,
  RequestData = unknown,
>(
  requestConfig: AxiosRequestConfig<RequestData>,
): Promise<AxiosResponse<ResponseData, RequestData>> => {
  try {
    return await actionRuntimeAxios.request({
      ...requestConfig,
    })
  } catch (e) {
    if (axios.isAxiosError(e) && e.response) {
      throw e.response
    }
    throw e
  }
}

export const builderRequest = async <
  ResponseData = unknown,
  RequestData = unknown,
>(
  requestConfig: AxiosRequestConfig<RequestData>,
) => {
  const finalURL = getURLWithPrefix(
    requestConfig.url,
    "",
  )

  return await notNeedAuthAxios<ResponseData, RequestData>({
    ...requestConfig,
    url: finalURL,
  })
}

export const directRequest = async <
  ResponseData = unknown,
  RequestData = unknown,
>(
  requestConfig: AxiosRequestConfig<RequestData>,
) => {
  const finalURL = getURLWithPrefix(requestConfig.url, "",)

  return await needAuthRequest<ResponseData, RequestData>({
    ...requestConfig,
    url: finalURL,
  })
}


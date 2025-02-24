import { ActionContent, ActionType } from "@/redux/currentApp/action/interface"
import { AxiosResponse } from "axios"


const transMaybeFileResponse = (
  header: Record<string, unknown>,
  raw: string,
) => {
  const contentType =
    (header["Content-Type"] as string)?.split(";")[0] ?? "text/plain"
  if (
    contentType.includes("video/") ||
    contentType.includes("audio/") ||
    contentType.includes("image/") ||
    contentType.includes("application/pdf")
  ) {
    return {
      responseHeaders: header,
      data: raw,
      fileData: {
        base64binary: raw,
        dataURI: `data:${contentType};base64,${raw}`,
        fileType: contentType,
      },
    }
  }
  let realData = raw
  try {
    const bytes = new Uint8Array(
      atob(raw)
        .split("")
        .map((char) => char.charCodeAt(0)),
    )
    realData = new TextDecoder().decode(bytes)
  } catch {
    return {
      responseHeaders: header,
      data: raw,
    }
  }

  try {
    const parsedValue = JSON.parse(realData)
    return {
      responseHeaders: header,
      data: parsedValue,
      rawData: realData,
    }
  } catch (e) {
    return {
      rawData: realData,
      responseHeaders: header,
      data: realData,
    }
  }
}



const transLikeRestApiResponse = (response: AxiosResponse) => {
  // const resData 
  // = response.data
  // if (resData && resData.Extra && resData.Extra.raw) {
  //   const responseHeaders = resData.Extra.headers
  //   const raw = resData.Extra.raw
  //   const header: Record<string, unknown> = {}
  //   Object.keys(responseHeaders).forEach((key) => {
  //     header[key] = responseHeaders[key][0]
  //   })
  //   if (resData.Extra.statusCode) {
  //     header["statusCode"] = resData.Extra.statusCode
  //   }
  //   if (resData.Extra.statusText) {
  //     header["statusText"] = resData.Extra.statusText
  //   }
  //   return transMaybeFileResponse(header, raw)
  // }
  return response;
}

export const transResponse = (
  actionType: ActionType,
  _actionContent: ActionContent,
  response: AxiosResponse,
) => {
  switch (actionType) {
    case "restapi":
    case "impaktapps":
      {
        return transLikeRestApiResponse(response)
      }
    default: {
      return {
        data: response.data.Rows,
      }
    }
  }
}

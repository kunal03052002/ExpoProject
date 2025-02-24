import { Params, RestAPIAction, RestAPIBodyContent, RestAPIRawBody } from "../../PublicTypes/action/restApi"


export const RestAPIRawBodyInitial: RestAPIRawBody = {
  type: "text",
  content: "",
}

export const RestAPIActionInitial: RestAPIAction<RestAPIBodyContent> = {
  url: "",
  method: "GET",
  urlParams: [{ key: "", value: "" } as Params],
  headers: [{ key: "", value: "" } as Params],
  cookies: [{ key: "", value: "" } as Params],
  bodyType: "none",
  body: null,
}

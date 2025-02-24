import { AxiosResponse } from "axios"
import { useTranslation } from "react-i18next"

export function getResourceNameFromResourceType(
  resourceType: string | null,
): string {
  switch (resourceType) {
    case "impaktapps":
      return "Impakt Apps"
    case "restapi":
      return "REST API"
    case "transformer":
      return "Transformer"
    case "globalData":
      return "Global Data"
    default:
      return ""
  }
}

export function useResourceTypeToResourceName(resourceType: string | null) {
  const { t } = useTranslation()
  switch (resourceType) {
    case "huggingface":
      return "Inference API"
    case "hfendpoint":
      return "Inference Endpoint"
    case "oracle":
      return t("editor.action.form.label.new_oracle")
    case "oracle9i":
      return t("editor.action.form.label.old_oracle")
    default:
      return ""
  }
}

export const validateNotEmpty = (value?: string) =>
  value != undefined && value.trim() != ""

export const isContainLocalPath = (value: string) => {
  return /(^(127\.|0\.0\.0\.0)(\.*\d*)+$)|(^localhost)/.test(value)
}

export const urlValidate = (_value: string) => {
  console.log(_value)
  return true
  //  isBlobURLOrUrl((value ?? "").trim())
  //   ? true
  //   // : getI18n().t("editor.action.resource.error.invalid_url")
}

export interface RequestHandlerOptions {
  teamIdentifier?: string
  teamID?: string
}

export interface ILLAApiError {
  errorCode: string | number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errorFlag: any
  errorMessage: string
}
export interface IIllaErrorInterface {
  errorCode: string | number
  errorFlag: string
  errorMessage: string
}

export const isIllaErrorInterface = (e: unknown): e is IIllaErrorInterface => {
  return (
    typeof e === "object" &&
    e !== null &&
    "errorCode" in e &&
    "errorFlag" in e &&
    "errorMessage" in e &&
    typeof e.errorMessage === "string"
  )
}
export const isILLAAPiError = (
  error: unknown,
): error is AxiosResponse<ILLAApiError> => {
  return (
    typeof error === "object" &&
    error !== null &&
    "data" in error &&
    isIllaErrorInterface(error.data)
  )
}

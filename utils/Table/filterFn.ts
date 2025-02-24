import { FilterOptionsMap } from "./utils"
import { CustomFilterFn, FilterOptions } from "./interface"
import { isObject } from "@/redux/utils"
import { isString } from "lodash-es"


export function isTableFilterFn(value: string): value is CustomFilterFn {
  return value in FilterOptionsMap
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isFilterOption(option: any): option is FilterOptions {
  return (
    isObject(option) &&
    "id" in option &&
    isString(option.id) &&
    "filterFn" in option &&
    isTableFilterFn(option.filterFn) &&
    "value" in option
  )
}

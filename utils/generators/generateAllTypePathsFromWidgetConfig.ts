
import { convertPathToString, isObject } from "@/redux/utils"
import { get, toPath } from "lodash-es"
// import {
//   PanelConfig,
//   PanelFieldGroupConfig,
// } from "@/page/app/components/InspectPanel/interface"
// import { isObject } from "@/utils/typeHelper"
// import { VALIDATION_TYPES } from "@/utils/validationFactory"

export const generateAllTypePathsFromWidgetConfig = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  panelConfig: any[]=[],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  widgetOrAction: Record<string, any>,
) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let validationPaths: Record<string, any> = {}
  panelConfig.forEach((config) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((config as any).children) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const filedConfigs = (config as any).children
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      filedConfigs.forEach((filedConfig:any) => {
        const attrPath = filedConfig.attrName
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const configValidationPaths: Record<string, any> = {}

        if (Array.isArray(attrPath)) {
          const expectedType = filedConfig.expectedType
          if (Array.isArray(expectedType)) {
            attrPath.forEach((path, i) => {
              configValidationPaths[path] = expectedType[i]
            })
          } else if (expectedType) {
            attrPath.forEach((path) => {
              configValidationPaths[path] = expectedType
            })
          }
        } else {
          if (filedConfig.expectedType) {
            const expectedType = filedConfig.expectedType

            if (Array.isArray(expectedType)) {
              configValidationPaths[attrPath] = expectedType[0]
            } else if (expectedType) {
              configValidationPaths[attrPath] = expectedType
            }
          }
        }

        if (filedConfig.childrenSetter) {
          const basePropertyPath = filedConfig.attrName
          const widgetPropertyValue = get(widgetOrAction, basePropertyPath, [])
          if (Array.isArray(widgetPropertyValue)) {
            Object.keys(widgetPropertyValue).forEach((key) => {
              const objectIndexPropertyPath = convertPathToString(
                toPath(`${basePropertyPath}.${key}`),
              )
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              filedConfig.childrenSetter?.forEach((childConfig:any) => {
                const childAttrPath = childConfig.attrName
                const expectedType = childConfig.expectedType
                if (Array.isArray(childAttrPath)) {
                  if (Array.isArray(expectedType)) {
                    childAttrPath.forEach((path, i) => {
                      configValidationPaths[
                        convertPathToString(
                          toPath(`${objectIndexPropertyPath}.${path}`),
                        )
                      ] = expectedType[i]
                    })
                  } else if (expectedType) {
                    childAttrPath.forEach((path) => {
                      configValidationPaths[
                        convertPathToString(
                          toPath(`${objectIndexPropertyPath}.${path}`),
                        )
                      ] = expectedType
                    })
                  }
                } else {
                  if (expectedType) {
                    if (Array.isArray(expectedType)) {
                      configValidationPaths[
                        convertPathToString(
                          toPath(`${objectIndexPropertyPath}.${childAttrPath}`),
                        )
                      ] = expectedType[0]
                    } else if (expectedType) {
                      configValidationPaths[
                        convertPathToString(
                          toPath(`${objectIndexPropertyPath}.${childAttrPath}`),
                        )
                      ] = expectedType
                    }
                  }
                }
              })
            })
          }
          if (isObject(widgetPropertyValue)) {
            Object.keys(widgetPropertyValue).forEach((key) => {
              const objectIndexPropertyPath = convertPathToString(
                toPath(`${basePropertyPath}.${key}`),
              )
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              filedConfig.childrenSetter?.forEach((childConfig:any) => {
                const expectedType = childConfig.expectedType
                if (!Array.isArray(expectedType) && expectedType) {
                  configValidationPaths[objectIndexPropertyPath] = expectedType
                }
              })
            })
          }
        }
        validationPaths = {
          ...validationPaths,
          ...configValidationPaths,
        }
      })
    }
  })

  return { validationPaths }
}

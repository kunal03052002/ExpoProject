/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentTreeNode } from "@/redux/currentApp/components/componentsState"
export const ADD_DISPLAY_NAME = "addDisplayName"
export const REMOVE_DISPLAY_NAME = "removeDisplayName"
export const UPDATE_DISPLAY_NAME = "updateDisplayName"
export const GENERATE_OR_UPDATE_DISPLAYNAME = "generateOrUpdateDisplayName"

export const PLACEHOLDER_DISPLAYNAME = ["document", "utils"]

export class DisplayNameGenerator {
  static displayNameList = new Set<string>(PLACEHOLDER_DISPLAYNAME)
  static appId: string = ""
  static teamID: string = ""
  static uid: string = ""
  static namePrefix = ""
  static isAlreadyGenerate(displayName: string): boolean {
    return this.displayNameList.has(displayName)
  }

  static initApp(appId: string, teamID: string, uid: string, prefix) {
    this.appId = appId
    this.teamID = teamID
    this.uid = uid
    this.namePrefix = prefix
  }
  static removeNamePrefix (){
    this.namePrefix = ""
  }
  static addNamePrefix (){
    this.namePrefix = "impakt"
  }
  static generateDisplayName(type: string, showName?: string,): string {
    let index = 1
    let name = `${showName || type}${index}`
    if (this.namePrefix) {
      name = `${this.namePrefix}_${showName || type}${index}`
    }
    // check cache map
    while (this.isAlreadyGenerate(name)) {
      index = index + 1
      if (this.namePrefix) {
        name = `${this.namePrefix}_${showName || type}${index}`
      } else {
        name = `${showName || type}${index}`
      }
    }
    this.displayNameList.add(name)
    return name
  }

  static updateDisplayNameList(
    componentNode: ComponentTreeNode,

    actionList: any[],
  ) {
    this.displayNameList = new Set<string>(PLACEHOLDER_DISPLAYNAME)
    actionList.forEach((action) => {
      this.displayNameList.add(action.displayName)
    })
    this.addComponentDisplayName(componentNode)
    const globalData = componentNode.props?.globalData ?? {}
    Object.keys(globalData).forEach((key) => {
      this.displayNameList.add(key)
    })
  }

  static addComponentDisplayName(componentNode: ComponentTreeNode) {
    this.displayNameList.add(componentNode.displayName)

    componentNode.childrenNode?.forEach((child: any) => {
      this.addComponentDisplayName(child)
    })
  }

  static addDisplayNames(displayNames: string[]) {
    displayNames.forEach((displayName) => {
      this.displayNameList.add(displayName)
    })
  }

  static updateOrGenerateDisplayName(displayName: string) {
    if (this.displayNameList.has(displayName)) {
      return this.generateDisplayName(displayName)
    }
    this.displayNameList.add(displayName)
    return displayName
  }

  static removeDisplayName(displayName: string) {
    this.displayNameList.delete(displayName)
  }

  static removeDisplayNameMulti(displayNames: string[]) {
    displayNames.forEach((displayName) => {
      this.displayNameList.delete(displayName)
    })
  }
}

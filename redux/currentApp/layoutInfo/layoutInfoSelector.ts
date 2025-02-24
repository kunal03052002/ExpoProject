import { createSelector } from "@reduxjs/toolkit"
import { getCurrentApp } from "../selector"
import { isEmpty } from "lodash"

export const layoutInfo = createSelector(
  [getCurrentApp],
  (currentApp) => currentApp.layoutInfo,
)
export const getClientWidgetLayoutInfo = createSelector(
  [layoutInfo],
  (layoutInfo) => {
    return isEmpty(layoutInfo.widgetsLayoutInfo)?
    {
      "root": {
          "displayName": "root",
          "parentNode": "",
          "widgetType": "DOT_PANEL",
          "childrenNode": [
              "page1"
          ],
          "containerType": "EDITOR_DOT_PANEL",
          "layoutInfo": {
              "x": -1,
              "y": -1,
              "z": 0,
              "w": 0,
              "h": 0,
              "minW": 1,
              "minH": 0
          }
      },
      "page1": {
          "displayName": "page1",
          "parentNode": "root",
          "widgetType": "PAGE_NODE",
          "childrenNode": [
              "bodySection1",
              "modalSection1"
          ],
          "containerType": "EDITOR_PAGE_SQUARE",
          "layoutInfo": {
              "x": -1,
              "y": -1,
              "z": 0,
              "w": 0,
              "h": 0,
              "minW": 1,
              "minH": 0
          }
      },
      "bodySection1": {
          "displayName": "bodySection1",
          "parentNode": "page1",
          "widgetType": "SECTION_NODE",
          "childrenNode": [
              "bodySection1-bodySectionContainer1"
          ],
          "containerType": "EDITOR_LAYOUT_SQUARE",
          "layoutInfo": {
              "x": -1,
              "y": -1,
              "z": 0,
              "w": 0,
              "h": 0,
              "minW": 1,
              "minH": 0
          }
      },
      "bodySection1-bodySectionContainer1": {
          "displayName": "bodySection1-bodySectionContainer1",
          "parentNode": "bodySection1",
          "widgetType": "CONTAINER_NODE",
          "childrenNode": [],
          "containerType": "EDITOR_DOT_PANEL",
          "layoutInfo": {
              "x": -1,
              "y": -1,
              "z": 0,
              "w": 0,
              "h": 0,
              "minW": 1,
              "minH": 0
          }
      },
      "modalSection1": {
          "displayName": "modalSection1",
          "parentNode": "page1",
          "widgetType": "MODAL_SECTION_NODE",
          "childrenNode": [],
          "containerType": "EDITOR_LAYOUT_SQUARE",
          "layoutInfo": {
              "x": -1,
              "y": -1,
              "z": 0,
              "w": 0,
              "h": 0,
              "minW": 1,
              "minH": 0
          }
      }
  }:layoutInfo.widgetsLayoutInfo;
  
  }
)

export const layout2 = {
    "appInfo": {}, "actions": [], "components": {
        "root": {
            "mode": "page",
            "templateName": "layout2",
            "version": 0, "displayName": "root", "parentNode": "", "showName": "root", "childrenNode": ["page1"], "type": "DOT_PANEL", "containerType": "EDITOR_DOT_PANEL", "h": 0, "w": 0, "minH": 0, "minW": 0, "x": -1, "y": -1, "z": 0, "props": { "currentPageIndex": 0, "pageSortedKey": ["page1"] }
        }, "page1": { "version": 0, "displayName": "page1", "parentNode": "root", "showName": "page", "childrenNode": ["bodySection1"], "type": "PAGE_NODE", "containerType": "EDITOR_PAGE_SQUARE", "h": 0, "w": 0, "minH": 0, "minW": 0, "x": -1, "y": -1, "z": 0, "props": { "layout": "default" } }, "bodySection1": { "version": 0, "displayName": "bodySection1", "parentNode": "page1", "showName": "bodySection", "childrenNode": ["bodySection1-bodySectionContainer1"], "type": "SECTION_NODE", "containerType": "EDITOR_LAYOUT_SQUARE", "h": 0, "w": 0, "minH": 0, "minW": 0, "x": -1, "y": -1, "z": 0, "props": { "currentViewIndex": 0, "defaultViewKey": "sub-page1", "sectionViewConfigs": [{ "id": "9ac3c766-3320-4f0f-a119-cd57b621127b", "key": "sub-page1", "path": "sub-page1", "viewDisplayName": "bodySection1-bodySectionContainer1" }], "style": { "padding": { "mode": "all", "size": "24" } }, "viewSortedKey": ["bodySection1-bodySectionContainer1"] } }, "bodySection1-bodySectionContainer1": { "version": 0, "displayName": "bodySection1-bodySectionContainer1", "parentNode": "bodySection1", "showName": "bodySection1-bodySectionContainer1", "childrenNode": ["impakt_GridContainer1"], "type": "CONTAINER_NODE", "containerType": "EDITOR_DOT_PANEL", "h": 0, "w": 0, "minH": 0, "minW": 0, "x": -1, "y": -1, "z": 0, "props": {} }, "impakt_GridContainer1": { "w": 9, "h": 19, "minW": 1, "minH": 3, "x": 23, "y": 18, "z": 0, "showName": "GridContainer", "type": "GridCONTAINER_WIDGET", "displayName": "impakt_GridContainer1", "containerType": "EDITOR_SCALE_SQUARE", "parentNode": "bodySection1-bodySectionContainer1", "childrenNode": ["impakt_View1", "impakt_View2", "body", "impakt_View4"], "props": { "Mobile": { "columnSize": "1", "columnFraction": ["1fr"], "gridGap": 1 }, "Tablet": { "columnSize": "3", "columnFraction": ["1fr", "1fr", "1fr"], "gridGap": 4 }, "Desktop": { "columnSize": "6", "columnFraction": ["1fr", "1fr", "1fr", "1fr"], "gridGap": 10 }, "backgroundColor": "#ffggas", "radius": "0px", "dynamicHeight": "auto", "$dynamicAttrPaths": [] }, "version": 0 }, "impakt_View1": { "w": 0, "h": 0, "minW": 1, "x": -1, "y": -1, "z": 0, "columnSpan": 1, "rowSpan": 1, "startColumn": 1, "startRow": 1, "showName": "View", "type": "CANVAS", "containerType": "EDITOR_DOT_PANEL", "parentNode": "impakt_GridContainer1", "childrenNode": ["impakt_label1"], "displayName": "impakt_View1", "props": { "Desktop": { "columnSpan": "6" }, "$dynamicAttrPaths": [], "trueClasses": [{ "title": "bgPrimary", "value": "bgPrimary" }, { "title": "height40px", "value": "height40px" }] }, "version": 0 }, "impakt_label1": { "w": 1, "h": 5, "minW": 1, "minH": 3, "x": 0, "y": 5, "z": 0, "showName": "label", "type": "LABEL", "displayName": "impakt_label1", "containerType": "EDITOR_SCALE_SQUARE", "parentNode": "impakt_View1", "childrenNode": [], "props": { "label": "Layout-2", "variant": "body1", "color": "primary", "align": "center", "noWrap": "false", "Mobile": {}, "classes": [{ "title": "headerLabel", "value": "headerLabel" }], "sx": {}, "$dynamicAttrPaths": [], "trueClasses": [{ "title": "bgPrimary", "value": "bgPrimary" }] }, "version": 0 }, "impakt_View2": { "w": 0, "h": 0, "minW": 1, "x": -1, "y": -1, "z": 0, "columnSpan": 1, "rowSpan": 1, "startColumn": 1, "startRow": 1, "showName": "View", "type": "CANVAS", "containerType": "EDITOR_DOT_PANEL", "parentNode": "impakt_GridContainer1", "childrenNode": ["impakt_label2", "impakt_button1", "impakt_button2", "impakt_button3", "impakt_button4", "impakt_button5", "impakt_button6", "impakt_button7", "impakt_button8", "impakt_button9", "impakt_button10", "impakt_button11", "impakt_button12", "impakt_button13", "impakt_button14", "impakt_button15", "impakt_button16", "impakt_button17", "impakt_button18", "impakt_button19", "impakt_button20", "impakt_button21"], "displayName": "impakt_View2", "props": { "Desktop": { "columnSpan": "1", "rowSpan": "2" }, "$dynamicAttrPaths": [], "trueClasses": [{ "title": "calc40px", "value": "calc40px" }, { "title": "bgPrimary", "value": "bgPrimary" }] }, "version": 0 }, "impakt_label2": { "w": 1, "h": 6, "minW": 1, "minH": 3, "x": 0, "y": 33, "z": 0, "showName": "label", "type": "LABEL", "displayName": "impakt_label2", "containerType": "EDITOR_SCALE_SQUARE", "parentNode": "impakt_View2", "childrenNode": [], "props": { "label": "Masters", "variant": "body1", "color": "primary", "align": "center", "noWrap": "false", "Mobile": {}, "classes": [{ "title": "headerLabel", "value": "headerLabel" }], "sx": {}, "$dynamicAttrPaths": [], "trueClasses": [{ "title": "paddingSM", "value": "paddingSM" }] }, "version": 0 }, "impakt_button1": { "w": 1, "h": 5, "minW": 1, "minH": 3, "x": 0, "y": 39, "z": 0, "showName": "button", "type": "BUTTON_WIDGET", "displayName": "impakt_button1", "containerType": "EDITOR_SCALE_SQUARE", "parentNode": "impakt_View2", "childrenNode": [], "props": { "text": "Menu-1", "startIconName": "SearchIcon", "endIconName": "", "classes": [], "variant": null, "bgcolor": "", "txcolor": "", "hidden": false, "$dynamicAttrPaths": [] }, "version": 0 }, "impakt_button2": { "w": 1, "h": 5, "minW": 1, "minH": 3, "x": 0, "y": 44, "z": 0, "showName": "button", "type": "BUTTON_WIDGET", "displayName": "impakt_button2", "containerType": "EDITOR_SCALE_SQUARE", "parentNode": "impakt_View2", "childrenNode": [], "props": { "text": "Menu-1", "startIconName": "SearchIcon", "endIconName": "", "classes": [], "variant": null, "bgcolor": "", "txcolor": "", "hidden": false, "$dynamicAttrPaths": [] }, "version": 0 }, "impakt_button3": { "w": 1, "h": 5, "minW": 1, "minH": 3, "x": 0, "y": 10, "z": 0, "showName": "button", "type": "BUTTON_WIDGET", "displayName": "impakt_button3", "containerType": "EDITOR_SCALE_SQUARE", "parentNode": "impakt_View2", "childrenNode": [], "props": { "text": "Menu-1", "startIconName": "SearchIcon", "endIconName": "", "classes": [], "variant": null, "bgcolor": "", "txcolor": "", "hidden": false, "$dynamicAttrPaths": [] }, "version": 0 }, "impakt_button4": { "w": 1, "h": 5, "minW": 1, "minH": 3, "x": 0, "y": 13, "z": 0, "showName": "button", "type": "BUTTON_WIDGET", "displayName": "impakt_button4", "containerType": "EDITOR_SCALE_SQUARE", "parentNode": "impakt_View2", "childrenNode": [], "props": { "text": "Menu-1", "startIconName": "SearchIcon", "endIconName": "", "classes": [], "variant": null, "bgcolor": "", "txcolor": "", "hidden": false, "$dynamicAttrPaths": [] }, "version": 0 }, "impakt_button5": { "w": 1, "h": 5, "minW": 1, "minH": 3, "x": 0, "y": 15, "z": 0, "showName": "button", "type": "BUTTON_WIDGET", "displayName": "impakt_button5", "containerType": "EDITOR_SCALE_SQUARE", "parentNode": "impakt_View2", "childrenNode": [], "props": { "text": "Menu-1", "startIconName": "SearchIcon", "endIconName": "", "classes": [], "variant": null, "bgcolor": "", "txcolor": "", "hidden": false, "$dynamicAttrPaths": [] }, "version": 0 }, "impakt_button6": { "w": 1, "h": 5, "minW": 1, "minH": 3, "x": 0, "y": 16, "z": 0, "showName": "button", "type": "BUTTON_WIDGET", "displayName": "impakt_button6", "containerType": "EDITOR_SCALE_SQUARE", "parentNode": "impakt_View2", "childrenNode": [], "props": { "text": "Menu-1", "startIconName": "SearchIcon", "endIconName": "", "classes": [], "variant": null, "bgcolor": "", "txcolor": "", "hidden": false, "$dynamicAttrPaths": [] }, "version": 0 }, "impakt_button7": { "w": 1, "h": 5, "minW": 1, "minH": 3, "x": 0, "y": 19, "z": 0, "showName": "button", "type": "BUTTON_WIDGET", "displayName": "impakt_button7", "containerType": "EDITOR_SCALE_SQUARE", "parentNode": "impakt_View2", "childrenNode": [], "props": { "text": "Menu-1", "startIconName": "SearchIcon", "endIconName": "", "classes": [], "variant": null, "bgcolor": "", "txcolor": "", "hidden": false, "$dynamicAttrPaths": [] }, "version": 0 }, "impakt_button8": { "w": 1, "h": 5, "minW": 1, "minH": 3, "x": 0, "y": 23, "z": 0, "showName": "button", "type": "BUTTON_WIDGET", "displayName": "impakt_button8", "containerType": "EDITOR_SCALE_SQUARE", "parentNode": "impakt_View2", "childrenNode": [], "props": { "text": "Menu-1", "startIconName": "SearchIcon", "endIconName": "", "classes": [], "variant": null, "bgcolor": "", "txcolor": "", "hidden": false, "$dynamicAttrPaths": [] }, "version": 0 }, "impakt_button9": { "w": 1, "h": 5, "minW": 1, "minH": 3, "x": 0, "y": 25, "z": 0, "showName": "button", "type": "BUTTON_WIDGET", "displayName": "impakt_button9", "containerType": "EDITOR_SCALE_SQUARE", "parentNode": "impakt_View2", "childrenNode": [], "props": { "text": "Menu-1", "startIconName": "SearchIcon", "endIconName": "", "classes": [], "variant": null, "bgcolor": "", "txcolor": "", "hidden": false, "$dynamicAttrPaths": [] }, "version": 0 }, "impakt_button10": { "w": 1, "h": 5, "minW": 1, "minH": 3, "x": 0, "y": 28, "z": 0, "showName": "button", "type": "BUTTON_WIDGET", "displayName": "impakt_button10", "containerType": "EDITOR_SCALE_SQUARE", "parentNode": "impakt_View2", "childrenNode": [], "props": { "text": "Menu-1", "startIconName": "SearchIcon", "endIconName": "", "classes": [], "variant": null, "bgcolor": "", "txcolor": "", "hidden": false, "$dynamicAttrPaths": [] }, "version": 0 }, "impakt_button11": { "w": 1, "h": 5, "minW": 1, "minH": 3, "x": 0, "y": 21, "z": 0, "showName": "button", "type": "BUTTON_WIDGET", "displayName": "impakt_button11", "containerType": "EDITOR_SCALE_SQUARE", "parentNode": "impakt_View2", "childrenNode": [], "props": { "text": "Menu-1", "startIconName": "SearchIcon", "endIconName": "", "classes": [], "variant": null, "bgcolor": "", "txcolor": "", "hidden": false, "$dynamicAttrPaths": [] }, "version": 0 }, "impakt_button12": { "w": 1, "h": 5, "minW": 1, "minH": 3, "x": 0, "y": 32, "z": 0, "showName": "button", "type": "BUTTON_WIDGET", "displayName": "impakt_button12", "containerType": "EDITOR_SCALE_SQUARE", "parentNode": "impakt_View2", "childrenNode": [], "props": { "text": "Menu-1", "startIconName": "SearchIcon", "endIconName": "", "classes": [], "variant": null, "bgcolor": "", "txcolor": "", "hidden": false, "$dynamicAttrPaths": [] }, "version": 0 }, "impakt_button13": { "w": 1, "h": 5, "minW": 1, "minH": 3, "x": 0, "y": 35, "z": 0, "showName": "button", "type": "BUTTON_WIDGET", "displayName": "impakt_button13", "containerType": "EDITOR_SCALE_SQUARE", "parentNode": "impakt_View2", "childrenNode": [], "props": { "text": "Menu-1", "startIconName": "SearchIcon", "endIconName": "", "classes": [], "variant": null, "bgcolor": "", "txcolor": "", "hidden": false, "$dynamicAttrPaths": [] }, "version": 0 }, "impakt_button14": { "w": 1, "h": 5, "minW": 1, "minH": 3, "x": 0, "y": 38, "z": 0, "showName": "button", "type": "BUTTON_WIDGET", "displayName": "impakt_button14", "containerType": "EDITOR_SCALE_SQUARE", "parentNode": "impakt_View2", "childrenNode": [], "props": { "text": "Menu-1", "startIconName": "SearchIcon", "endIconName": "", "classes": [], "variant": null, "bgcolor": "", "txcolor": "", "hidden": false, "$dynamicAttrPaths": [] }, "version": 0 }, "impakt_button15": { "w": 1, "h": 5, "minW": 1, "minH": 3, "x": 0, "y": 37, "z": 0, "showName": "button", "type": "BUTTON_WIDGET", "displayName": "impakt_button15", "containerType": "EDITOR_SCALE_SQUARE", "parentNode": "impakt_View2", "childrenNode": [], "props": { "text": "Menu-1", "startIconName": "SearchIcon", "endIconName": "", "classes": [], "variant": null, "bgcolor": "", "txcolor": "", "hidden": false, "$dynamicAttrPaths": [] }, "version": 0 }, "impakt_button16": { "w": 1, "h": 5, "minW": 1, "minH": 3, "x": 0, "y": 37, "z": 0, "showName": "button", "type": "BUTTON_WIDGET", "displayName": "impakt_button16", "containerType": "EDITOR_SCALE_SQUARE", "parentNode": "impakt_View2", "childrenNode": [], "props": { "text": "Menu-1", "startIconName": "SearchIcon", "endIconName": "", "classes": [], "variant": null, "bgcolor": "", "txcolor": "", "hidden": false, "$dynamicAttrPaths": [] }, "version": 0 }, "impakt_button17": { "w": 1, "h": 5, "minW": 1, "minH": 3, "x": 0, "y": 36, "z": 0, "showName": "button", "type": "BUTTON_WIDGET", "displayName": "impakt_button17", "containerType": "EDITOR_SCALE_SQUARE", "parentNode": "impakt_View2", "childrenNode": [], "props": { "text": "Menu-1", "startIconName": "SearchIcon", "endIconName": "", "classes": [], "variant": null, "bgcolor": "", "txcolor": "", "hidden": false, "$dynamicAttrPaths": [] }, "version": 0 }, "impakt_button18": { "w": 1, "h": 5, "minW": 1, "minH": 3, "x": 0, "y": 37, "z": 0, "showName": "button", "type": "BUTTON_WIDGET", "displayName": "impakt_button18", "containerType": "EDITOR_SCALE_SQUARE", "parentNode": "impakt_View2", "childrenNode": [], "props": { "text": "Menu-1", "startIconName": "SearchIcon", "endIconName": "", "classes": [], "variant": null, "bgcolor": "", "txcolor": "", "hidden": false, "$dynamicAttrPaths": [] }, "version": 0 }, "impakt_button19": { "w": 1, "h": 5, "minW": 1, "minH": 3, "x": 0, "y": 38, "z": 0, "showName": "button", "type": "BUTTON_WIDGET", "displayName": "impakt_button19", "containerType": "EDITOR_SCALE_SQUARE", "parentNode": "impakt_View2", "childrenNode": [], "props": { "text": "Menu-1", "startIconName": "SearchIcon", "endIconName": "", "classes": [], "variant": null, "bgcolor": "", "txcolor": "", "hidden": false, "$dynamicAttrPaths": [] }, "version": 0 }, "impakt_button20": { "w": 1, "h": 5, "minW": 1, "minH": 3, "x": 0, "y": 77, "z": 0, "showName": "button", "type": "BUTTON_WIDGET", "displayName": "impakt_button20", "containerType": "EDITOR_SCALE_SQUARE", "parentNode": "impakt_View2", "childrenNode": [], "props": { "text": "Menu-1", "startIconName": "SearchIcon", "endIconName": "", "classes": [], "variant": null, "bgcolor": "", "txcolor": "", "hidden": false, "$dynamicAttrPaths": [] }, "version": 0 }, "impakt_button21": { "w": 1, "h": 5, "minW": 1, "minH": 3, "x": 0, "y": 42, "z": 0, "showName": "button", "type": "BUTTON_WIDGET", "displayName": "impakt_button21", "containerType": "EDITOR_SCALE_SQUARE", "parentNode": "impakt_View2", "childrenNode": [], "props": { "text": "Menu-1", "startIconName": "SearchIcon", "endIconName": "", "classes": [], "variant": null, "bgcolor": "", "txcolor": "", "hidden": false, "$dynamicAttrPaths": [] }, "version": 0 }, "body": { "w": 0, "h": 0, "minW": 1, "x": -1, "y": -1, "z": 0, "columnSpan": 1, "rowSpan": 1, "startColumn": 1, "startRow": 1, "showName": "View", "type": "CANVAS", "containerType": "EDITOR_DOT_PANEL", "parentNode": "impakt_GridContainer1", "childrenNode": [], "displayName": "body", "props": { "Desktop": { "columnSpan": "5" }, "$dynamicAttrPaths": [], "trueClasses": [{ "title": "height100Vh", "value": "height100Vh" }] }, "version": 0 }, "impakt_View4": { "w": 0, "h": 0, "minW": 1, "x": -1, "y": -1, "z": 0, "columnSpan": 1, "rowSpan": 1, "startColumn": 1, "startRow": 1, "showName": "View", "type": "CANVAS", "containerType": "EDITOR_DOT_PANEL", "parentNode": "impakt_GridContainer1", "childrenNode": ["impakt_label3"], "displayName": "impakt_View4", "props": { "Desktop": { "columnSpan": "5" }, "$dynamicAttrPaths": [], "trueClasses": [{ "title": "height60px", "value": "height60px" }, { "title": "bgPrimary", "value": "bgPrimary" }] }, "version": 0 }, "impakt_label3": { "w": 1, "h": 5, "minW": 1, "minH": 3, "x": 0, "y": 0, "z": 0, "showName": "label", "type": "LABEL", "displayName": "impakt_label3", "containerType": "EDITOR_SCALE_SQUARE", "parentNode": "impakt_View4", "childrenNode": [], "props": { "label": "Footer -2", "variant": "body1", "color": "primary", "align": "center", "noWrap": "false", "Mobile": {}, "classes": [{ "title": "headerLabel", "value": "headerLabel" }], "sx": {}, "$dynamicAttrPaths": [], "trueClasses": [{ "title": "bgPrimary", "value": "bgPrimary" }] }, "version": 0 }
    }, "dependenciesState": {}, "dragShadowState": {}, "dottedLineSquareState": {}, "displayNameState": []
};
export const layout1 = {
    "appInfo": {}, "actions": [], "components": {
        "root": {
            "version": 0,
            "mode": "page",
            "templateName": "layout1",
            "displayName": "root", "parentNode": "", "showName": "root", "childrenNode": ["page1"], "type": "DOT_PANEL", "containerType": "EDITOR_DOT_PANEL", "h": 0, "w": 0, "minH": 0, "minW": 0, "x": -1, "y": -1, "z": 0, "props": { "currentPageIndex": 0, "pageSortedKey": ["page1"] }
        }, "page1": { "version": 0, "displayName": "page1", "parentNode": "root", "showName": "page", "childrenNode": ["bodySection1"], "type": "PAGE_NODE", "containerType": "EDITOR_PAGE_SQUARE", "h": 0, "w": 0, "minH": 0, "minW": 0, "x": -1, "y": -1, "z": 0, "props": { "layout": "default" } }, "bodySection1": { "version": 0, "displayName": "bodySection1", "parentNode": "page1", "showName": "bodySection", "childrenNode": ["bodySection1-bodySectionContainer1"], "type": "SECTION_NODE", "containerType": "EDITOR_LAYOUT_SQUARE", "h": 0, "w": 0, "minH": 0, "minW": 0, "x": -1, "y": -1, "z": 0, "props": { "currentViewIndex": 0, "defaultViewKey": "sub-page1", "sectionViewConfigs": [{ "id": "9ac3c766-3320-4f0f-a119-cd57b621127b", "key": "sub-page1", "path": "sub-page1", "viewDisplayName": "bodySection1-bodySectionContainer1" }], "style": { "padding": { "mode": "all", "size": "24" } }, "viewSortedKey": ["bodySection1-bodySectionContainer1"] } }, "bodySection1-bodySectionContainer1": { "version": 0, "displayName": "bodySection1-bodySectionContainer1", "parentNode": "bodySection1", "showName": "bodySection1-bodySectionContainer1", "childrenNode": ["impakt_GridContainer1"], "type": "CONTAINER_NODE", "containerType": "EDITOR_DOT_PANEL", "h": 0, "w": 0, "minH": 0, "minW": 0, "x": -1, "y": -1, "z": 0, "props": {} }, "impakt_GridContainer1": { "w": 7, "h": 19, "minW": 1, "minH": 3, "x": 25, "y": 19, "z": 0, "showName": "GridContainer", "type": "GridCONTAINER_WIDGET", "displayName": "impakt_GridContainer1", "containerType": "EDITOR_SCALE_SQUARE", "parentNode": "bodySection1-bodySectionContainer1", "childrenNode": ["impakt_View1", "impakt_View2", "body", "impakt_View4"], "props": { "Mobile": { "columnSize": "1", "columnFraction": ["1fr"], "gridGap": 1 }, "Tablet": { "columnSize": "3", "columnFraction": ["1fr", "1fr", "1fr"], "gridGap": 4 }, "Desktop": { "columnSize": "6", "columnFraction": ["1fr", "1fr", "1fr", "1fr"], "gridGap": 10 }, "backgroundColor": "#ffggas", "radius": "0px", "dynamicHeight": "auto", "$dynamicAttrPaths": [] }, "version": 0 }, "impakt_View1": { "w": 0, "h": 0, "minW": 1, "x": -1, "y": -1, "z": 0, "columnSpan": 1, "rowSpan": 1, "startColumn": 1, "startRow": 1, "showName": "View", "type": "CANVAS", "containerType": "EDITOR_DOT_PANEL", "parentNode": "impakt_GridContainer1", "childrenNode": ["impakt_label1"], "displayName": "impakt_View1", "props": { "Desktop": { "columnSpan": "6" }, "$dynamicAttrPaths": [], "trueClasses": [{ "title": "bgPrimary", "value": "bgPrimary" }] }, "version": 0 }, "impakt_View2": { "w": 0, "h": 0, "minW": 1, "x": -1, "y": -1, "z": 0, "columnSpan": 1, "rowSpan": 1, "startColumn": 1, "startRow": 1, "showName": "View", "type": "CANVAS", "containerType": "EDITOR_DOT_PANEL", "parentNode": "impakt_GridContainer1", "childrenNode": ["impakt_button1", "impakt_button2", "impakt_button3", "impakt_button4", "impakt_button5", "impakt_button6", "impakt_button7", "impakt_button8", "impakt_button9", "impakt_button10", "impakt_button11", "impakt_button12", "impakt_button13", "impakt_button14", "impakt_button15", "impakt_button16", "impakt_button17", "impakt_button18", "impakt_button19"], "displayName": "impakt_View2", "props": { "trueClasses": [{ "title": "bgPrimary", "value": "bgPrimary" }, { "title": "height100Vh", "value": "height100Vh" }], "$dynamicAttrPaths": [], "Desktop": { "rowSpan": "2" } }, "version": 0 }, "body": { "w": 0, "h": 0, "minW": 1, "x": -1, "y": -1, "z": 0, "columnSpan": 1, "rowSpan": 1, "startColumn": 1, "startRow": 1, "showName": "View", "type": "CANVAS", "containerType": "EDITOR_DOT_PANEL", "parentNode": "impakt_GridContainer1", "childrenNode": [], "displayName": "body", "props": { "Desktop": { "columnSpan": "5" }, "$dynamicAttrPaths": [], "trueClasses": [{ "title": "calc40px", "value": "calc40px" }] }, "version": 0 }, "impakt_View4": { "w": 0, "h": 0, "minW": 1, "x": -1, "y": -1, "z": 0, "columnSpan": 1, "rowSpan": 1, "startColumn": 1, "startRow": 1, "showName": "View", "type": "CANVAS", "containerType": "EDITOR_DOT_PANEL", "parentNode": "impakt_GridContainer1", "childrenNode": ["impakt_label2"], "displayName": "impakt_View4", "props": { "trueClasses": [{ "title": "bgPrimary", "value": "bgPrimary" }, { "title": "height40px", "value": "height40px" }], "$dynamicAttrPaths": [], "Desktop": { "columnSpan": "5" } }, "version": 0 }, "impakt_label1": { "w": 1, "h": 5, "minW": 1, "minH": 3, "x": 0, "y": 9, "z": 0, "showName": "label", "type": "LABEL", "displayName": "impakt_label1", "containerType": "EDITOR_SCALE_SQUARE", "parentNode": "impakt_View1", "childrenNode": [], "props": { "label": "Layout - 1", "variant": "body1", "color": "primary", "align": "center", "noWrap": "false", "Mobile": {}, "classes": [{ "title": "headerLabel", "value": "headerLabel" }], "sx": {}, "$dynamicAttrPaths": [], "trueClasses": [{ "title": "bgPrimary", "value": "bgPrimary" }] }, "version": 0 }, "impakt_button1": { "w": 1, "h": 5, "minW": 1, "minH": 3, "x": 0, "y": 17, "z": 0, "showName": "button", "type": "BUTTON_WIDGET", "displayName": "impakt_button1", "containerType": "EDITOR_SCALE_SQUARE", "parentNode": "impakt_View2", "childrenNode": [], "props": { "text": "Menu", "startIconName": "MenuIcon", "endIconName": "", "classes": [], "variant": "text", "bgcolor": "#0b1117ff", "txcolor": "#27333eff", "hidden": false, "$dynamicAttrPaths": [], "trueClasses": [{ "title": "bgPrimary", "value": "bgPrimary" }, { "title": "bgSecondary", "value": "bgSecondary" }] }, "version": 0 }, "impakt_label2": { "w": 1, "h": 5, "minW": 1, "minH": 3, "x": 0, "y": 1, "z": 0, "showName": "label", "type": "LABEL", "displayName": "impakt_label2", "containerType": "EDITOR_SCALE_SQUARE", "parentNode": "impakt_View4", "childrenNode": [], "props": { "label": "Footer", "variant": "body1", "color": "primary", "align": "center", "noWrap": "false", "Mobile": {}, "classes": [{ "title": "headerLabel", "value": "headerLabel" }], "sx": {}, "$dynamicAttrPaths": [], "trueClasses": [{ "title": "bgPrimary", "value": "bgPrimary" }] }, "version": 0 }, "impakt_button2": { "w": 1, "h": 5, "minW": 1, "minH": 3, "x": 0, "y": 5, "z": 0, "showName": "button", "type": "BUTTON_WIDGET", "displayName": "impakt_button2", "containerType": "EDITOR_SCALE_SQUARE", "parentNode": "impakt_View2", "childrenNode": [], "props": { "text": "Menu", "startIconName": "MenuIcon", "endIconName": "", "classes": [], "variant": "text", "bgcolor": "#0b1117ff", "txcolor": "#27333eff", "hidden": false, "$dynamicAttrPaths": [], "trueClasses": [{ "title": "bgPrimary", "value": "bgPrimary" }, { "title": "bgSecondary", "value": "bgSecondary" }] }, "version": 0 }, "impakt_button3": { "w": 1, "h": 5, "minW": 1, "minH": 3, "x": 0, "y": 4, "z": 0, "showName": "button", "type": "BUTTON_WIDGET", "displayName": "impakt_button3", "containerType": "EDITOR_SCALE_SQUARE", "parentNode": "impakt_View2", "childrenNode": [], "props": { "text": "Menu", "startIconName": "MenuIcon", "endIconName": "", "classes": [], "variant": "text", "bgcolor": "#0b1117ff", "txcolor": "#27333eff", "hidden": false, "$dynamicAttrPaths": [], "trueClasses": [{ "title": "bgPrimary", "value": "bgPrimary" }, { "title": "bgSecondary", "value": "bgSecondary" }] }, "version": 0 }, "impakt_button4": { "w": 1, "h": 5, "minW": 1, "minH": 3, "x": 0, "y": 7, "z": 0, "showName": "button", "type": "BUTTON_WIDGET", "displayName": "impakt_button4", "containerType": "EDITOR_SCALE_SQUARE", "parentNode": "impakt_View2", "childrenNode": [], "props": { "text": "Menu", "startIconName": "MenuIcon", "endIconName": "", "classes": [], "variant": "text", "bgcolor": "#0b1117ff", "txcolor": "#27333eff", "hidden": false, "$dynamicAttrPaths": [], "trueClasses": [{ "title": "bgPrimary", "value": "bgPrimary" }, { "title": "bgSecondary", "value": "bgSecondary" }] }, "version": 0 }, "impakt_button5": { "w": 1, "h": 5, "minW": 1, "minH": 3, "x": 0, "y": 12, "z": 0, "showName": "button", "type": "BUTTON_WIDGET", "displayName": "impakt_button5", "containerType": "EDITOR_SCALE_SQUARE", "parentNode": "impakt_View2", "childrenNode": [], "props": { "text": "Menu", "startIconName": "MenuIcon", "endIconName": "", "classes": [], "variant": "text", "bgcolor": "#0b1117ff", "txcolor": "#27333eff", "hidden": false, "$dynamicAttrPaths": [], "trueClasses": [{ "title": "bgPrimary", "value": "bgPrimary" }, { "title": "bgSecondary", "value": "bgSecondary" }] }, "version": 0 }, "impakt_button6": { "w": 1, "h": 5, "minW": 1, "minH": 3, "x": 0, "y": 17, "z": 0, "showName": "button", "type": "BUTTON_WIDGET", "displayName": "impakt_button6", "containerType": "EDITOR_SCALE_SQUARE", "parentNode": "impakt_View2", "childrenNode": [], "props": { "text": "Menu", "startIconName": "MenuIcon", "endIconName": "", "classes": [], "variant": "text", "bgcolor": "#0b1117ff", "txcolor": "#27333eff", "hidden": false, "$dynamicAttrPaths": [], "trueClasses": [{ "title": "bgPrimary", "value": "bgPrimary" }, { "title": "bgSecondary", "value": "bgSecondary" }] }, "version": 0 }, "impakt_button7": { "w": 1, "h": 5, "minW": 1, "minH": 3, "x": 0, "y": 18, "z": 0, "showName": "button", "type": "BUTTON_WIDGET", "displayName": "impakt_button7", "containerType": "EDITOR_SCALE_SQUARE", "parentNode": "impakt_View2", "childrenNode": [], "props": { "text": "Menu", "startIconName": "MenuIcon", "endIconName": "", "classes": [], "variant": "text", "bgcolor": "#0b1117ff", "txcolor": "#27333eff", "hidden": false, "$dynamicAttrPaths": [], "trueClasses": [{ "title": "bgPrimary", "value": "bgPrimary" }, { "title": "bgSecondary", "value": "bgSecondary" }] }, "version": 0 }, "impakt_button8": { "w": 1, "h": 5, "minW": 1, "minH": 3, "x": 0, "y": 18, "z": 0, "showName": "button", "type": "BUTTON_WIDGET", "displayName": "impakt_button8", "containerType": "EDITOR_SCALE_SQUARE", "parentNode": "impakt_View2", "childrenNode": [], "props": { "text": "Menu", "startIconName": "MenuIcon", "endIconName": "", "classes": [], "variant": "text", "bgcolor": "#0b1117ff", "txcolor": "#27333eff", "hidden": false, "$dynamicAttrPaths": [], "trueClasses": [{ "title": "bgPrimary", "value": "bgPrimary" }, { "title": "bgSecondary", "value": "bgSecondary" }] }, "version": 0 }, "impakt_button9": { "w": 1, "h": 5, "minW": 1, "minH": 3, "x": 0, "y": 21, "z": 0, "showName": "button", "type": "BUTTON_WIDGET", "displayName": "impakt_button9", "containerType": "EDITOR_SCALE_SQUARE", "parentNode": "impakt_View2", "childrenNode": [], "props": { "text": "Menu", "startIconName": "MenuIcon", "endIconName": "", "classes": [], "variant": "text", "bgcolor": "#0b1117ff", "txcolor": "#27333eff", "hidden": false, "$dynamicAttrPaths": [], "trueClasses": [{ "title": "bgPrimary", "value": "bgPrimary" }, { "title": "bgSecondary", "value": "bgSecondary" }] }, "version": 0 }, "impakt_button10": { "w": 1, "h": 5, "minW": 1, "minH": 3, "x": 0, "y": 17, "z": 0, "showName": "button", "type": "BUTTON_WIDGET", "displayName": "impakt_button10", "containerType": "EDITOR_SCALE_SQUARE", "parentNode": "impakt_View2", "childrenNode": [], "props": { "text": "Menu", "startIconName": "MenuIcon", "endIconName": "", "classes": [], "variant": "text", "bgcolor": "#0b1117ff", "txcolor": "#27333eff", "hidden": false, "$dynamicAttrPaths": [], "trueClasses": [{ "title": "bgPrimary", "value": "bgPrimary" }, { "title": "bgSecondary", "value": "bgSecondary" }] }, "version": 0 }, "impakt_button11": { "w": 1, "h": 5, "minW": 1, "minH": 3, "x": 0, "y": 21, "z": 0, "showName": "button", "type": "BUTTON_WIDGET", "displayName": "impakt_button11", "containerType": "EDITOR_SCALE_SQUARE", "parentNode": "impakt_View2", "childrenNode": [], "props": { "text": "Menu", "startIconName": "MenuIcon", "endIconName": "", "classes": [], "variant": "text", "bgcolor": "#0b1117ff", "txcolor": "#27333eff", "hidden": false, "$dynamicAttrPaths": [], "trueClasses": [{ "title": "bgPrimary", "value": "bgPrimary" }, { "title": "bgSecondary", "value": "bgSecondary" }] }, "version": 0 }, "impakt_button12": { "w": 1, "h": 5, "minW": 1, "minH": 3, "x": 0, "y": 20, "z": 0, "showName": "button", "type": "BUTTON_WIDGET", "displayName": "impakt_button12", "containerType": "EDITOR_SCALE_SQUARE", "parentNode": "impakt_View2", "childrenNode": [], "props": { "text": "Menu", "startIconName": "MenuIcon", "endIconName": "", "classes": [], "variant": "text", "bgcolor": "#0b1117ff", "txcolor": "#27333eff", "hidden": false, "$dynamicAttrPaths": [], "trueClasses": [{ "title": "bgPrimary", "value": "bgPrimary" }, { "title": "bgSecondary", "value": "bgSecondary" }] }, "version": 0 }, "impakt_button13": { "w": 1, "h": 5, "minW": 1, "minH": 3, "x": 0, "y": 17, "z": 0, "showName": "button", "type": "BUTTON_WIDGET", "displayName": "impakt_button13", "containerType": "EDITOR_SCALE_SQUARE", "parentNode": "impakt_View2", "childrenNode": [], "props": { "text": "Menu", "startIconName": "MenuIcon", "endIconName": "", "classes": [], "variant": "text", "bgcolor": "#0b1117ff", "txcolor": "#27333eff", "hidden": false, "$dynamicAttrPaths": [], "trueClasses": [{ "title": "bgPrimary", "value": "bgPrimary" }, { "title": "bgSecondary", "value": "bgSecondary" }] }, "version": 0 }, "impakt_button14": { "w": 1, "h": 5, "minW": 1, "minH": 3, "x": 0, "y": 23, "z": 0, "showName": "button", "type": "BUTTON_WIDGET", "displayName": "impakt_button14", "containerType": "EDITOR_SCALE_SQUARE", "parentNode": "impakt_View2", "childrenNode": [], "props": { "text": "Menu", "startIconName": "MenuIcon", "endIconName": "", "classes": [], "variant": "text", "bgcolor": "#0b1117ff", "txcolor": "#27333eff", "hidden": false, "$dynamicAttrPaths": [], "trueClasses": [{ "title": "bgPrimary", "value": "bgPrimary" }, { "title": "bgSecondary", "value": "bgSecondary" }] }, "version": 0 }, "impakt_button15": { "w": 1, "h": 5, "minW": 1, "minH": 3, "x": 0, "y": 26, "z": 0, "showName": "button", "type": "BUTTON_WIDGET", "displayName": "impakt_button15", "containerType": "EDITOR_SCALE_SQUARE", "parentNode": "impakt_View2", "childrenNode": [], "props": { "text": "Menu", "startIconName": "MenuIcon", "endIconName": "", "classes": [], "variant": "text", "bgcolor": "#0b1117ff", "txcolor": "#27333eff", "hidden": false, "$dynamicAttrPaths": [], "trueClasses": [{ "title": "bgPrimary", "value": "bgPrimary" }, { "title": "bgSecondary", "value": "bgSecondary" }] }, "version": 0 }, "impakt_button16": { "w": 1, "h": 5, "minW": 1, "minH": 3, "x": 0, "y": 28, "z": 0, "showName": "button", "type": "BUTTON_WIDGET", "displayName": "impakt_button16", "containerType": "EDITOR_SCALE_SQUARE", "parentNode": "impakt_View2", "childrenNode": [], "props": { "text": "Menu", "startIconName": "MenuIcon", "endIconName": "", "classes": [], "variant": "text", "bgcolor": "#0b1117ff", "txcolor": "#27333eff", "hidden": false, "$dynamicAttrPaths": [], "trueClasses": [{ "title": "bgPrimary", "value": "bgPrimary" }, { "title": "bgSecondary", "value": "bgSecondary" }] }, "version": 0 }, "impakt_button17": { "w": 1, "h": 5, "minW": 1, "minH": 3, "x": 0, "y": 31, "z": 0, "showName": "button", "type": "BUTTON_WIDGET", "displayName": "impakt_button17", "containerType": "EDITOR_SCALE_SQUARE", "parentNode": "impakt_View2", "childrenNode": [], "props": { "text": "Menu", "startIconName": "MenuIcon", "endIconName": "", "classes": [], "variant": "text", "bgcolor": "#0b1117ff", "txcolor": "#27333eff", "hidden": false, "$dynamicAttrPaths": [], "trueClasses": [{ "title": "bgPrimary", "value": "bgPrimary" }, { "title": "bgSecondary", "value": "bgSecondary" }] }, "version": 0 }, "impakt_button18": { "w": 1, "h": 5, "minW": 1, "minH": 3, "x": 0, "y": 30, "z": 0, "showName": "button", "type": "BUTTON_WIDGET", "displayName": "impakt_button18", "containerType": "EDITOR_SCALE_SQUARE", "parentNode": "impakt_View2", "childrenNode": [], "props": { "text": "Menu", "startIconName": "MenuIcon", "endIconName": "", "classes": [], "variant": "text", "bgcolor": "#0b1117ff", "txcolor": "#27333eff", "hidden": false, "$dynamicAttrPaths": [], "trueClasses": [{ "title": "bgPrimary", "value": "bgPrimary" }, { "title": "bgSecondary", "value": "bgSecondary" }] }, "version": 0 }, "impakt_button19": { "w": 1, "h": 5, "minW": 1, "minH": 3, "x": 0, "y": 31, "z": 0, "showName": "button", "type": "BUTTON_WIDGET", "displayName": "impakt_button19", "containerType": "EDITOR_SCALE_SQUARE", "parentNode": "impakt_View2", "childrenNode": [], "props": { "text": "Menu", "startIconName": "MenuIcon", "endIconName": "", "classes": [], "variant": "text", "bgcolor": "#0b1117ff", "txcolor": "#27333eff", "hidden": false, "$dynamicAttrPaths": [], "trueClasses": [{ "title": "bgPrimary", "value": "bgPrimary" }, { "title": "bgSecondary", "value": "bgSecondary" }] }, "version": 0 }
    }, "dependenciesState": {}, "dragShadowState": {}, "dottedLineSquareState": {}, "displayNameState": []
};
export const defaultLayout = {
    "appInfo": {}, "actions": [], "components": {
        "root": {
            "mode": "template",
             "templateName": "layout2",
            "version": 0, "displayName": "root", "parentNode": "", "showName": "root", "childrenNode": ["page1"], "type": "DOT_PANEL", "containerType": "EDITOR_DOT_PANEL", "h": 0, "w": 0, "minH": 0, "minW": 0, "x": -1, "y": -1, "z": 0, "props": { "currentPageIndex": 0, "pageSortedKey": ["page1"] }
        }, "page1": { "version": 0, "displayName": "page1", "parentNode": "root", "showName": "page", "childrenNode": ["bodySection1"], "type": "PAGE_NODE", "containerType": "EDITOR_PAGE_SQUARE", "h": 0, "w": 0, "minH": 0, "minW": 0, "x": -1, "y": -1, "z": 0, "props": { "layout": "default" } }, "bodySection1": { "version": 0, "displayName": "bodySection1", "parentNode": "page1", "showName": "bodySection", "childrenNode": ["bodySection1-bodySectionContainer1"], "type": "SECTION_NODE", "containerType": "EDITOR_LAYOUT_SQUARE", "h": 0, "w": 0, "minH": 0, "minW": 0, "x": -1, "y": -1, "z": 0, "props": { "currentViewIndex": 0, "defaultViewKey": "sub-page1", "sectionViewConfigs": [{ "id": "9ac3c766-3320-4f0f-a119-cd57b621127b", "key": "sub-page1", "path": "sub-page1", "viewDisplayName": "bodySection1-bodySectionContainer1" }], "style": { "padding": { "mode": "all", "size": "24" } }, "viewSortedKey": ["bodySection1-bodySectionContainer1"] } }, "bodySection1-bodySectionContainer1": { "version": 0, "displayName": "bodySection1-bodySectionContainer1", "parentNode": "bodySection1", "showName": "bodySection1-bodySectionContainer1", "childrenNode": ["impakt_GridContainer1"], "type": "CONTAINER_NODE", "containerType": "EDITOR_DOT_PANEL", "h": 0, "w": 0, "minH": 0, "minW": 0, "x": -1, "y": -1, "z": 0, "props": {} }, "impakt_GridContainer1": { "w": 10, "h": 19, "minW": 1, "minH": 3, "x": 19, "y": 16, "z": 0, "showName": "GridContainer", "type": "GridCONTAINER_WIDGET", "displayName": "impakt_GridContainer1", "containerType": "EDITOR_SCALE_SQUARE", "parentNode": "bodySection1-bodySectionContainer1", "childrenNode": ["impakt_View1", "impakt_View2", "body", "impakt_View4"], "props": { "Mobile": { "columnSize": "1", "columnFraction": ["1fr"], "gridGap": 1 }, "Tablet": { "columnSize": "3", "columnFraction": ["1fr", "1fr", "1fr"], "gridGap": 4 }, "Desktop": { "columnSize": "6", "columnFraction": ["1fr", "1fr", "1fr", "1fr"], "gridGap": 10 }, "backgroundColor": "#ffggas", "radius": "0px", "dynamicHeight": "auto", "$dynamicAttrPaths": [] }, "version": 0 }, "impakt_View1": { "w": 0, "h": 0, "minW": 1, "x": -1, "y": -1, "z": 0, "columnSpan": 1, "rowSpan": 1, "startColumn": 1, "startRow": 1, "showName": "View", "type": "CANVAS", "containerType": "EDITOR_DOT_PANEL", "parentNode": "impakt_GridContainer1", "childrenNode": ["impakt_label1"], "displayName": "impakt_View1", "props": { "Desktop": { "columnSpan": "6" }, "$dynamicAttrPaths": [], "trueClasses": [{ "title": "bgSecondary", "value": "bgSecondary" }] }, "version": 0 }, "impakt_label1": { "w": 1, "h": 5, "minW": 1, "minH": 3, "x": 0, "y": 6, "z": 0, "showName": "label", "type": "LABEL", "displayName": "impakt_label1", "containerType": "EDITOR_SCALE_SQUARE", "parentNode": "impakt_View1", "childrenNode": [], "props": { "label": "Default Layout", "variant": "body1", "color": "primary", "align": "center", "noWrap": "false", "Mobile": {}, "classes": [{ "title": "headerLabel", "value": "headerLabel" }], "sx": {}, "$dynamicAttrPaths": [], "trueClasses": [{ "title": "bgSecondary", "value": "bgSecondary" }] }, "version": 0 }, "impakt_View2": { "w": 0, "h": 0, "minW": 1, "x": -1, "y": -1, "z": 0, "columnSpan": 1, "rowSpan": 1, "startColumn": 1, "startRow": 1, "showName": "View", "type": "CANVAS", "containerType": "EDITOR_DOT_PANEL", "parentNode": "impakt_GridContainer1", "childrenNode": ["impakt_button1", "impakt_button2", "impakt_button3", "impakt_button4"], "displayName": "impakt_View2", "props": { "trueClasses": [{ "title": "height100Vh", "value": "height100Vh" }], "$dynamicAttrPaths": [] }, "version": 0 }, "impakt_button1": { "w": 1, "h": 5, "minW": 1, "minH": 3, "x": 0, "y": 18, "z": 0, "showName": "button", "type": "BUTTON_WIDGET", "displayName": "impakt_button1", "containerType": "EDITOR_SCALE_SQUARE", "parentNode": "impakt_View2", "childrenNode": [], "props": { "text": "Menu1", "startIconName": "MenuIcon", "endIconName": "", "classes": [], "variant": "outlined", "bgcolor": "", "txcolor": "", "hidden": false, "$dynamicAttrPaths": [] }, "version": 0 }, "impakt_button2": { "w": 1, "h": 5, "minW": 1, "minH": 3, "x": 0, "y": 3, "z": 0, "showName": "button", "type": "BUTTON_WIDGET", "displayName": "impakt_button2", "containerType": "EDITOR_SCALE_SQUARE", "parentNode": "impakt_View2", "childrenNode": [], "props": { "text": "Menu2", "startIconName": "CalculateIcon", "endIconName": "", "classes": [], "variant": "outlined", "bgcolor": "", "txcolor": "", "hidden": false, "$dynamicAttrPaths": [] }, "version": 0 }, "impakt_button3": { "w": 1, "h": 5, "minW": 1, "minH": 3, "x": 0, "y": 13, "z": 0, "showName": "button", "type": "BUTTON_WIDGET", "displayName": "impakt_button3", "containerType": "EDITOR_SCALE_SQUARE", "parentNode": "impakt_View2", "childrenNode": [], "props": { "text": "menu3", "startIconName": "AlarmIcon", "endIconName": "", "classes": [], "variant": "outlined", "bgcolor": "", "txcolor": "", "hidden": false, "$dynamicAttrPaths": [] }, "version": 0 }, "impakt_button4": { "w": 1, "h": 5, "minW": 1, "minH": 3, "x": 0, "y": 8, "z": 0, "showName": "button", "type": "BUTTON_WIDGET", "displayName": "impakt_button4", "containerType": "EDITOR_SCALE_SQUARE", "parentNode": "impakt_View2", "childrenNode": [], "props": { "text": "menu4", "startIconName": "ClickIcon", "endIconName": "", "classes": [], "variant": "outlined", "bgcolor": "", "txcolor": "", "hidden": false, "$dynamicAttrPaths": [] }, "version": 0 }, "body": { "w": 0, "h": 0, "minW": 1, "x": -1, "y": -1, "z": 0, "columnSpan": 1, "rowSpan": 1, "startColumn": 1, "startRow": 1, "showName": "View", "type": "CANVAS", "containerType": "EDITOR_DOT_PANEL", "parentNode": "impakt_GridContainer1", "childrenNode": [], "displayName": "body", "props": { "Desktop": { "columnSpan": "5" }, "$dynamicAttrPaths": [], "trueClasses": [{ "title": "height100Vh", "value": "height100Vh" }] }, "version": 0 }, "impakt_View4": { "w": 0, "h": 0, "minW": 1, "x": -1, "y": -1, "z": 0, "columnSpan": 1, "rowSpan": 1, "startColumn": 1, "startRow": 1, "showName": "View", "type": "CANVAS", "containerType": "EDITOR_DOT_PANEL", "parentNode": "impakt_GridContainer1", "childrenNode": ["impakt_label2"], "displayName": "impakt_View4", "props": { "Desktop": { "columnSpan": "6" }, "$dynamicAttrPaths": [], "trueClasses": [{ "title": "bgGray", "value": "bgGray" }] }, "version": 0 }, "impakt_label2": { "w": 1, "h": 5, "minW": 1, "minH": 3, "x": 0, "y": 6, "z": 0, "showName": "label", "type": "LABEL", "displayName": "impakt_label2", "containerType": "EDITOR_SCALE_SQUARE", "parentNode": "impakt_View4", "childrenNode": [], "props": { "label": "Footer", "variant": "body1", "color": "primary", "align": "center", "noWrap": "false", "Mobile": {}, "classes": [{ "title": "headerLabel", "value": "headerLabel" }], "sx": {}, "$dynamicAttrPaths": [], "trueClasses": [{ "title": "bgGray", "value": "bgGray" }] }, "version": 0 }
    }, "dependenciesState": {}, "dragShadowState": {}, "dottedLineSquareState": {}, "displayNameState": []
}

const none = {
    "components": {
        "root": {
            "version": 0,
            "mode": "page",
            "displayName": "root",
            "parentNode": "",
            "showName": "root",
            "childrenNode": [
                "page1"
            ],
            "namePrefix": "impakt",
            "type": "DOT_PANEL",
            "containerType": "EDITOR_DOT_PANEL",
            "h": 0,
            "w": 0,
            "minH": 0,
            "minW": 0,
            "x": -1,
            "y": -1,
            "z": 0,
            "props": {
                "currentPageIndex": 0,
                "pageSortedKey": [
                    "page1"
                ]
            }
        },
        "page1": {
            "version": 0,
            "displayName": "page1",
            "parentNode": "root",
            "showName": "page",
            "childrenNode": [
                "bodySection1"
            ],
            "type": "PAGE_NODE",
            "containerType": "EDITOR_PAGE_SQUARE",
            "h": 0,
            "w": 0,
            "minH": 0,
            "minW": 0,
            "x": -1,
            "y": -1,
            "z": 0,
            "props": {
                "layout": "default",
                "mode": "page",
                "templateName": "layout2"
            }
        },
        "bodySection1": {
            "version": 0,
            "displayName": "bodySection1",
            "parentNode": "page1",
            "showName": "bodySection",
            "childrenNode": [
                "bodySection1-bodySectionContainer1"
            ],
            "type": "SECTION_NODE",
            "containerType": "EDITOR_LAYOUT_SQUARE",
            "h": 0,
            "w": 0,
            "minH": 0,
            "minW": 0,
            "x": -1,
            "y": -1,
            "z": 0,
            "props": {
                "currentViewIndex": 0,
                "defaultViewKey": "sub-page1",
                "sectionViewConfigs": [
                    {
                        "id": "9ac3c766-3320-4f0f-a119-cd57b621127b",
                        "key": "sub-page1",
                        "path": "sub-page1",
                        "viewDisplayName": "bodySection1-bodySectionContainer1"
                    }
                ],
                "style": {
                    "padding": {
                        "mode": "all",
                        "size": "24"
                    }
                },
                "viewSortedKey": [
                    "bodySection1-bodySectionContainer1"
                ]
            }
        },
        "bodySection1-bodySectionContainer1": {
            "version": 0,
            "displayName": "bodySection1-bodySectionContainer1",
            "parentNode": "bodySection1",
            "showName": "bodySection1-bodySectionContainer1",
            "childrenNode": [
            ],
            "type": "CONTAINER_NODE",
            "containerType": "EDITOR_DOT_PANEL",
            "h": 0,
            "w": 0,
            "minH": 0,
            "minW": 0,
            "x": -1,
            "y": -1,
            "z": 0,
            "props": {}
        }
    }

}

const none1 = {
    "appInfo": {},
    "actions": [],
    "components": {
        "root": {
            "mode": "page",
            "version": 0,
            "displayName": "root",
            "parentNode": "",
            "showName": "root",
            "childrenNode": [
                "page1"
            ],
            "namePrefix": "impakt",
            "type": "DOT_PANEL",
            "containerType": "EDITOR_DOT_PANEL",
            "h": 0,
            "w": 0,
            "minH": 0,
            "minW": 0,
            "x": -1,
            "y": -1,
            "z": 0,
            "props": {
                "currentPageIndex": 0,
                "pageSortedKey": [
                    "page1"
                ]
            }
        },
        "page1": {
            "version": 0,
            "displayName": "page1",
            "parentNode": "root",
            "showName": "page",
            "childrenNode": [
                "bodySection1"
            ],
            "type": "PAGE_NODE",
            "containerType": "EDITOR_PAGE_SQUARE",
            "h": 0,
            "w": 0,
            "minH": 0,
            "minW": 0,
            "x": -1,
            "y": -1,
            "z": 0,
            "props": {
                "layout": "default",
                "mode": "page",
                "templateName": "layout2"
            }
        },
        "bodySection1": {
            "version": 0,
            "displayName": "bodySection1",
            "parentNode": "page1",
            "showName": "bodySection",
            "childrenNode": [
                "bodySection1-bodySectionContainer1"
            ],
            "type": "SECTION_NODE",
            "containerType": "EDITOR_LAYOUT_SQUARE",
            "h": 0,
            "w": 0,
            "minH": 0,
            "minW": 0,
            "x": -1,
            "y": -1,
            "z": 0,
            "props": {
                "currentViewIndex": 0,
                "defaultViewKey": "sub-page1",
                "sectionViewConfigs": [
                    {
                        "id": "9ac3c766-3320-4f0f-a119-cd57b621127b",
                        "key": "sub-page1",
                        "path": "sub-page1",
                        "viewDisplayName": "bodySection1-bodySectionContainer1"
                    }
                ],
                "style": {
                    "padding": {
                        "mode": "all",
                        "size": "24"
                    }
                },
                "viewSortedKey": [
                    "bodySection1-bodySectionContainer1"
                ]
            }
        },
        "bodySection1-bodySectionContainer1": {
            "version": 0,
            "displayName": "bodySection1-bodySectionContainer1",
            "parentNode": "bodySection1",
            "showName": "bodySection1-bodySectionContainer1",
            "childrenNode": [
                "GridContainer1"
            ],
            "type": "CONTAINER_NODE",
            "containerType": "EDITOR_DOT_PANEL",
            "h": 0,
            "w": 0,
            "minH": 0,
            "minW": 0,
            "x": -1,
            "y": -1,
            "z": 0,
            "props": {}
        },
        "GridContainer1": {
            "w": 8,
            "h": 19,
            "minW": 1,
            "minH": 3,
            "x": 24,
            "y": 19,
            "z": 0,
            "showName": "GridContainer",
            "type": "GridCONTAINER_WIDGET",
            "displayName": "GridContainer1",
            "containerType": "EDITOR_SCALE_SQUARE",
            "parentNode": "bodySection1-bodySectionContainer1",
            "childrenNode": [
                "body"
            ],
            "props": {
                "Mobile": {
                    "columnSize": "1",
                    "columnFraction": [
                        "1fr"
                    ],
                    "columnGap": 1
                },
                "Tablet": {
                    "columnSize": "3",
                    "columnFraction": [
                        "1fr",
                        "1fr",
                        "1fr"
                    ],
                    "columnGap": 1
                },
                "Desktop": {
                    "columnSize": "4",
                    "columnFraction": [
                        "1fr",
                        "1fr",
                        "1fr",
                        "1fr"
                    ],
                    "columnGap": 1
                },
                "backgroundColor": "#ffggas",
                "radius": "0px",
                "dynamicHeight": "auto",
                "$dynamicAttrPaths": [],
                "undefined": [
                    {
                        "w": 0,
                        "h": 0,
                        "minW": 1,
                        "x": -1,
                        "y": -1,
                        "z": 0,
                        "columnSpan": 1,
                        "rowSpan": 1,
                        "startColumn": 1,
                        "startRow": 1,
                        "showName": "View",
                        "type": "CANVAS",
                        "containerType": "EDITOR_DOT_PANEL",
                        "parentNode": "GridContainer1",
                        "childrenNode": [],
                        "displayName": "View1",
                        "props": {},
                        "version": 0
                    }
                ]
            },
            "version": 0
        },
        "body": {
            "w": 0,
            "h": 0,
            "minW": 1,
            "x": -1,
            "y": -1,
            "z": 0,
            "columnSpan": 1,
            "rowSpan": 1,
            "startColumn": 1,
            "startRow": 1,
            "showName": "View",
            "type": "CANVAS",
            "containerType": "EDITOR_DOT_PANEL",
            "parentNode": "GridContainer1",
            "childrenNode": [],
            "displayName": "body",
            "props": {},
            "version": 0
        }
    }
}
export const LayoutsList = {
    default: defaultLayout,
    layout1,
    layout2,
    none:none1
}
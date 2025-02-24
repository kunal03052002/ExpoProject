/* eslint-disable @typescript-eslint/no-explicit-any */
// import { keyframes } from "@emotion/react"
import { Diff } from "deep-diff"

export enum ExecutionErrorType {
    EVALUATED = "EVALUATED",
    LINT = "LINT",
    VALIDATION = "VALIDATION",
}

export interface ErrorShape {
    errorType: ExecutionErrorType
    errorMessage: string
    errorLine?: number
    errorColumn?: number
    errorName?: string
}
export type DependenciesState = Record<string, string[]>
export type ClassState = Record<string, any>

export interface ExecutionState {
    dependencies: DependenciesState
    result: Record<string, any>
    // styleClasses: ClassState,
    // Themes: ClassState,
    error: Record<string, ErrorShape[]>
    debuggerData: Record<string, ErrorShape[]>
    independencies: DependenciesState
}
// const animationKeyframes = keyframes`
//   from {
//     width: 20%;
//   }
//   to {
//     width: 0%;
//   }
// `;
// const animationKeyframesOpen = keyframes`
//   from {
//     width: 0%;
//   }
//   to {
//     width: 20%;
//   }
// `;
// const animationMainContentKeyframes = keyframes`
//   from {
//     width: 80%;
//   }
//   to {
//     width: 95%;
//   }
// `;

// const animationMainContentKeyframesOpen = keyframes`
//   from {
//     width: 95%;
//   }
//   to {
//     width: 80%;
//   }
// `;
// const animationIconKeyframesOpen = keyframes`
//   from {
//     width: 20%;
//   }
//   to {
//     width: 5%;
//   }
// `;
export const executionInitialState: ExecutionState =
{
    "dependencies": {
        "currentPageInfo.pagePath": [
            "root.pageSortedKey",
            "root.currentPageIndex"
        ],
        "currentPageInfo.subPagePath": [
            "root.currentSubPagePath"
        ]
    },
    // Themes: {
    //     AppDefaultTheme: {
    //         primary: "dfg",
    //     },
    //     CustomTheme: {
    //         primary: "black",
    //     },
    // },
    // styleClasses: {
    //     hide: {
    //         display: "none"
    //     },
    //     header: {
    //         position: "absolute",
    //         top: 0,
    //         height: "16px",
    //         border: "2px solid black",
    //         padding: "20px 10px",
    //         width: "100%",
    //         background: "#f7f5f5"
    //     },
    //     iconSiderBar: {
    //         width: "20%",
    //         animation: `${animationIconKeyframesOpen} 1s forwards`,
    //         top: "12px",
    //         border: "2px solid black",
    //         position: "absolute",
    //         left: 0,
    //         background: "#ebf0eb",
    //         height: "100vh",
    //     },
    //     sidebar: {
    //         width: "0%",
    //         animation: `${animationKeyframesOpen} 1s forwards`,
    //         top: "12px",
    //         border: "2px solid black",
    //         position: "absolute",
    //         left: 0,
    //         background: "#ebf0eb",
    //         height: "100vh",
    //     },
    //     sidebarMobile: {
    //         border: "2px solid black",
    //         position: "absolute",
    //         top: "12px",
    //         left: 0,
    //         background: "#ebf0eb",
    //         height: "100vh",
    //         width: '20%',
    //         backgroundColor: 'lightcoral',
    //         animation: `${animationKeyframes} 1s forwards`,

    //     },

    //     MainContent: {
    //         width: "80%",
    //         backgroundColor: 'lightcoral',

    //         animation: `${animationMainContentKeyframes} 1s forwards`,

    //         height: "100vh",
    //         border: "2px solid black",
    //         position: "absolute",
    //         top: "12px",
    //         right: 0,
    //         background: "#ebeff0",
    //     },
    //     MainContentMobile: {
    //         width: "95%",
    //         animation: `${animationMainContentKeyframesOpen} 1s forwards`,
    //         height: "100vh",
    //         border: "2px solid black",
    //         position: "absolute",
    //         top: "12px",
    //         right: 0,
    //         background: "#ebeff0",
    //     },
    //     backgroundRed: {
    //         background: "red"
    //     },
    //     backgroundYellow: {
    //         background: "yellow"
    //     },
    //     bdRadius50: {
    //         borderRadius: "20px"
    //     },
    //     primaryButton: {
    //         backgroundColor: "#007bff",
    //         width: "100%",
    //         display: "flex",
    //         justifyContent: "center",
    //         borderRadius: "10px",
    //         color: "white",
    //         border: "none",
    //         cursor: "pointer",
    //         "&:hover": {
    //             backgroundColor: "#0056b3"
    //         }
    //     },
    //     secondaryButton: {
    //         backgroundColor: "#6c757d",
    //         color: "white",
    //         border: "none",
    //         width: "100%",
    //         display: "flex",
    //         justifyContent: "center",
    //         borderRadius: "10px",


    //     },
    //     headerLabel: {
    //         fontWeight: "600",

    //     }
    // },
    "result": {

        "root": {

            "currentPageIndex": 0,
            "pageSortedKey": [
                "page1"
            ],
            "displayName": "root",
            "$parentNode": "",
            "$type": "WIDGET",
            "$widgetType": "DOT_PANEL",
            "$childrenNode": [
                "page1"
            ]
        },
        "page1": {
            "canvasSize": "auto",
            "layout": "Custom",
            isTemplatePage:true,
            "topHeight": 0,
            "displayName": "page1",
            "$parentNode": "root",
            "$type": "WIDGET",
            "$widgetType": "PAGE_NODE",
            "$childrenNode": [
                "bodySection1",
                "modalSection1"
            ],
            "$parentPageName": "page1"
        },
        "bodySection1": {
            "currentViewIndex": 0,
            "defaultViewKey": "sub-page1",
            "sectionViewConfigs": [
                {
                    "id": "eef9e48d-4f62-4069-909f-86a8c8474893",
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
            ],
            "displayName": "bodySection1",
            "$parentNode": "page1",
            "$type": "WIDGET",
            "$widgetType": "SECTION_NODE",
            "$childrenNode": [
                "bodySection1-bodySectionContainer1"
            ],
            "$parentPageName": "page1"
        },
        "builderInfo": {
            "version": "4.4.13",
            "language": "English"
        },
        "currentUserInfo": {
            "userID": "",
            "nickname": "",
            "email": "",
            "language": "en-US",
            "createdAt": "2024-02-12T06:57:23.589408Z",
            "updatedAt": "2024-02-12T07:11:03.216272Z"
        },
        "globalData": {
            "$dynamicAttrPaths": []
        },
        "urlParams": {
            "query": {},
            "url": "http://localhost:3000/0/app/ILAfx4p1C7dV",
            "appURL": "http://localhost:3000/0/app/ILAfx4p1C7dV"
        },
        "localStorage": {},
        "currentPageInfo": {
            "pagePath": "page1",
            "$dynamicAttrPaths": [
                "pagePath",
                "subPagePath"
            ]
        },
        "pageInfos": [
            {
                "pagePath": "/page1",
                "subPagePath": "/page1/sub-page1",
                "pageName": "page1",
                "subPageName": "sub-page1",
                "isHomePage": true,
                "subPageGroup": ""
            }
        ]
    },
    "error": {},
    "debuggerData": {},
    "independencies": {
        "root.currentSubPagePath": [
            "currentPageInfo.subPagePath"
        ],
        "root.pageSortedKey": [
            "currentPageInfo.pagePath"
        ],
        "root.currentPageIndex": [
            "currentPageInfo.pagePath"
        ]
    }
};
export interface setExecutionResultPayload {
    updates: Diff<Record<string, any>, Record<string, any>>[]
}

export interface UpdateExecutionByDisplayNamePayload {
    displayName: string
    value: Record<string, any>
}
export type UpdateStyleClassesReducerPayload = Record<string, any>
export interface UpdateCurrentPagePathPayload {
    pageDisplayName: string
    subPagePath?: string
}

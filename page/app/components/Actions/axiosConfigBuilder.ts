/* eslint-disable @typescript-eslint/no-explicit-any */
const headerObj = {
    //  "Content-Type": "application/json",
    // "X-Requested-With": "XMLHttpRequest"
}
const setFormat = (headers: any[], initialObj: any) => {
    if (!headers) {
        return initialObj
    }
    headers.map((elem) => {
        initialObj[elem.key] = elem.value;
    })
    return initialObj;
}
export function buildAxiosConfig(input) {
    const content = input.content;
    const headers = setFormat(content.headers, headerObj)
    let body = {}
    if (content.impaktResourceContent) {
        body = content.impaktResourceContent;
    }

    if (content.bodyType === "raw") {
        body = JSON.parse(content.body.content)
    }
    else {
        body = setFormat(content.body, body)
    }
    let url = content.baseUrl;
    if (content?.urlParams && content?.urlParams?.length > 0 && content?.urlParams?.[0]?.key) {
        const urlParams = content.urlParams.map(param => `${param.key}=${encodeURIComponent(param.value)}`).join('&');
        url += `?${urlParams}`;
    }
    const axiosConfig = {
        method: (content.method || "get").toLowerCase(),
        url: url,
        headers: headers,
        body: body,
    };
    return axiosConfig;
}
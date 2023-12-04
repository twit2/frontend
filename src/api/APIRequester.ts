import { APIConfiguration } from "./APIConfiguration";
import { APIError } from "./APIError";
import { APIResponse } from "./APIResponse";

/**
 * Sends an API request.
 * @param path The path to request.
 * @param method The method to use.
 * @param body The body to send.
 */
export async function sendAPIRequest<T>(path: string, method: string, body?: any): Promise<APIResponse<T>> {
    const hdr = {
        'Authorization': `Bearer ${localStorage.getItem('auth-token') ?? 'none'}`
    }

    const reqInit = {
        method,
        headers: ((method !== "GET") && (!(body instanceof FormData))) ? {
            ...hdr,
            ...{'Content-Type': 'application/json'}
        } : hdr
    } as any;

    reqInit.body = body;

    if(method !== "GET") {
        if(body instanceof FormData)
            reqInit.body = body;
        else
            reqInit.body = JSON.stringify(body);
    }

    const res = await fetch(`${APIConfiguration.apiGwUrl}${path}`, reqInit);

    let json;
    let clone = res.clone();

    try {
        json = await res.json() as APIResponse<T>;
    } catch(e) {
        console.error(await clone.text());
        console.error(e);
        throw e;
    }

    return json;
}

interface RespAssertOptions {
    dataRequired?: boolean;
}

/**
 * Asserts whether a response is successful.
 * @param resp The response to assert.
 */
export const assertResponse = <T>(resp: APIResponse<T>, opts: RespAssertOptions = {}) => {
    if(!resp.success)
        throw new APIError(resp);

    if((!resp.data) && opts.dataRequired)
        throw new APIError(resp);

    return resp;
}
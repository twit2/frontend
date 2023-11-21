import { APIConfiguration } from "./APIConfiguration";
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

    const res = await fetch(`${APIConfiguration.apiGwUrl}${path}`, {
        method,
        headers: (method !== "GET") ? {
            ...hdr,
            ...{'Content-Type': 'application/json'}
        } : hdr,
        body: (method !== "GET") ? JSON.stringify(body) : undefined
    });

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
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

    const req = await fetch(`${APIConfiguration.apiGwUrl}${path}`, {
        method,
        headers: (method !== "GET") ? {
            ...hdr,
            ...{'Content-Type': 'application/json'}
        } : hdr,
        body: (method !== "GET") ? JSON.stringify(body) : undefined
    });

    const json = await req.json() as APIResponse<T>;
    return json;
}
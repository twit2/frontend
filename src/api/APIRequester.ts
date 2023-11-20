import { APIConfiguration } from "./APIConfiguration";
import { APIResponse } from "./APIResponse";

/**
 * Sends an API request.
 * @param path The path to request.
 * @param method The method to use.
 * @param body The body to send.
 */
export async function sendAPIRequest<T>(path: string, method: string, body?: any): Promise<APIResponse<T>> {
    const req = await fetch(`${APIConfiguration.apiGwUrl}${path}`, {
        method,
        headers: (method !== "GET") ? {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('auth-token') ?? 'none'}`
        } : {},
        body: (method !== "GET") ? JSON.stringify(body) : undefined
    });

    console.log(APIConfiguration.apiGwUrl);

    const json = await req.json() as APIResponse<T>;
    return json;
}
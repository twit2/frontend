import { APIResponse } from "./APIResponse";;

export class APIError extends Error {
    public resp: APIResponse<unknown>;

    constructor(resp: APIResponse<unknown>, message?: string) {
        super(message ?? resp.message);
        this.resp = resp;
    }
}
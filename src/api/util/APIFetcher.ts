import { sendAPIRequest } from "../APIRequester";

interface BasicCacheable {
    id: string;
}

export class APIFetcher<T> {
    private endpoint: string;
    private objs: T[] = [];

    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    /**
     * Gets an item.
     * @param id The ID of the item to get.
     */
    async get(id: string): Promise<T> {
        let result = this.objs.find(x => {
            const obj = x as BasicCacheable;
            return obj.id == id;
        });

        if(!result) {
            // Fetch
            const urlpart = this.endpoint.replace("%ID%", id);
            const resp = await sendAPIRequest<T>(urlpart, "GET");

            if(!resp.success)
                throw new Error(`Unable to fetch from ${urlpart}: [${resp.code}] ${resp.message}`);

            if(resp.data) {
                const bcc = resp.data as unknown as BasicCacheable;

                if(typeof bcc.id !== 'string')
                    throw new Error(`API endpoint ${urlpart} does not return a valid object.`);

                this.objs.push(resp.data);
            }
            else
                throw new Error(`No data received from ${urlpart}`);

            return resp.data;
        }
        
        return result;
    }
}
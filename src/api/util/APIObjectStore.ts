import { sendAPIRequest } from "../APIRequester";

interface BasicCacheable {
    id: string;
}

export class APIObjectStore<T extends BasicCacheable> {
    private endpoint: string;
    private objs: T[] = [];

    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    /**
     * Invalidates all items.
     */
    invalidateAll() {
        this.objs = [];
    }

    /**
     * Invalidates an item from the cache.
     * @param id The ID of the item to invalidate.
     */
    invalidate(id: string) {
        const idx = this.objs.findIndex(x => x.id === id);

        if(idx > -1)
            this.objs.splice(idx, 1);
    }

    /**
     * Replaces an item in the cache. The item will be added if it does not already exist.
     * @param id The Id of the item to replace.
     * @param obj The object to replace.
     */
    replace(id: string, obj: T) {
        let idx = this.objs.findIndex(x => x.id === id);

        if(idx > -1)
            this.objs[idx] = obj;
        else
            idx = this.objs.push(obj) - 1;

        return this.objs[idx];
    }

    /**
     * Updates an item in the cache.
     * @param obj The item to update.
     */
    update(obj: T) {
        return this.replace(obj.id, obj);
    }

    /**
     * Gets an item.
     * @param id The ID of the item to get.
     */
    async get(id: string): Promise<T> {
        const result = this.objs.find(x => x.id === id);

        if(!result) {
            // Fetch
            const urlpart = this.endpoint.replace("%ID%", id);
            const resp = await sendAPIRequest<T>(urlpart, "GET");

            if(!resp.success)
                throw new Error(resp.message);

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
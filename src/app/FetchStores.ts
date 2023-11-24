import { APIFetcher } from "../api/util/APIFetcher";

export const FetchStores = {
    user: new APIFetcher(`/user/%ID%`)
}
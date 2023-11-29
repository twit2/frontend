import { PartialUser } from "../api/user/PartialUser";
import { APIFetcher } from "../api/util/APIFetcher";

export const FetchStores = {
    user: new APIFetcher<PartialUser>(`/user/%ID%`)
}
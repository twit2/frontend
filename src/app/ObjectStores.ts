import { Post, PartialUser, APIObjectStore } from "@twit2/std-library-fe";

export const ObjectStores = {
    user: new APIObjectStore<PartialUser>(`/user/%ID%`),
    post: new APIObjectStore<Post>(`/post/view/%ID%`)
}
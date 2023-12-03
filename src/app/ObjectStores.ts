import { Post } from "../api/posts/Post";
import { PartialUser } from "../api/user/PartialUser";
import { APIObjectStore } from "../api/util/APIObjectStore";

export const ObjectStores = {
    user: new APIObjectStore<PartialUser>(`/user/%ID%`),
    post: new APIObjectStore<Post>(`/post/view/%ID%`)
}
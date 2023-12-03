import { assertResponse, sendAPIRequest } from "../api/APIRequester";
import { PaginatedAPIData } from "../api/PaginatedAPIData";
import { Post } from "../api/posts/Post";
import { ObjectStores } from "./ObjectStores"
import { CreatePostOp } from "./op/post/CreatePostOp";
import { EditPostOp } from "./op/post/EditPostOp";

export const POSTS_ENDPOINT = `/post`;

/**
 * Creates a new post.
 * @param id The ID of the post to create.
 */
async function createPost(content: CreatePostOp) {
    const post = assertResponse(await sendAPIRequest<Post>(`${POSTS_ENDPOINT}`, "POST", content), {
        dataRequired: true
    });

    return ObjectStores.post.update(post.data as Post);
}

/**
 * Deletes a post.
 * @param id The ID of the post to delete.
 */
async function deletePost(id: string) {
    assertResponse(await sendAPIRequest(`${POSTS_ENDPOINT}/${id}`, 'DELETE'));
    ObjectStores.post.invalidate(id);
}

/**
 * Edits a post.
 * @param id The ID of the post to edit.
 */
async function editPost(id: string, content: EditPostOp) {
    const post = assertResponse<Post>(await sendAPIRequest<Post>(`${POSTS_ENDPOINT}/${id}`, "PATCH", content), {
        dataRequired: true
    });

    return ObjectStores.post.update(post.data as Post);
}

/**
 * Gets a post.
 * @param id The ID of the post to get.
 */
async function getPost(id: string) {
    return ObjectStores.post.get(id);
}

/**
 * Gets paginated posts data.
 * @param url The URL to act on.
 */
async function getPaginatedPostsData(url: string): Promise<PaginatedAPIData<Post>> {
    const postResp : PaginatedAPIData<Post> = assertResponse(await sendAPIRequest<PaginatedAPIData<Post>>(`${POSTS_ENDPOINT}${url}`, "GET"), {
        dataRequired: true
    }).data as PaginatedAPIData<Post>;

    postResp.data?.map(x => ObjectStores.post.update(x));
    return postResp;
}

/**
 * Gets the latest posts.
 * @param page The page to view.
 */
async function getLatestPosts(page: number): Promise<PaginatedAPIData<Post>> {
    return getPaginatedPostsData(`/latest/${page}`);
}

/**
 * Gets posts from a user.
 * @param userId The Id of the user to get posts from.
 * @param page The page to view.
 */
async function getUserPosts(userId: string, page: number): Promise<PaginatedAPIData<Post>> {
    return getPaginatedPostsData(`/${userId}/${page}`);
}

/**
 * Gets posts from a user.
 * @param userId The Id of the user to get posts from.
 * @param page The page to view.
 */
async function getReplies(postId: string, page: number): Promise<PaginatedAPIData<Post>> {
    return getPaginatedPostsData(`/${postId}/replies/${page}`);
}

export const PostManager = {
    getPost,
    createPost,
    deletePost,
    getLatestPosts,
    getUserPosts,
    getReplies,
    editPost
}
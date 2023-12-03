import { assertResponse, sendAPIRequest } from "../api/APIRequester";
import { PartialUser } from "../api/user/PartialUser";
import { ObjectStores } from "./ObjectStores";

export const USER_ENDPOINT = `/user`;

/**
 * Gets a user by ID.
 * @param id The ID of the user to get.
 * @returns The user.
 */
async function getUserById(id: string) {
    return ObjectStores.user.get(id);
}

/**
 * Gets the currently logged in user.
 */
async function getCurrentUser() {
    const userResp = assertResponse(await sendAPIRequest<PartialUser>(`${USER_ENDPOINT}/@me`, "GET"), {
        dataRequired: true
    });

    return ObjectStores.user.update(userResp.data as PartialUser);
}

export const UserManager = {
    getCurrentUser,
    getUserById
}
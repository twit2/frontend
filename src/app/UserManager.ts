import { APIConfiguration } from "../api/APIConfiguration";
import { assertResponse, sendAPIRequest } from "../api/APIRequester";
import { PaginatedAPIData } from "../api/PaginatedAPIData";
import { DataObject } from "../api/cdn/DataObject";
import { PartialUser } from "../api/user/PartialUser";
import { AppContext } from "./AppContext";
import { ObjectStores } from "./ObjectStores";
import { UserChangeOp } from "./op/user/UserChangeOp";

export const USER_ENDPOINT = `/user`;
export const CDN_ENDPOINT = `/cdn`;

/**
 * Gets a user by ID.
 * @param id The ID of the user to get.
 * @returns The user.
 */
async function getUserById(id: string) {
    return ObjectStores.user.get(id);
}

/**
 * Gets a user by name.
 * @param username The username of the user to get.
 * @returns The user.
 */
async function getUserByName(username: string) {
    const userResp = assertResponse(await sendAPIRequest<PartialUser>(`${USER_ENDPOINT}/@${username}`, "GET"), {
        dataRequired: true
    });

    return ObjectStores.user.update(userResp.data as PartialUser);
}

/**
 * Gets the currently logged in user.
 */
async function getCurrentUser() {
    const userResp = assertResponse(await sendAPIRequest<PartialUser>(`${USER_ENDPOINT}/@me`, "GET"), {
        dataRequired: true
    });

    AppContext.currentUser = ObjectStores.user.update(userResp.data as PartialUser);
    return AppContext.currentUser;
}

/**
 * Updates a user profile.
 * @param changes The changes to make.
 */
async function updateUserProfile(changes: UserChangeOp) {
    const userResp = assertResponse(await sendAPIRequest<PartialUser>(`${USER_ENDPOINT}/@me`, "PATCH", changes), {
        dataRequired: true
    });

    AppContext.currentUser = ObjectStores.user.update(userResp.data as PartialUser);
    return AppContext.currentUser;
}

/**
 * Gets the latest user profiles.
 * @param page The page of profiles to retrieve.
 */
async function getLatestProfiles(page: number): Promise<PaginatedAPIData<PartialUser>> {
    const usersResp : PaginatedAPIData<PartialUser> = assertResponse(await sendAPIRequest<PaginatedAPIData<PartialUser>>(`${USER_ENDPOINT}/latest/${page}`, "GET"), {
        dataRequired: true
    }).data as PaginatedAPIData<PartialUser>;

    usersResp.data?.map(x => ObjectStores.user.update(x));
    return usersResp;
}

/**
 * Returns an avatar URL.
 */
function getAvatarURL(user: PartialUser): string|undefined {
    if(user.avatarURL)
        return `${APIConfiguration.apiCdnUrl}${user.avatarURL}`;
}

/**
 * Updates the current user's avatar.
 * @param user The user to update the avatar for.
 */
async function updateAvatar(f: File) {
    const formData = new FormData();
    formData.append('files', f);

    const cdnResponse = assertResponse<DataObject[]>(await sendAPIRequest<DataObject[]>(`${CDN_ENDPOINT}/avatars`, "POST", formData));
    const dObj = (cdnResponse.data as DataObject[])[0];

    // Update user object
    const user = await ObjectStores.user.get((AppContext.currentUser as PartialUser).id);
    user.avatarURL = dObj.urlPart;
    ObjectStores.user.update(user);
    
    return dObj;
}

export const UserManager = {
    getLatestProfiles,
    updateUserProfile,
    getCurrentUser,
    getUserByName,
    getUserById,
    getAvatarURL,
    updateAvatar
}
import { UserRelationStatistics } from "./types/UserRelationStatistics";
import { PaginatedAPIData, PartialUser,  assertResponse, sendAPIRequest } from "@twit2/std-library-fe";
import { UserRelation } from "./types/Relation";
import { USER_ENDPOINT, UserManager } from "./UserManager";
import { RelationState } from "./types/RelationState";

/**
 * Gets user relationship statistics (e.g. number of followers, etc.)
 * @param username The username to get stats for.
 * @returns The stats object.
 */
async function getRelationsStats(username: string): Promise<UserRelationStatistics> {
    const relResp = assertResponse(await sendAPIRequest<UserRelationStatistics>(`${USER_ENDPOINT}/relations/stats/@${username}`, "GET"), {
        dataRequired: true
    });

    return relResp.data as any;
}

/**
 * Gets user followers.
 */
async function getRelationsList(type: string, username: string, page: number) {
    const relResp = assertResponse(await sendAPIRequest<PaginatedAPIData<UserRelation>>(`${USER_ENDPOINT}/relations/${type}/@${username}/${page}`, "GET"), {
        dataRequired: true
    });

    const data = relResp.data as any;
    
    // Format the data from UserRelation -> User
    const relations = data?.data as any[];
    
    for(let x = 0; x < relations.length; x++) {
        switch(type) {
            case "followers":
                relations[x] = await UserManager.getUserById(relations[x].source);
                break;
            case "following":
                relations[x] = await UserManager.getUserById(relations[x].dest);
                break;
            default:
                throw new Error("Invalid type.");
        }
    }

    return data as PaginatedAPIData<PartialUser>;
}

/**
 * Follows a new user.
 * @param targetUserId The target user ID to follow.
 */
async function follow(targetUserId: string) {
    const relResp = assertResponse(await sendAPIRequest(`${USER_ENDPOINT}/relations/follow`, "POST", { dest: targetUserId }), {
        dataRequired: true
    });

    return relResp.data as any;
}

/**
 * Unfollows a new user.
 * @param targetUserId The target user ID to follow.
 */
async function unfollow(targetUserId: string) {
    const relResp = assertResponse(await sendAPIRequest(`${USER_ENDPOINT}/relations/follow`, "DELETE", { dest: targetUserId }));
    return relResp.data as any;
}

/**
 * Checks whether the target user has been followed.
 */
async function getRelationState(targetUserId: string): Promise<RelationState> {
    const relResp = assertResponse(await sendAPIRequest<any>(`${USER_ENDPOINT}/relations/state/${targetUserId}`, "GET"), {
        dataRequired: true
    });

    return relResp.data as any;
}

export const RelationsManager = {
    follow,
    unfollow,
    getRelationState,
    getRelationsStats,
    getRelationsList
}
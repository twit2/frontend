import { UserRelationStatistics } from "../../../svc-users/src/types/UserRelationStatistics";
import { PaginatedAPIData, PartialUser,  assertResponse, sendAPIRequest } from "@twit2/std-library-fe";
import { UserRelation } from "./types/Relation";

export const USER_ENDPOINT = `/user`;

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
async function getFollowers(username: string) {
    const relResp = assertResponse(await sendAPIRequest<PaginatedAPIData<PartialUser>>(`${USER_ENDPOINT}/relations/followers/@${username}`, "GET"), {
        dataRequired: true
    });

    return relResp.data as PaginatedAPIData<PartialUser>;
}

/**
 * Gets user follow list.
 */
async function getFollowing(username: string) {
    const relResp = assertResponse(await sendAPIRequest<PaginatedAPIData<PartialUser>>(`${USER_ENDPOINT}/relations/following/@${username}`, "GET"), {
        dataRequired: true
    });

    return relResp.data as PaginatedAPIData<PartialUser>;
}

export const RelationsManager = {
    getRelationsStats,
    getFollowers,
    getFollowing
}
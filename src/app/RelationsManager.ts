import { UserRelationStatistics } from "../../../svc-users/src/types/UserRelationStatistics";
import { PartialUser,  assertResponse, sendAPIRequest } from "@twit2/std-library-fe";

export const USER_ENDPOINT = `/user`;

/**
 * Gets user relationship statistics (e.g. number of followers, etc.)
 * @param username The username to get stats for.
 * @returns The stats object.
 */
async function getRelationsStats(username: string): Promise<UserRelationStatistics> {
    const relResp = assertResponse(await sendAPIRequest<PartialUser>(`${USER_ENDPOINT}/relations/stats/@${username}`, "GET"), {
        dataRequired: true
    });

    return relResp.data as any;
}

export const RelationsManager = {
    getRelationsStats
}
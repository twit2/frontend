import { UserRelationStatistics } from "../../../svc-users/src/types/UserRelationStatistics";
import { PaginatedAPIData, PartialUser,  assertResponse, sendAPIRequest } from "@twit2/std-library-fe";
import { UserRelation } from "./types/Relation";
import { UserManager } from "./UserManager";

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

export const RelationsManager = {
    getRelationsStats,
    getRelationsList
}
export interface PartialUser {
    id: string;
    displayName?: string | null;
    username: string;
    avatarUrl?: string | null;
    biography?: string | null;
    dateJoined: string;
    followCount: number;
    followingCount: number;
}
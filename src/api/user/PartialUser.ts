export interface PartialUser {
    id: string;
    displayName?: string | null;
    username: string;
    avatarURL?: string | null;
    biography?: string | null;
    dateJoined: string;
    followCount: number;
    followingCount: number;
}
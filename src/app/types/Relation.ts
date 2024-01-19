export enum RelationType {
    FOLLOW = 0,
    BLOCK = 1
};

export interface UserRelation {
    type: RelationType;
    source: string;
    dest: string;
}
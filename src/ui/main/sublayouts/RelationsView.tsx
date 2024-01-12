import { useParams } from "react-router-dom"
import { TitleHeader } from "../../../components/layout/TitleHeader"
import { useEffect } from "react";
import { ProfileList, ProfileListMode } from "../../../components/main/ProfileList";

export enum RelationsViewType {
    followers = 1,
    following = 2,
    blocked = 3
}

/**
 * Gets the title string for a relationship type.
 * @param target The user target.
 * @param type The relationship type.
 * @returns 
 */
function getTitleString(target: string, type: RelationsViewType) {
    switch(type) {
        case RelationsViewType.followers:
            return `${target}'s followers`;
        case RelationsViewType.following:
            return `${target}'s followed users`;
        case RelationsViewType.blocked:
            return `${target}'s blocked users`;
    }
}

export const RelationsView = (props: { type: RelationsViewType })=>{
    const params = useParams();
    const targetUsername = params.name as string;
    
    useEffect(()=>{
        
    });
    
    return <div className="view profile">
        <TitleHeader title={getTitleString(targetUsername, props.type)} backAction={true}/>
        <ProfileList mode={(props.type === RelationsViewType.followers) ? ProfileListMode.Followers : ProfileListMode.Following} target={targetUsername}/>
    </div>
}
import { useParams } from "react-router-dom"
import { TitleHeader } from "../../../components/layout/TitleHeader"
import { useEffect, useState } from "react";
import { PartialUser } from "@twit2/std-library-fe";
import { LoadingContainer } from "../../../components/basic/LoadingContainer";
import { ProfileBanner } from "../../../components/page/user/ProfileBanner";
import { BiographyBox } from "../../../components/page/user/BiographyBox";
import { AppContext } from "../../../app/AppContext";
import { PostBox, PostBoxMode } from "../../../components/main/post/PostBox";
import { UserManager } from "../../../app/UserManager";
import { RelationsManager } from "../../../app/RelationsManager";
import { UserRelationStatistics } from "../../../app/types/UserRelationStatistics";
import { RelationState } from "../../../app/types/RelationState";

export const ProfileView = ()=>{
    const params = useParams();
    const targetUsername = params.name as string;
    const [user, setUser] = useState<PartialUser>();
    const [userStats, setUserStats] = useState<UserRelationStatistics>();
    const [userRelState, setUserRelState] = useState<RelationState>();
    const [currentProfile, setCurrentProfile] = useState("");
    
    const fetchUser = async()=> {
        if(currentProfile !== targetUsername)
            setCurrentProfile(targetUsername);
        else
            return;

        try {
            const uprofile = await UserManager.getUserByName(targetUsername.substring(1));
            setUser(uprofile);
            setUserStats(await RelationsManager.getRelationsStats(targetUsername.substring(1)));
            setUserRelState(await RelationsManager.getRelationState(uprofile.id));
        } catch(e) {
            AppContext.ui.createDlg({ title: "Error", content: "Failed to refresh user profile!" });
            console.error(e);
            return;
        }
    }

    useEffect(()=>{
        fetchUser();
    });
    
    return <div className="view profile">
        <TitleHeader title={targetUsername} backAction={true}/>
        { ((user == null) || (userStats == null) || (userRelState == null)) ? <LoadingContainer/> : <>
            <ProfileBanner user={user} stats={userStats} relationStatus={userRelState}/>
            <BiographyBox text={(user.biography === '') ? "(none provided)" : (user.biography as string)}/>
            <PostBox target={user.id} mode={PostBoxMode.ProfilePosts}/>
        </> }
    </div>
}
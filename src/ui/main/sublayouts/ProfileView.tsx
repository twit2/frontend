import { useNavigate, useParams } from "react-router-dom"
import { TitleHeader } from "../../../components/layout/TitleHeader"
import { useEffect, useState } from "react";
import { PartialUser } from "../../../api/user/PartialUser";
import { LoadingContainer } from "../../../components/basic/LoadingContainer";
import { ProfileBanner } from "../../../components/page/user/ProfileBanner";
import { sendAPIRequest } from "../../../api/APIRequester";
import { BiographyBox } from "../../../components/page/user/BiographyBox";
import { AppContext } from "../../../app/AppContext";
import { PostBox } from "../../../components/main/PostBox";

export const ProfileView = ()=>{
    const params = useParams();
    const targetUsername = params.name as string;
    const [user, setUser] = useState<PartialUser>();
    const [currentProfile, setCurrentProfile] = useState("");
    const navigate = useNavigate();
    
    const fetchUser = async()=> {
        if(currentProfile !== targetUsername)
            setCurrentProfile(targetUsername);
        else
            return;

        try {
            // Get user
            const userResp = await sendAPIRequest<PartialUser>(`/user/${targetUsername}`, "GET");

            if((userResp.data == null) || (!userResp.success)) {
                AppContext.ui.createDlg({ title: "Error", content: "Failed to refresh user profile!" })
                return;
            }

            // Do this last since this changes the visual ui
            setUser(userResp.data);
        } catch(e) {
            // Inform user of error
            console.error(e);
        }
    }

    useEffect(()=>{
        fetchUser();
    });
    
    return <div className="view profile">
        <TitleHeader title={targetUsername} backAction={()=>navigate('/feed')}/>
        { (user == null) ? <LoadingContainer/> : <>
            <ProfileBanner user={user}/>
            <BiographyBox text={(user.biography === '') ? "(none provided)" : (user.biography as string)}/>
            <PostBox targetUser={user}/>
        </> }
    </div>
}
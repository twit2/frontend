import { useNavigate, useParams } from "react-router-dom"
import { TitleHeader } from "../../../components/layout/TitleHeader"
import { useEffect, useState } from "react";
import { PartialUser } from "../../../api/user/PartialUser";
import { LoadingContainer } from "../../../components/basic/LoadingContainer";
import { ProfileBanner } from "../../../components/page/user/ProfileBanner";
import { sendAPIRequest } from "../../../api/APIRequester";
import { BiographyBox } from "../../../components/page/user/BiographyBox";
import { Post } from "../../../api/posts/Post";

export const ProfileView = ()=>{
    const params = useParams();
    const targetUsername = params.name as string;
    const [user, setUser] = useState<PartialUser>();
    const [currentProfile, setCurrentProfile] = useState("");
    const [posts, setPosts] = useState<Post[]>([]);
    const navigate = useNavigate();
    
    useEffect(()=>{
        const fetchUser = async()=> {
            if(currentProfile !== targetUsername)
                setCurrentProfile(targetUsername);
            else
                return;

            try {
                // Get user
                const userResp = await sendAPIRequest<PartialUser>(`/user/${targetUsername}`, "GET");

                if((userResp.data == null) || (!userResp.success)) {
                    // Say an error occured
                    // alert("Failed to fetch user data - this is a bug!");
                    return;
                }

                // Get posts
                const postResp = await sendAPIRequest<Post[]>(`/post/${userResp.data?.id}/0`, "GET");

                if((postResp.data == null) || (!postResp.success)) {
                    // Say an error occured
                    // TODO put visual error instead
                    // alert("No posts to retrieve.");
                    return;
                }

                setPosts(postResp.data);

                // Do this last since this changes the visual ui
                setUser(userResp.data);
            } catch(e) {
                // Inform user of error
                console.error(e);
            }
        }

        fetchUser();
    });
    
    return <div className="view profile">
        <TitleHeader title={targetUsername} backAction={()=>navigate('/')}/>
        { (user == null) ? <LoadingContainer/> : <>
            <ProfileBanner user={user}/>
            <BiographyBox text={user.biography ?? "(none provided)"}/>
        </> }
    </div>
}
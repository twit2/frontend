import { useNavigate, useParams } from "react-router-dom"
import { TitleHeader } from "../../../components/layout/TitleHeader"
import { useEffect, useState } from "react";
import { PartialUser } from "../../../api/user/PartialUser";
import { LoadingContainer } from "../../../components/basic/LoadingContainer";
import { ProfileBanner } from "../../../components/page/user/ProfileBanner";
import { sendAPIRequest } from "../../../api/APIRequester";
import { BiographyBox } from "../../../components/page/user/BiographyBox";

export const ProfileView = ()=>{
    const params = useParams();
    const targetUsername = params.name as string;
    const [user, setUser] = useState<PartialUser>();
    const navigate = useNavigate();
    let fetchBusy = false;
    
    useEffect(()=>{
        const fetchUser = async()=> {
            if(!fetchBusy)
                fetchBusy = true;
            else
                return;

            try {
                const userResp = await sendAPIRequest<PartialUser>(`/user/${targetUsername}`, "GET");

                if((userResp.data == null) || (!userResp.success)) {
                    // Say an error occured
                    alert("Failed to fetch user data - this is a bug!");
                }

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
import { useNavigate } from "react-router-dom"
import { PartialUser } from "@twit2/std-library-fe"
import "./ProfileListItem.scss";
import { AvatarBox } from "../layout/AvatarBox";
import { BadgeContainer } from "../page/user/BadgeContainer";
import { UserManager } from "../../app/UserManager";

export const ProfileListItem = (props: { target: PartialUser })=>{
    const nav = useNavigate();

    return <div className="profile-item">
        <div className="left">
            <AvatarBox onClick={()=>nav(`/user/@${props.target?.username}`)} user={props.target}/>
        </div>
        <div className="right">
            <div className="user-info">
                <div className="combo">
                    <span className="dname" onClick={()=>nav(`/user/@${props.target?.username}`)}>{(props.target?.displayName !== '') ? props.target?.displayName : props.target?.username} <BadgeContainer badges={UserManager.getBadges(props.target)}/></span> 
                    <span className="uname"> @{props.target?.username}</span>
                </div>
                {/* { (props.target.id === (AppContext.currentUser as PartialUser).id) ? '' : <button>Follow</button> } */}
            </div>
            { (props.target.biography !== undefined) ? <div className="text-content">
                { props.target.biography }
            </div> : '' }
        </div>
    </div>
}
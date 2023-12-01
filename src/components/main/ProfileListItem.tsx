import { useNavigate } from "react-router-dom"
import { PartialUser } from "../../api/user/PartialUser"
import "./ProfileListItem.scss";

export const ProfileListItem = (props: { target: PartialUser })=>{
    const nav = useNavigate();

    return <div className="profile-item">
        <div className="left">
            <div className="avatar" onClick={()=>nav(`/user/@${props.target?.username}`)} style={{ /* backgroundImage: `${props.user.avatarUrl}` */ }}></div>
        </div>
        <div className="right">
            <div className="user-info">
                <div className="combo">
                    <span className="dname" onClick={()=>nav(`/user/@${props.target?.username}`)}>{(props.target?.displayName !== '') ? props.target?.displayName : props.target?.username}</span> 
                    <span className="uname"> @{props.target?.username}</span>
                </div>
                <button>Follow</button>
            </div>
            { (props.target.biography !== undefined) ? <div className="text-content">
                { props.target.biography }
            </div> : '' }
        </div>
    </div>
}
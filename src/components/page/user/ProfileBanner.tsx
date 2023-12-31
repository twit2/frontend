import { PartialUser } from "@twit2/std-library-fe"
import { AppContext } from "../../../app/AppContext"
import { AvatarBox } from "../../layout/AvatarBox";
import "./ProfileBanner.scss"
import { ProfileEditDialog } from "./dialogs/ProfileEditDialog";
import { BadgeContainer } from "./BadgeContainer";
import { UserManager } from "../../../app/UserManager";
import { useNavigate } from "react-router-dom";

export const ProfileBanner = (props: { user: PartialUser }) => {
    const nav = useNavigate();

    const showEditDialog = ()=>{
        AppContext.ui.createDlg({
            title: "Edit Profile",
            content: <ProfileEditDialog user={props.user}/>,
            canClose: false,
            buttons: [] // We will roll our own
        });
    };

    const oldBanner = UserManager.getBannerURL(props.user);

    return <div className="ui-pfbanner" style={oldBanner ? {backgroundImage: `url(${oldBanner})`} : {}}>
        <div className="profile">
            <AvatarBox user={props.user}/>
            <div className="information">
                { props.user.displayName !== '' ? <>
                    <div className="name">{props.user.displayName} <BadgeContainer badges={UserManager.getBadges(props.user)}/></div>
                    <div className="username">@{props.user.username}</div>
                </> : <div className="name">@{props.user.username}</div> }
                <div className="extra-box">
                    <div className="info">
                        <div>
                            <span className="date">Date Joined: {new Date(props.user.dateJoined).toLocaleDateString()}</span>
                        </div>
                        <div>
                            <span className="followed" onClick={()=>nav('./following')}>{props.user.followingCount} following</span>
                            <span> | </span>
                            <span className="follow" onClick={()=>nav('./followers')}>{props.user.followCount} followers</span>
                        </div>
                    </div>
                    { (props.user.id === (AppContext.currentUser ?? { id: '' }).id) ? <button onClick={()=>showEditDialog()}>Edit</button> : '' }
                </div>
            </div>
        </div>
    </div>
}
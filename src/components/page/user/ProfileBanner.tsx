import { PartialUser } from "../../../api/user/PartialUser"
import { AppContext } from "../../../app/AppContext"
import "./ProfileBanner.scss"
import { ProfileEditDialog } from "./dialogs/ProfileEditDialog";

export const ProfileBanner = (props: { user: PartialUser }) => {
    const showEditDialog = ()=>{
        AppContext.ui.createDlg({
            title: "Edit Profile",
            content: <ProfileEditDialog user={props.user}/>,
            canClose: false,
            buttons: [] // We will roll our own
        });
    };

    return <div className="ui-pfbanner">
        <div className="profile">
            <div className="avatar"></div>
            <div className="information">
                { props.user.displayName !== '' ? <>
                    <div className="name">{props.user.displayName}</div>
                    <div className="username">@{props.user.username}</div>
                </> : <>
                    <div className="name">@{props.user.username}</div>
                </> }
                <div className="extra-box">
                    <div className="info">
                        <div>
                            <span className="date">Date Joined: {new Date(props.user.dateJoined).toLocaleDateString()}</span>
                        </div>
                        <div>
                            <span className="followed">{props.user.followingCount} following</span> |
                            <span className="follow">{props.user.followCount} followers</span>
                        </div>
                    </div>
                    { (props.user.id === (AppContext.currentUser ?? { id: '' }).id) ? <button onClick={()=>showEditDialog()}>Edit</button> : '' }
                </div>
            </div>
        </div>
    </div>
}
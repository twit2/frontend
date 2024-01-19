import { PartialUser } from "@twit2/std-library-fe";
import { AppContext } from "../../../app/AppContext"
import { AvatarBox } from "../../layout/AvatarBox";
import { ProfileEditDialog } from "./dialogs/ProfileEditDialog";
import { BadgeContainer } from "./BadgeContainer";
import { UserManager } from "../../../app/UserManager";
import { useNavigate } from "react-router-dom";
import { UserRelationStatistics } from "../../../app/types/UserRelationStatistics";
import { useState } from "react";
import { RelationsManager } from "../../../app/RelationsManager";
import { RelationState } from "../../../app/types/RelationState";
import "./ProfileBanner.scss"

export const ProfileBanner = (props: { user: PartialUser, stats: UserRelationStatistics, relationStatus: RelationState }) => {
    const nav = useNavigate();
    const [relState, setRelState] = useState(props.relationStatus); // TODO get from props
    const [relStats, setRelStats] = useState(props.stats);
    const [busy, setBusy] = useState(false);

    const showEditDialog = ()=>{
        AppContext.ui.createDlg({
            title: "Edit Profile",
            content: <ProfileEditDialog user={props.user}/>,
            canClose: false,
            buttons: [] // We will roll our own
        });
    };

    /**
     * Changes the relationship.
     */
    async function changeRelationship() {
        setBusy(true);

        if(relState.following) {
            // Unfollow
            await RelationsManager.unfollow(props.user.id);
            setRelStats({ ...relStats, ...{ followers: relStats.followers - 1 } });
            setRelState({ ...relState, ...{ following: false } });
        } else {
            // Follow
            await RelationsManager.follow(props.user.id);
            setRelStats({ ...relStats, ...{ followers: relStats.following + 1 } });
            setRelState({ ...relState, ...{ following: true } });
        }

        setBusy(false);
    }

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
                            <span className="followed" onClick={()=>nav('./following')}>{relStats.following} following</span>
                            <span> | </span>
                            <span className="follow" onClick={()=>nav('./followers')}>{relStats.followers} follower{(props.stats.following === 1) ? 's' : ''}</span>
                        </div>
                    </div>
                    { (props.user.id === (AppContext.currentUser ?? { id: '' }).id) ? <button onClick={()=>showEditDialog()}>Edit</button> : <button className={busy ? 'busy' : ''} onClick={()=>changeRelationship()}>{relState.following ? "Unfollow" : "Follow"}</button> }
                </div>
            </div>
        </div>
    </div>
}
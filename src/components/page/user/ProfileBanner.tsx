import { PartialUser } from "../../../api/user/PartialUser"
import "./ProfileBanner.scss"

export const ProfileBanner = (props: { user: PartialUser }) => {
    return <div className="ui-pfbanner">
        <div className="profile">
            <div className="avatar"></div>
            <div className="information">
                <div className="name">@{props.user.username}</div>
                <div className="extra-box">
                    <div>
                        <span className="date">Date Joined: {new Date(props.user.dateJoined).toLocaleDateString()}</span>
                    </div>
                    <div>
                        <span className="followed">{props.user.followingCount} following</span> |
                        <span className="follow">{props.user.followCount} followers</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
}
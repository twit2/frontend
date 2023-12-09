import { PartialUser } from "@twit2/std-library-fe";
import { AvatarBox } from "./AvatarBox";

/**
 * Creates a new profile box.
 * @param props Properties.
 */
export const ProfileBox = (props: { user?: PartialUser })=><div className="profile-box">
    <AvatarBox user={props.user}/>
    <div className="username">@{(props.user != null) ? props.user.username : '<unknown>'}</div>
</div>
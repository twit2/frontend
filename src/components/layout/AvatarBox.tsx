import { PartialUser } from "../../api/user/PartialUser";
import { UserManager } from "../../app/UserManager";

interface AvatarProps {
    user?: PartialUser;
    onClick?: (user?: PartialUser)=>void;
}

function getUrl(user?: PartialUser) {
    if(user) {
        const url = UserManager.getAvatarURL(user);

        if(url)
            return { backgroundImage: `url(${url})` };
    }

    return {};
}

export const AvatarBox = (props: AvatarProps)=>
    <div className="avatar" style={getUrl(props.user)} onClick={()=>{
        if(props.onClick)
            props.onClick(props.user);
    }}></div>
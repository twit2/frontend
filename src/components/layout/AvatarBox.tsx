import { PartialUser } from "../../api/user/PartialUser";
import { UserManager } from "../../app/UserManager";

interface AvatarProps {
    user?: PartialUser;

    /** Temporary replacement image. */
    replImage?: string;
    onClick?: (user?: PartialUser)=>void;
}

function getUrl(props: AvatarProps) {
    if(props.replImage)
        return { backgroundImage: `url(${props.replImage})` };

    if(props.user) {
        const url = UserManager.getAvatarURL(props.user);

        if(url)
            return { backgroundImage: `url(${url})` };
    }

    return {};
}

export const AvatarBox = (props: AvatarProps)=>
    <div className="avatar" style={getUrl(props)} onClick={()=>{
        if(props.onClick)
            props.onClick(props.user);
    }}></div>
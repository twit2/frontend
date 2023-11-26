import { useNavigate } from "react-router-dom";
import { Post } from "../../api/posts/Post";
import { PartialUser } from "../../api/user/PartialUser";
import "./PostComponent.scss";

export const PostComponent = (props: { post: Post, user: PartialUser, static: boolean })=>{
    const nav = useNavigate();

    return <div className={"ui-post" + (props.static ? ' static' : '')} onClick={()=>{
        if(!props.static)
            nav(`/user/@${props.user.username}/post/${props.post.id}`)
    }}>
        <div className="left">
            <div className="avatar" onClick={()=>nav(`/user/@${props.user.username}`)} style={{ /* backgroundImage: `${props.user.avatarUrl}` */ }}></div>
        </div>
        <div className="right">
            <div className="user-info">
                <a href={`/user/@${props.user.username}`}>{(props.user.displayName !== '') ? props.user.displayName : props.user.username}</a> 
                <span className="uname"> @{props.user.username}</span>
            </div>
            <div className="text-content">
                { props.post.textContent }
            </div>
            <div className="date-marker">
                <span className="date">{new Date(props.post.datePosted).toDateString()} @ {new Date(props.post.datePosted).toLocaleTimeString()}</span>
            </div>
        </div>
    </div>;
}
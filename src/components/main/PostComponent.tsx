import { useNavigate } from "react-router-dom";
import { Post } from "../../api/posts/Post";
import { PartialUser } from "../../api/user/PartialUser";
import "./PostComponent.scss";
import { DropDownButton } from "../basic/DropDownButton";
import { DropDownMenuItem } from "../basic/DropDownMenu";
import { AppContext } from "../../app/AppContext";
import { PostRemoveDialog } from "../post/dialogs/PostRemoveDialog";

export const PostComponent = (props: { post: Post, user: PartialUser, static: boolean })=>{
    const nav = useNavigate();

    const postItems: DropDownMenuItem[] = [
        { id: "permalink", icon: "link", label: "Make Link", onclick: ()=>{
            AppContext.ui.createDlg({
                title: "Post Permalink",
                content: `${window.location.origin}/user/@${props.user.username}/post/${props.post.id}`
            });
        } },
        { id: "edit", icon: "edit", label: "Edit", onclick: ()=>{} },
        { id: "delete", icon: "delete", label: "Delete", onclick: (args: any)=>{
            AppContext.ui.createDlg({
                title: "Delete Post",
                content: <PostRemoveDialog id={args as string}/>,
                canClose: false,
                buttons: []
            })
        } },
    ];

    // Render component
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
                <DropDownButton items={postItems} args={props.post.id}/>
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
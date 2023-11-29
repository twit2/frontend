import { useNavigate } from "react-router-dom";
import { Post } from "../../api/posts/Post";
import { PartialUser } from "../../api/user/PartialUser";
import "./PostComponent.scss";
import { DropDownButton } from "../basic/DropDownButton";
import { DropDownMenuItem } from "../basic/DropDownMenu";
import { AppContext } from "../../app/AppContext";
import { PostRemoveDialog } from "../post/dialogs/PostRemoveDialog";
import { NewPostDialog, PostDialogMode } from "../../ui/main/dialogs/NewPostDialog";

export const PostComponent = (props: { post: Post, user: PartialUser, static: boolean })=>{
    const nav = useNavigate();

    const dropdownItems: DropDownMenuItem[] = [
        { id: "permalink", icon: "link", label: "Make Link", onclick: ()=>{
            AppContext.ui.createDlg({
                title: "Post Permalink",
                content: `${window.location.origin}/user/@${props.user.username}/post/${props.post.id}`
            });
        } }
    ];

    if(props.user.id === AppContext.currentUser?.id) {
        dropdownItems.push({ id: "edit", icon: "edit", label: "Edit", onclick: (args: Post)=>{
            AppContext.ui.createDlg({
                title: "Edit Post",
                content: <NewPostDialog mode={PostDialogMode.Edit} prev={args}/>,
                canClose: true,
                buttons: []
            })
        } });

        dropdownItems.push({ id: "delete", icon: "delete", label: "Delete", onclick: (args: Post)=>{
            AppContext.ui.createDlg({
                title: "Delete Post",
                content: <PostRemoveDialog id={args.id}/>,
                canClose: false,
                buttons: []
            })
        } });
    }

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
                <DropDownButton items={dropdownItems} args={props.post}/>
            </div>
            <div className="text-content">
                { props.post.textContent }
                { (props.post.dateEdited != null) ? <span className="edited-indicator"> (edited)</span> : '' }
            </div>
            <div className="date-marker">
                <span className="date">{new Date(props.post.datePosted).toDateString()} @ {new Date(props.post.datePosted).toLocaleTimeString()}</span>
            </div>
        </div>
    </div>;
}
import { useNavigate } from "react-router-dom";
import { Post, PartialUser } from "@twit2/std-library-fe";
import { DropDownButton } from "../../basic/DropDownButton";
import { DropDownMenuItem } from "../../basic/DropDownMenu";
import { AppContext } from "../../../app/AppContext";
import { PostRemoveDialog } from "../../post/dialogs/PostRemoveDialog";
import { NewPostDialog, PostDialogMode } from "../../../ui/main/dialogs/NewPostDialog";
import { useEffect, useState } from "react";
import { ObjectStores } from "../../../app/ObjectStores";
import { PostStatsContainer } from "./PostStatsContainer";
import { AvatarBox } from "../../layout/AvatarBox";
import { BadgeContainer } from "../../page/user/BadgeContainer";
import { UserManager } from "../../../app/UserManager";
import "./PostComponent.scss";
import { STParser } from "../../../app/util/SpecialTextParser";

export const PostComponent = (props: { post: Post, static: boolean, onclick?: (user?: PartialUser)=>void })=>{
    const nav = useNavigate();
    let [user, setUser] = useState<PartialUser>();
    let dropdownItems: DropDownMenuItem[] = [];

    useEffect(()=> {
        async function fetchUser() {
            setUser(await ObjectStores.user.get(props.post.authorId));
        }

        fetchUser();
    }, [user, props.post.authorId]);

    if(user) {
        dropdownItems = [
            { id: "permalink", icon: "link", label: "Make Link", onclick: ()=>{
                AppContext.ui.createDlg({
                    title: "Post Permalink",
                    content: `${window.location.origin}/user/@${user?.username}/post/${props.post.id}`
                });
            } }
        ];
    
        if(user.id === AppContext.currentUser?.id) {
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
    }

    // Render component
    return <div className={"ui-post" + (props.static ? ' static' : '')} onClick={()=>{
        if((!props.static) && (props.onclick != null))
            props.onclick(user);

    }}>
        <div className="top">
            <div className="left">
                <AvatarBox onClick={()=>nav(`/user/@${user?.username}`)} user={user}></AvatarBox>
            </div>
            <div className="right">
                <div className="user-info">
                    <span className="dname" onClick={()=>nav(`/user/@${user?.username}`)}>{(user?.displayName !== '') ? user?.displayName : user?.username} <BadgeContainer badges={UserManager.getBadges(user as PartialUser)}/></span> 
                    <span className="uname"> @{user?.username}</span>
                    <DropDownButton items={dropdownItems} args={props.post}/>
                </div>
                <div className="text-content st-body">
                    { STParser.parse(props.post.textContent) }
                    { (props.post.dateEdited != null) ? <span className="edited-indicator"> (edited)</span> : '' }
                </div>
                <div className="date-marker">
                    <span className="date">{new Date(props.post.datePosted).toDateString()} @ {new Date(props.post.datePosted).toLocaleTimeString()}</span>
                </div>
            </div>
        </div>
        <div className="bottom">
            <PostStatsContainer post={props.post}/>
        </div>
    </div>;
}
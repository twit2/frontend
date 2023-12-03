import { useNavigate } from "react-router-dom"
import { Post } from "../../api/posts/Post"
import { PartialUser } from "../../api/user/PartialUser"
import "./ReplyBox.scss";
import { useState } from "react";
import { ErrorBox } from "../form/ErrorBox";
import { PostManager } from "../../app/PostManager";

export const ReplyBox = (props: { user: PartialUser, post: Post })=>{
    const nav = useNavigate();
    let [reply, setReply] = useState("");
    let [error, setError] = useState("");

    /**
     * Submits the reply.
     */
    async function submit() {
        try {
            await PostManager.createPost({
                textContent: reply,
                replyToId: props.post.id
            });

            document.location.reload();
        } catch(e) {
            setError((e as Error).message);
        }
    }

    return <div className="ui-reply-box">
        <div className="top">
            <div className="left">
                <div className="avatar" onClick={()=>nav(`/user/@${props.user.username}`)} style={{ /* backgroundImage: `${props.user.avatarUrl}` */ }}></div>
            </div>
            <div className="input">
                <textarea className="ui-post-text" placeholder="Post a reply" onChange={(e)=>{
                    const parentNode = e.target.parentNode as any;
                    parentNode.dataset.replicatedValue = e.target.value;
                    
                    setReply(e.target.value);
                }} value={reply}></textarea>
            </div>
            <div className="right">
                <button onClick={()=>submit()}>Reply</button>
            </div>
        </div>
        { error !== "" ? <ErrorBox text={error}/> : '' }
    </div>
}
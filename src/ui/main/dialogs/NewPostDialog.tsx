import "./NewPostDialog.scss";

import { ErrorBox } from "../../../components/form/ErrorBox"
import { PostEditorComponent } from "../../../components/post/PostEditorComponent"
import { useState } from "react";
import { sendAPIRequest } from "../../../api/APIRequester";
import { Post } from "../../../api/posts/Post";
import { APIResponse } from "../../../api/APIResponse";

export enum PostDialogMode {
    Edit,
    Create
}

export const NewPostDialog = (props: { mode: PostDialogMode, prev?: Post }) => {
    const CHRS_MAX = 280;

    if(props.mode === PostDialogMode.Edit && (!props.prev))
        throw new Error("Edit component doesn't link valid previous post - tell a developer!");

    let [error, setError] = useState("");
    let [postText, setPostText] = useState((props.prev != null) ? props.prev.textContent : '');

    async function submit() {
        if(postText.trim() === "") {
            setError("Post cannot be empty.");
            return;
        }

        let apiReq: APIResponse<unknown>;

        switch(props.mode) {
            default:
            case PostDialogMode.Create:
                apiReq = await sendAPIRequest("/post", "POST", {
                    textContent: postText
                });
                break;
            case PostDialogMode.Edit:
                apiReq = await sendAPIRequest(`/post/${props.prev?.id}`, "PATCH", {
                    id: props.prev?.id,
                    textContent: postText
                });
                break;
        }

        if(!apiReq.success)
            setError(apiReq.message);
        else
            document.location.reload(); // Hacky!!!
    } 

    return <div className="new-post-dlg">
        <PostEditorComponent onchange={(v)=>setPostText(v)} initialValue={postText}/>
        { error !== "" ? <ErrorBox text={error}/> : '' }
        <div className="bottom">
            <div className="info">
                <span className={"char-count" + ((postText.length > CHRS_MAX) ? ' overflow' : '')}>{postText.length}/{CHRS_MAX}</span>
            </div>
            <div className="buttons">
                <button onClick={()=>submit()}>Submit</button>
            </div>
        </div>
    </div>
}
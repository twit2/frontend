import "./NewPostDialog.scss";

import { ErrorBox } from "../../../components/form/ErrorBox";
import { PostEditorComponent } from "../../../components/post/PostEditorComponent";
import { useState } from "react";
import { Post } from "@twit2/std-library-fe";
import { PostManager } from "../../../app/PostManager";

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

        try {
            switch(props.mode) {
                case PostDialogMode.Edit:
                    await PostManager.editPost(props.prev?.id as string, { textContent: postText });
                    break;
                case PostDialogMode.Create:
                default:
                    await PostManager.createPost({ textContent: postText });
                    break;
            }

            document.location.reload();
        } catch(e) {
            setError((e as Error).message);
        }
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
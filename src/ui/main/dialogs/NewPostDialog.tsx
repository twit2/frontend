import "./NewPostDialog.scss";

import { ErrorBox } from "../../../components/form/ErrorBox"
import { PostEditorComponent } from "../../../components/post/PostEditorComponent"
import { useState } from "react";
import { sendAPIRequest } from "../../../api/APIRequester";

export const NewPostDialog = (props: {}) => {
    const CHRS_MAX = 280;

    let [error, setError] = useState("");
    let [postText, setPostText] = useState("");

    /**
     * Submits the post.
     */
    async function submitPost() {
        if(postText.trim() == "") {
            setError("Post cannot be empty.");
            return;
        }

        const apiReq = await sendAPIRequest("/post", "POST", {
            textContent: postText
        });

        if(!apiReq.success)
            setError(apiReq.message);
        else
            document.location.reload(); // Hacky!!!
    } 

    return <div className="new-post-dlg">
        <PostEditorComponent onchange={(v)=>setPostText(v)}/>
        { error !== "" ? <ErrorBox text={error}/> : '' }
        <div className="bottom">
            <div className="info">
                <span className={"char-count" + ((postText.length > CHRS_MAX) ? ' overflow' : '')}>{postText.length}/{CHRS_MAX}</span>
            </div>
            <div className="buttons">
                <button onClick={()=>submitPost()}>Post</button>
            </div>
        </div>
    </div>
}
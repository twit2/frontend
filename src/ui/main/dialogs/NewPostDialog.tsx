import "./NewPostDialog.scss";

import { ErrorBox } from "../../../components/form/ErrorBox"
import { PostEditorComponent } from "../../../components/post/PostEditorComponent"
import { useState } from "react";

export const NewPostDialog = (props: {}) => {
    const CHRS_MAX = 280;

    let [error, setError] = useState("");
    let [charCount, setCharCount] = useState(0);

    return <div className="new-post-dlg">
        <PostEditorComponent onchange={(v)=>setCharCount(v.length)}/>
        { error !== "" ? <ErrorBox text={error}/> : '' }
        <div className="bottom">
            <div className="info">
                <span className={"char-count" + ((charCount > CHRS_MAX) ? ' overflow' : '')}>{charCount}/{CHRS_MAX}</span>
            </div>
            <div className="buttons">
                <button>Post</button>
            </div>
        </div>
    </div>
}
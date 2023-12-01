import { useState } from "react";
import { AppContext } from "../../../app/AppContext";
import { ErrorBox } from "../../form/ErrorBox";
import "./PostRemoveDialog.scss";
import { sendAPIRequest } from "../../../api/APIRequester";

export const PostRemoveDialog = (props: { id: string })=>{
    const [error, setError] = useState("");

    /**
     * Deletes the post.
     */
    const deletePost = async()=> {
        const resp = await sendAPIRequest(`/post/${props.id}`, 'DELETE');

        if(!resp.success) {
            setError(resp.message);
        } else {
            // Remove post from feed
            if(window.location.pathname.endsWith(props.id))
                window.history.go(-1);

            document.location.reload();
        }
    }

    return <div className="dlg-post-delete">
        <div className="text">Are you sure you want to delete this post? This cannot be undone!</div>
        { error !== "" ? <ErrorBox text={error}/> : '' }
        <div className="buttons">
            <button className="danger" onClick={()=>deletePost()}>
                Delete
            </button>
            <button onClick={()=>AppContext.ui.closeDlg()}>
                Cancel
            </button>
        </div>
    </div>;
}
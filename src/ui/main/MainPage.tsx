// Main Page

import { useEffect, useState } from "react";
import { LoadingContainer } from "../../components/basic/LoadingContainer";
import { Sidebar } from "../../components/layout/Sidebar";
import "./MainPage.scss";
import { PartialUser } from "../../api/user/PartialUser";
import { sendAPIRequest } from "../../api/APIRequester";
import { Outlet } from "react-router-dom";
import { DialogContainer } from "../../components/wm/DialogContainer";
import { NewPostDialog } from "./dialogs/NewPostDialog";
import { Dialog } from "../../components/wm/Dialog";

enum DialogId {
    None = 0,
    NewPost = 1
}

/**
 * Renders the main page.
 * @returns The main page.
 */
export const MainPage = ()=> {
    const [fetchBusy, setFetchBusy] = useState(false);
    const [user, setUser] = useState<PartialUser>();
    const [dialog, setDialog] = useState(DialogId.None);

    // Fetch user profile
    useEffect(()=>{
        const fetchUser = async()=> {
            if(!fetchBusy)
                setFetchBusy(true);
            else
                return;

            try {
                const userResp = await sendAPIRequest<PartialUser>("/user/@me", "GET");

                if((userResp.data == null) || (!userResp.success)) {
                    // Say an error occured
                    alert("Failed to fetch user data - this is a bug!");
                }

                setUser(userResp.data);
            } catch(e) {
                // Inform user of error
                console.error(e);
            }
        }

        fetchUser();
    });
    
    return (user == null) ? <LoadingContainer/> : <>
        <DialogContainer>
            { (()=>{
                switch(dialog) {
                    case DialogId.NewPost:
                        return <Dialog title="New Post" onclose={()=>setDialog(DialogId.None)}>
                            <NewPostDialog/>
                        </Dialog>;
                }
                return '';
            })() }
        </DialogContainer>
        <div className="page main">
            <div className="main-layout">
                <div className="left">
                    <Sidebar username={user?.username} avatarUrl={user?.avatarUrl} primaryAction={()=>setDialog(DialogId.NewPost)}/>
                </div>
                <div className="right">
                    <Outlet/>
                </div>
            </div>
        </div>
    </>;
}


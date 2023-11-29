// Main Page

import { useEffect, useState } from "react";
import { LoadingContainer } from "../../components/basic/LoadingContainer";
import { Sidebar } from "../../components/layout/Sidebar";
import "./MainPage.scss";
import { PartialUser } from "../../api/user/PartialUser";
import { sendAPIRequest } from "../../api/APIRequester";
import { Outlet } from "react-router-dom";
import { DialogContainer } from "../../components/wm/DialogContainer";
import { NewPostDialog, PostDialogMode } from "./dialogs/NewPostDialog";
import { Dialog } from "../../components/wm/Dialog";
import { AppContext } from "../../app/AppContext";
import { DialogArgs } from "../wm/dlg/DialogArgs";
import { BasicDialog } from "../../components/wm/BasicDialog";

enum DialogId {
    None = 0,
    NewPost = 1,
    Custom = 100
}

/**
 * Renders the main page.
 * @returns The main page.
 */
export const MainPage = ()=> {
    const [fetchBusy, setFetchBusy] = useState(false);
    const [user, setUser] = useState<PartialUser>();
    const [dialog, setDialog] = useState(DialogId.None);
    const [dialogData, setDialogData] = useState<any>({});

    // Hook dialog function in app context
    AppContext.ui.createDlg = (args)=>{
        setDialogData(args);
        setDialog(DialogId.Custom);
    }

    AppContext.ui.closeDlg = ()=> {
        setDialogData(null);
        setDialog(DialogId.None);
    }

    // Fetch user profile
    useEffect(()=>{
        const fetchData = async()=> {
            if(!fetchBusy)
                setFetchBusy(true);
            else
                return;

            try {
                const userResp = await sendAPIRequest<PartialUser>("/user/@me", "GET");

                if((userResp.data == null) || (!userResp.success)) {
                    AppContext.ui.createDlg({ title: "Error", content: "Failed to refresh user profile!" })
                    return;
                }
                
                setUser(userResp.data);
                AppContext.currentUser = userResp.data;
            } catch(e) {
                // Inform user of error
                console.error(e);
            }
        }

        fetchData();
    });
    
    return (user == null) ? <LoadingContainer/> : <>
        <DialogContainer>
            { (()=>{
                switch(dialog) {
                    case DialogId.Custom: {
                        let args = {
                            ...{
                                title: "Alert",
                                content: "",
                                buttons: [ { id: "ok", onClick: "$close", label: "Ok" } ],
                                canClose: true
                            },
                            ...dialogData
                        } as DialogArgs;
                        
                        return <Dialog title={args.title} onclose={()=>setDialog(DialogId.None)} hideClose={!args.canClose}>
                            <BasicDialog args={args} onclose={()=>setDialog(DialogId.None)}/>
                        </Dialog>;
                    }
                    case DialogId.NewPost:
                        return <Dialog title="New Post" onclose={()=>setDialog(DialogId.None)}>
                            <NewPostDialog mode={PostDialogMode.Create}/>
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


// Main Page

import { useEffect, useState } from "react";
import { LoadingContainer } from "../../components/basic/LoadingContainer";
import { Sidebar } from "../../components/layout/Sidebar";
import "./MainPage.scss";
import { PartialUser, APIError } from "@twit2/std-library-fe";
import { Outlet, useNavigate } from "react-router-dom";
import { DialogContainer } from "../../components/wm/DialogContainer";
import { NewPostDialog, PostDialogMode } from "./dialogs/NewPostDialog";
import { Dialog } from "../../components/wm/Dialog";
import { AppContext } from "../../app/AppContext";
import { DialogArgs } from "../wm/dlg/DialogArgs";
import { BasicDialog } from "../../components/wm/BasicDialog";
import { UserManager } from "../../app/UserManager";

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
    const navigate = useNavigate();
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
                const fetchedUser = await UserManager.getCurrentUser();
                setUser(fetchedUser);
                AppContext.currentUser = fetchedUser;
            } catch(e) {
                if(e instanceof APIError) {
                    if(e.resp.code === 1003) {
                        navigate('/');
                        return;
                    }
                }

                AppContext.ui.createDlg({ title: "Error", content: "Failed to refresh user profile!" })
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
                    <Sidebar username={user?.username} avatarUrl={user?.avatarURL} primaryAction={()=>setDialog(DialogId.NewPost)}/>
                </div>
                <div className="right">
                    <Outlet/>
                </div>
            </div>
        </div>
    </>;
}


// Home Page
import { useState } from "react";
import "./HomePage.scss";
import { DialogContainer } from "../../components/wm/DialogContainer";
import { Dialog } from "../../components/wm/Dialog";
import { LoginDialog } from "./dialogs/LoginDialog";

enum DlgState {
    None = 0,
    Login = 1,
    Register = 2
}

/**
 * Renders the home page.
 * @returns 
 */
export const HomePage = ()=>{
    let [dialog, setDialog] = useState(DlgState.None);

    return <>
        <DialogContainer>
            { (()=>{
                switch(dialog) {
                    case DlgState.Login:
                        return <Dialog title={"Log In"} onclose={()=>setDialog(DlgState.None)}>
                            <LoginDialog/>
                        </Dialog>
                }
            })() }
        </DialogContainer>
        <div className="page home">
            <div className="right form">
                <div className="title">Twit2</div>
                <div className="subtitle">The next generation of social media</div>
                <div className="separator"></div>
                <div className="buttons">
                    <button onClick={()=>setDialog(DlgState.Login)}>Log In</button>
                    <button>Create Account</button>
                </div>
                <div className="links">
                    <a href="/tos">Terms of Service</a> | 
                    <a href="/privacy">Privacy Policy</a>
                </div>
            </div>
        </div>
    </>;
}


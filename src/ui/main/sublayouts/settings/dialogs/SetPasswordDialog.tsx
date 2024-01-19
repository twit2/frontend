import { Form, FormInputField, LoadingContainer } from "@twit2/std-library-fe";
import { useState } from "react";
import { AppContext } from "../../../../../app/AppContext";
import { UserManager } from "../../../../../app/UserManager";

export const SetPasswordDialog = ()=>{
    const [password, setPassword] = useState("");
    const [busy, setBusy] = useState(false);

    async function updatePassword() {
        try {
            setBusy(true);
            await UserManager.updatePassword(password);
            AppContext.ui.closeDlg();
            AppContext.ui.createDlg({ title: "Success", content: `Password has been updated successfully.` });
        } catch(e) {
            AppContext.ui.createDlg({ title: "Error", content: `Could not update password: ${(e as Error).message}` });
        }
    }

    return <div className="set-pwd-dlg" style={{ minWidth: 300 }}>
        { busy ? <LoadingContainer/> : <>
            <Form>
                <FormInputField label="New Password" type="password" value={password} onchange={(b)=>setPassword(b)}/>
            </Form>
            <div className="buttons">
                <button onClick={()=>AppContext.ui.closeDlg()}>Cancel</button>
                <button onClick={()=>updatePassword()}>Change</button>
            </div>
        </> }
    </div>;
}
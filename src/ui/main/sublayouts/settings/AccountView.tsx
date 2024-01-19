import { AppContext } from "../../../../app/AppContext";
import { DescriptiveButton } from "../../../../components/layout/misc/DescriptiveButton";
import { SetPasswordDialog } from './dialogs/SetPasswordDialog';
import "./AccountView.scss";

export const AccountView = ()=>{
    function showPasswordChangeDlg() {
        AppContext.ui.createDlg({
            title: "Set New Password",
            content: <SetPasswordDialog/>,
            canClose: true,
            buttons: []
        })
    }

    return <div className="sv-account">
        <div className="title-s2">General Settings</div>
        <DescriptiveButton title="Change account password" description="Set a new password for your account. Note that this will not log you out of existing sessions.">
            <button onClick={()=>showPasswordChangeDlg()}>Change...</button>
        </DescriptiveButton>

        {/* <DescriptiveButton title="Change account username" description="This change will invalidate all old profile links.">
            <button>Change...</button>
        </DescriptiveButton> */}
    </div>
}
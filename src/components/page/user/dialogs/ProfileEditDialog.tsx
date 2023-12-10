import { useState } from "react"
import { PartialUser } from "@twit2/std-library-fe"
import { Form } from "../../../form/Form"
import { FormInputField } from "../../../form/FormInputField"
import { LoadingContainer } from "../../../basic/LoadingContainer"
import { AppContext } from "../../../../app/AppContext"
import { useNavigate } from "react-router-dom"
import { UserChangeOp } from "../../../../app/op/user/UserChangeOp"
import { UserManager } from "../../../../app/UserManager"
import { BannerPreviewBox } from "../BannerPreviewBox"

export const ProfileEditDialog = (props: { user: PartialUser })=>{
    const CHRS_MAX = 256;

    let [busy, setBusy] = useState(false);
    let [displayName, setDisplayName] = useState(props.user.displayName ?? '');
    let [biography, setBiography] = useState(props.user.biography ?? '');
    let [avatarFile, setAvatarFile] = useState<File>();
    let [bannerFile, setBannerFile] = useState<File>();

    let nav = useNavigate();

    async function saveChanges() {
        setBusy(true);

        const changeReq: UserChangeOp = {};

        // Ensure we only forward properties which have been changed
        if(props.user.biography !== biography)
            changeReq.biography = biography;

        if(props.user.displayName !== displayName)
            changeReq.displayName = displayName;

        try {
            await UserManager.updateUserProfile(changeReq);
        } catch(e) {
            AppContext.ui.createDlg({ title: "Error", content: "Could not update profile." });
            return;
        }

        // Update the profile picture
        try {
            if(avatarFile)
                await UserManager.updateAvatar(avatarFile);
        } catch(e) {
            AppContext.ui.createDlg({ title: "Error", content: "Could not update profile picture." });
            return;
        }

        // Update the banner picture
        try {
            if(bannerFile)
                await UserManager.updateBanner(bannerFile);
        } catch(e) {
            AppContext.ui.createDlg({ title: "Error", content: "Could not update banner picture." });
            return;
        }

        AppContext.ui.closeDlg();
        nav(0); // Reload page
    }

    return <div className="dlg-profile-edit" style={{ minWidth: 350 }}>
        { busy ? <LoadingContainer/> : <>
            <Form>
                <BannerPreviewBox user={props.user} onchange={(avatarFile, bannerFile)=>{
                    if(avatarFile)
                        setAvatarFile(avatarFile);

                    if(bannerFile)
                        setBannerFile(bannerFile);
                }}/>

                <FormInputField label="Display Name" type="text" value={displayName} onchange={(t)=>setDisplayName(t)}/>
                <FormInputField label="Biography" type="text" value={biography} extended={true} onchange={(b)=>setBiography(b)}/>
                <div className="counter" style={{ color: (biography.length > CHRS_MAX) ? 'red' : undefined, textAlign: 'right' }}>{biography.length}/{CHRS_MAX}</div>
            </Form>
            <div className="buttons">
                <button onClick={()=>AppContext.ui.closeDlg()}>Cancel</button>
                <button onClick={()=>saveChanges()}>Save</button>
            </div>
        </> }
    </div>
}
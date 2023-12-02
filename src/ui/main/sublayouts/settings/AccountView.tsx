import { DescriptiveButton } from "../../../../components/layout/misc/DescriptiveButton";
import "./AccountView.scss";

export const AccountView = ()=><div className="sv-account">
    <div className="title-s2">General Settings</div>
    <DescriptiveButton title="Change account password" description="Set a new password for your account. Note that this will not log you out of existing sessions.">
        <button>Change...</button>
    </DescriptiveButton>

    <DescriptiveButton title="Change account username" description="This change will invalidate all old profile links.">
        <button>Change...</button>
    </DescriptiveButton>
</div>
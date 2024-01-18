import { useParams } from "react-router-dom"
import { TitleHeader } from "../../../components/layout/TitleHeader"
import { CommandItem, CommandList } from "../../../components/layout/lists/CommandList"
import { AboutView } from "./settings/AboutView";
import { AccountView } from "./settings/AccountView";
import "./SettingsView.scss";
import { CenteredListButton } from "../../../components/basic/CenteredListButton";
import { UserManager } from "../../../app/UserManager";

const pages = [
    {
        id: "account",
        name: "Account Settings"
    },
    {
        id: "about",
        name: "About Twit2"
    }
];

export const SettingsView = ()=>{
    const params = useParams();
    const page = params.page as string;

    return <div className="view settings">
        { (page != null) ? <>
            <TitleHeader title={pages.find(x => x.id === page)?.name ?? "Unknown"} backAction={true}/>
            { (()=>{
                switch(page) {
                    case 'about':
                        return <AboutView/>
                    case 'account':
                        return <AccountView/>
                    default:
                        return 'Unknown page';
                }
            })() }
        </> : <>
            <TitleHeader title={"Settings"}/>
            <CommandList>
                <CommandItem link="/settings/account" title="Account Settings" description="Modify account settings (username, password, etc.)" icon="accounts"/>
                <CommandItem link="/settings/about" title="About Twit2" description="Project credits and version." icon="t2"/>
            </CommandList>
            <CenteredListButton text="Log out" onclick={()=>UserManager.logOff()}/>
        </> }
    </div>
}
import { useEffect, useState } from "react";
import { PartialUser } from "@twit2/std-library-fe"
import { AppContext } from "../../app/AppContext"
import { ProfileListItem } from "./ProfileListItem"
import { PaginatedAPIData } from "@twit2/std-library-fe";
import { LoadBox } from "./LoadBox";
import { UserManager } from "../../app/UserManager";

export enum ProfileListMode {
    Latest,
    Followers,
    Following
}

export const ProfileList = (props: { mode: ProfileListMode, target: string })=>{
    const [users, setUsers] = useState<PartialUser[]>();
    const [page, setPage] = useState(0);
    const [showLoader, setShowLoader] = useState(false);
    const [done, setDone] = useState(false);

    useEffect(()=>{
        async function getUsers() {
            if(done)
                return;

            let userResp: PaginatedAPIData<PartialUser>;

            try {
                switch(props.mode) {
                    case ProfileListMode.Latest:
                    default:
                        userResp = await UserManager.getLatestProfiles(page);
                        break;
                }
            } catch(e) {
                AppContext.ui.createDlg({ title: "Error", content: "Unable to retrieve list." })
                return;
            }

            const newUsers = userResp.data as PartialUser[];

            setShowLoader(newUsers.length >= userResp.pageSize);

            setUsers([
                ...users ?? [],
                ...newUsers,
            ]);
    
            setDone(true);
        }

        getUsers();
    }, [done, page, props.mode, users]);

    return <div className="ui-profile-list">
        { users?.map(x => <ProfileListItem key={x.id} target={x}/>) }

        { (showLoader) ? <LoadBox loading={false} label="Load More" onclick={()=>{
            setPage(page + 1);
            setDone(false);
        }}/> : '' }
    </div>
}
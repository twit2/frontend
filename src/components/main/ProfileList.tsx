import { useEffect, useState } from "react";
import { PartialUser } from "../../api/user/PartialUser"
import { AppContext } from "../../app/AppContext"
import { ProfileListItem } from "./ProfileListItem"
import { sendAPIRequest } from "../../api/APIRequester";
import { PaginatedAPIData } from "../../api/PaginatedAPIData";
import { LoadBox } from "./LoadBox";

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

            let userResp;

            switch(props.mode) {
                case ProfileListMode.Latest:
                default:
                    userResp = await sendAPIRequest<PaginatedAPIData<PartialUser>>(`/user/latest/${page}`, "GET");
                    break;
            }

            if((userResp.data == null) || (!userResp.success)) {
                AppContext.ui.createDlg({ title: "Error", content: "Unable to retrieve list." })
                return;
            }

            const newUsers = userResp.data?.data as PartialUser[];

            setShowLoader(newUsers.length >= userResp.data.pageSize);

            setUsers([
                ...users ?? [],
                ...newUsers,
            ]);
    
            setDone(true);
        }

        getUsers();
    }, [done]);

    return <div className="ui-profile-list">
        { users?.map(x => <ProfileListItem key={x.id} target={x}/>) }

        { (showLoader) ? <LoadBox loading={false} label="Load More" onclick={()=>{
            setPage(page + 1);
            setDone(false);
        }}/> : '' }
    </div>
}
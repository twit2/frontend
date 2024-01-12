import { useCallback, useEffect, useState } from "react";
import { PartialUser, PaginatedAPIData } from "@twit2/std-library-fe";
import { AppContext } from "../../app/AppContext";
import { ProfileListItem } from "./ProfileListItem";
import { LoadBox } from "./LoadBox";
import { UserManager } from "../../app/UserManager";
import { RelationsManager } from "../../app/RelationsManager";

export enum ProfileListMode {
    Latest,
    Verified,
    Followers,
    Following
}

export const ProfileList = (props: { mode: ProfileListMode, target: string })=>{
    const [users, setUsers] = useState<PartialUser[]>();
    const [page, setPage] = useState(0);
    const [lastMode, setLastMode] = useState(props.mode);
    const [showLoader, setShowLoader] = useState(false);
    const [done, setDone] = useState(false);

    const getUsers = useCallback(async()=> {
        if(done)
            return;

        let userResp: PaginatedAPIData<PartialUser>;

        try {
            switch(props.mode) {
                case ProfileListMode.Verified:
                    userResp = await UserManager.getLatestProfiles('verified', page);
                    break;
                case ProfileListMode.Followers:
                case ProfileListMode.Following: {
                    userResp = await RelationsManager.getRelationsList((props.mode === ProfileListMode.Followers) ? 'followers' : 'following', props.target.substring(1), page);
                    break;
                }
                case ProfileListMode.Latest:
                default:
                    userResp = await UserManager.getLatestProfiles('latest', page);
                    break;
            }

            setLastMode(props.mode);
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
    }, [done, page, props.mode, users]);

    useEffect(()=>{
        if(lastMode !== props.mode) {
            setUsers([]);
            setPage(0);
            setDone(false);
            getUsers();
        }
        
        // Tell ESLint to shut up (For now)
        // eslint-disable-next-line
    }, [lastMode, props.mode]);

    useEffect(()=>{
        getUsers();
    }, [done, page, props.mode, users, getUsers]);

    return <div className="ui-profile-list">
        { users?.map(x => <ProfileListItem key={x.id} target={x}/>) }

        { (showLoader) ? <LoadBox loading={false} label="Load More" onclick={()=>{
            setPage(page + 1);
            setDone(false);
        }}/> : '' }
    </div>
}
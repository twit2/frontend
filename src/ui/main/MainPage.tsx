// Main Page

import { useEffect, useState } from "react";
import { LoadingContainer } from "../../components/basic/LoadingContainer";
import { Sidebar } from "../../components/layout/Sidebar";
import "./MainPage.scss";
import { PartialUser } from "../../api/user/PartialUser";
import { sendAPIRequest } from "../../api/APIRequester";
import { Outlet } from "react-router-dom";

/**
 * Represents a sub layout.
 */
interface SubLayout<T> {
    /**
     * Sublayout view ID.
     */
    id: SubLayoutView;

    /**
     * Arguments to pass to sub layout.
     */
    args: T;
}

/**
 * Sub layout view enum.
 * 
 * Contains all possible sub layouts for the main layout.
 */
enum SubLayoutView {
    Feed = 0,
    Profile = 1
}

/**
 * Renders the main page.
 * @returns The main page.
 */
export const MainPage = ()=> {
    const [fetchBusy, setFetchBusy] = useState(false);
    const [user, setUser] = useState<PartialUser>();

    useEffect(()=>{
        const fetchUser = async()=> {
            if(!fetchBusy)
                setFetchBusy(true);
            else
                return;

            try {
                const userResp = await sendAPIRequest<PartialUser>("/user/@me", "GET");

                if((userResp.data == null) || (!userResp.success)) {
                    // Say an error occured
                    alert("Failed to fetch user data - this is a bug!");
                }

                setUser(userResp.data);
            } catch(e) {
                // Inform user of error
                console.error(e);
            }
        }

        fetchUser();
    });
    
    return (user == null) ? <LoadingContainer/> : <div className="page main">
        <div className="main-layout">
            <div className="left">
                <Sidebar username={user?.username} avatarUrl={user?.avatarUrl}/>
            </div>
            <div className="right">
                <Outlet/>
            </div>
        </div>
    </div>;
}


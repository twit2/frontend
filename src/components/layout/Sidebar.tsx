import { useEffect, useState } from "react";
import { ProfileBox } from "./ProfileBox";
import "./Sidebar.scss";
import { useNavigate } from "react-router-dom";
import { HamburgerMenu } from "./menu/HamburgerMenu";
import { AppContext } from "../../app/AppContext";

interface SidebarProps {
    username: string;
    avatarUrl?: string | null;
    primaryAction?: ()=>void;
}

export interface SidebarLink {
    name: string;
    link: string;
    selected: boolean;
};

const MEDIA_MOBILE_MAXWIDTH = 768;

/**
 * Represents a UI sidebar.
 */
export const Sidebar = (props: SidebarProps)=> {
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(false);

    // Resize effect
    useEffect(()=>{
        const resizeEvent = ()=>setIsMobile(window.innerWidth <= MEDIA_MOBILE_MAXWIDTH);
        resizeEvent(); // Call manually
        window.addEventListener('resize', resizeEvent);
        return ()=>window.removeEventListener('resize', resizeEvent);
    });

    const links : SidebarLink[] = [
        { name: "Feed", link: "/feed", selected: false },
        { name: "Discover", link: "/discover", selected: false },
        // { name: "Notifications", link: "/notifications", selected: false },
        // { name: "Messages", link: "/dm", selected: false },
        { name: "Profile", link: "/user/@%U".replace("%U", props.username), selected: false },
        { name: "Settings", link: "/settings", selected: false }
    ];

    // Figure out which one is selected
    const curPath = window.location.pathname;

    links.forEach((v, i) => {
        if(v.link === curPath)
            links[i].selected = true;
    });

    return isMobile ? <div className="sidebar-mobile">
        <HamburgerMenu links={links}/>
        <div className="title">Twit2</div>
    </div> : <div className="sidebar">
        <div className="title">Twit2</div>
        <ProfileBox user={AppContext.currentUser}/>
        <div className="buttons">
            { links.map(x => <button className={(x.selected ? 'selected' : '')} key={x.link} onClick={()=>navigate(x.link)}>{x.name}</button>) }
            <button className="primary" onClick={()=>props.primaryAction?.call(this)}>+ Create Post</button>
        </div>
    </div>;
}
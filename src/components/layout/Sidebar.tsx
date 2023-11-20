import { MouseEventHandler } from "react";
import { ProfileBox } from "./ProfileBox";
import "./Sidebar.scss";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
    username: string;
    avatarUrl?: string | null;
}

/**
 * Represents a UI sidebar.
 */
export const Sidebar = (props: SidebarProps)=> {
    const navigate = useNavigate();

    const links = [
        { name: "Discover", link: "/discover", selected: false },
        { name: "Feed", link: "/feed", selected: false },
        { name: "Notifications", link: "/notifications", selected: false },
        { name: "Messages", link: "/dm", selected: false },
        { name: "Profile", link: "/user/@%U".replace("%U", props.username), selected: false },
    ]

    // Figure out which one is selected
    const curPath = window.location.pathname;

    links.forEach((v, i) => {
        if(v.link == curPath)
            links[i].selected = true;
    });

    return <div className="sidebar">
        <div className="title">Twit2</div>
        <ProfileBox username={props.username ?? '<unknown>'} avatarUrl={props.avatarUrl ?? ''}/>
        <div className="buttons">
            { links.map(x => <button className={(x.selected ? 'selected' : '')} key={x.link} onClick={()=>navigate(x.link)}>{x.name}</button>) }
            <button className="primary" onClick={()=>alert('todo')}>+ Create Post</button>
        </div>
    </div>;
}
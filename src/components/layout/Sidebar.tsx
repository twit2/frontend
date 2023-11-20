import { MouseEventHandler } from "react";
import { ProfileBox } from "./ProfileBox";
import "./Sidebar.scss";

interface SidebarProps {
    username?: string;
    avatarUrl?: string | null;
}

/**
 * Represents a UI sidebar.
 */
export const Sidebar = (props: SidebarProps)=><div className="sidebar">
    <div className="title">Twit2</div>
    <ProfileBox username={props.username ?? '<unknown>'} avatarUrl={props.avatarUrl ?? ''}/>
    <div className="buttons">
        <button className="">Discover</button>
        <button className="selected">My Feed</button>
        <button className="">Notifications</button>
        <button className="">Direct Messages</button>
        <button className="primary">+ Create Post</button>
    </div>
</div>
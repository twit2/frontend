import { MouseEventHandler } from "react";
import { ProfileBox } from "./ProfileBox";
import "./Sidebar.scss";

interface SidebarItem {
    /**
     * Item name.
     */
    name: string;

    /**
     * Onclick event.
     */
    onclick: MouseEventHandler<HTMLButtonElement>;
}

/**
 * Represents a UI sidebar.
 */
export const Sidebar = (props: { items: SidebarItem[] })=><div className="sidebar">
    <div className="title">Twit2</div>
    <ProfileBox username="Demo User" avatarUrl=""/>
    <div className="items">
        { props.items.map(x => <button className="item" onClick={x.onclick}>{x.name}</button>) }
    </div>
    <button className="primary">+ Create Post</button>
</div>
import { MouseEventHandler } from "react";
import { ProfileBox } from "./ProfileBox";
import "./Sidebar.scss";

/**
 * Represents a UI sidebar.
 */
export const Sidebar = (props: { })=><div className="sidebar">
    <div className="title">Twit2</div>
    <ProfileBox username="Demo User" avatarUrl=""/>
    <div className="buttons">
        <button className="selected">My Feed</button>
        <button className="">Notifications</button>
        <button className="">Direct Messages</button>
        <button className="primary">+ Create Post</button>
    </div>
</div>
import { useState } from "react";
import { TabControl } from "../../../components/layout/TabControl"
import { TitleHeader } from "../../../components/layout/TitleHeader"
import { PostBox, PostBoxMode } from "../../../components/main/PostBox";
import { ProfileList, ProfileListMode } from "../../../components/main/ProfileList";

export const DiscoverView = ()=>{
    let [activeTab, setActiveTab] = useState("posts");
    
    return <div className="view discover">
        <TitleHeader title={"Discover"} />
        <TabControl pages={[
            { id: "posts", label: "Posts" },
            { id: "users", label: "Users" }
        ]} activeTab="posts" ontab={(id)=>setActiveTab(id)}/>
        { (() => {
            switch(activeTab) {
                case "users":
                    return <ProfileList mode={ProfileListMode.Latest} target={""}/>
                case "posts":
                default:
                    return <PostBox mode={PostBoxMode.LatestPosts} target={""}/>;
            }
        })() }
    </div>
}
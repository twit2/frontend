import { TitleHeader } from "../../../components/layout/TitleHeader";
import { PostBox, PostBoxMode } from "../../../components/main/post/PostBox";

export const FeedView = ()=><div className="view feed">
    <TitleHeader title="My Feed"/>
    <PostBox mode={PostBoxMode.FeedPosts} target={""}/>
</div>;
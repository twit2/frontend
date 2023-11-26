import { useEffect, useState } from "react";
import { PartialUser } from "../../api/user/PartialUser"
import { Post } from "../../api/posts/Post";
import { sendAPIRequest } from "../../api/APIRequester";
import { PaginatedAPIData } from "../../api/PaginatedAPIData";
import { AppContext } from "../../app/AppContext";
import { PostComponent } from "./PostComponent";
import { LoadBox } from "./LoadBox";

export const PostBox = (props: { targetUser: PartialUser })=>{
    const [posts, setPosts] = useState<Post[]>([]);
    const [showLoader, setShowLoader] = useState(false);
    const [done, setDone] = useState(false);
    const [page, setPage] = useState(0);

    const fetchPosts = async() => {
        if(!done)
            setDone(true);
        else
            return;

        // Get posts
        const postResp = await sendAPIRequest<PaginatedAPIData<Post>>(`/post/${props.targetUser.id}/${page}`, "GET");

        if((postResp.data == null) || (!postResp.success)) {
            AppContext.ui.createDlg({ title: "Error", content: "Unable to retrieve posts." })
            return;
        }

        const newPosts = postResp.data?.data as Post[];

        setShowLoader(newPosts.length >= postResp.data.pageSize);

        setPosts([
            ...posts,
            ...newPosts,
        ]);
    }

    useEffect(()=>{
        fetchPosts();
    });

    return <div className="post-box">
        { posts.map(x => <PostComponent post={x} user={props.targetUser} key={x.id} static={false}/>) }
        { (showLoader) ? <LoadBox loading={false} label="Load More" onclick={()=>{
            setPage(page + 1);
            setDone(false);
            fetchPosts();
        }}/> : '' }
    </div>
}
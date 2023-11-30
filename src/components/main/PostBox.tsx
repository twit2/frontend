import { useEffect, useState } from "react";
import { Post } from "../../api/posts/Post";
import { sendAPIRequest } from "../../api/APIRequester";
import { PaginatedAPIData } from "../../api/PaginatedAPIData";
import { AppContext } from "../../app/AppContext";
import { PostComponent } from "./PostComponent";
import { LoadBox } from "./LoadBox";

export enum PostBoxMode {
    ProfilePosts,
    LatestPosts,
    Replies
}

export const PostBox = (props: { mode: PostBoxMode, target: string })=>{
    const [posts, setPosts] = useState<Post[]>();
    const [done, setDone] = useState(false);
    const [showLoader, setShowLoader] = useState(false);
    const [page, setPage] = useState(0);

    const fetchPosts = async() => {
        if(done)
            return;

        // Get posts
        let postResp;

        switch(props.mode) {
            case PostBoxMode.Replies:
                postResp = await sendAPIRequest<PaginatedAPIData<Post>>(`/post/${props.target}/replies/${page}`, "GET");
                break;
            case PostBoxMode.LatestPosts:
                postResp = await sendAPIRequest<PaginatedAPIData<Post>>(`/post/latest/${page}`, "GET");
                break;
            case PostBoxMode.ProfilePosts:
            default:
                postResp = await sendAPIRequest<PaginatedAPIData<Post>>(`/post/${props.target}/${page}`, "GET");
                break;
        }

        if((postResp.data == null) || (!postResp.success)) {
            AppContext.ui.createDlg({ title: "Error", content: "Unable to retrieve posts." })
            return;
        }

        const newPosts = postResp.data?.data as Post[];

        setShowLoader(newPosts.length >= postResp.data.pageSize);

        setPosts([
            ...posts ?? [],
            ...newPosts,
        ]);

        setDone(true);
    }

    useEffect(()=>{
        fetchPosts();
    });

    return <div className="post-box">
        { (posts ?? []).map(x => <PostComponent post={x} key={x.id} static={false}/>) }
        { (showLoader) ? <LoadBox loading={false} label="Load More" onclick={()=>{
            setPage(page + 1);
            setDone(false);
            fetchPosts();
        }}/> : '' }
    </div>
}
import { useEffect, useState } from "react";
import { Post } from "../../api/posts/Post";
import { sendAPIRequest } from "../../api/APIRequester";
import { PaginatedAPIData } from "../../api/PaginatedAPIData";
import { AppContext } from "../../app/AppContext";
import { PostComponent } from "./PostComponent";
import { LoadBox } from "./LoadBox";
import { useNavigate } from "react-router-dom";

export enum PostBoxMode {
    ProfilePosts,
    LatestPosts,
    Replies
}

export const PostBox = (props: { mode: PostBoxMode, target: string })=>{
    const nav = useNavigate();
    const [posts, setPosts] = useState<Post[]>();
    const [showLoader, setShowLoader] = useState(false);
    const [page, setPage] = useState(0);
    const [pageHistory, setPageHistory] = useState<number[]>([]);

    const fetchPosts = async() => {
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
            setPosts([]);
            return;
        }

        const newPosts = postResp.data?.data as Post[];

        setShowLoader(newPosts.length >= postResp.data.pageSize);

        if(!pageHistory.includes(page)) {
            setPosts([
                ...posts ?? [],
                ...newPosts,
            ]);

            setPageHistory([...pageHistory, ...[page]]);
        }
        // TODO fix
        
        return ()=> {
            setPosts([]);
            setPageHistory([]);
            setPage(0);
        }
    }

    useEffect(()=>{
        if(page > 0) // Initial call already fetches posts
            fetchPosts();
        // eslint-disable-next-line
    }, [page]);

    useEffect(()=>{
        setPageHistory([]);
        setPage(0);
        setPosts([]);
        fetchPosts();
        // eslint-disable-next-line
    }, [props.target]);

    return <div className="post-box">
        { (posts ?? []).map(x => <PostComponent post={x} key={x.id} static={false} onclick={(user)=>{
            nav(`/user/@${user?.username}/post/${x.id}`);
        }}/>) }
        { (showLoader) ? <LoadBox loading={false} label="Load More" onclick={()=>{
            setPage(page + 1);
        }}/> : '' }
    </div>
}
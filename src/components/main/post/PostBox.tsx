import { useEffect, useState } from "react";
import { Post } from "../../../api/posts/Post";
import { PaginatedAPIData } from "../../../api/PaginatedAPIData";
import { AppContext } from "../../../app/AppContext";
import { LoadBox } from "../LoadBox";
import { useNavigate } from "react-router-dom";
import { PartialUser } from "../../../api/user/PartialUser";
import { PostComponent } from "./PostComponent";
import { PostManager } from "../../../app/PostManager";

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
        let postResp: PaginatedAPIData<Post>;

        try {
            switch(props.mode) {
                case PostBoxMode.Replies:
                    postResp = await PostManager.getReplies(props.target, page);
                    break;
                case PostBoxMode.LatestPosts:
                    postResp = await PostManager.getLatestPosts(page);
                    break;
                case PostBoxMode.ProfilePosts:
                default:
                    postResp = await PostManager.getUserPosts(props.target, page);
                    break;
            }
        } catch(e) {
            console.error(e);
            AppContext.ui.createDlg({ title: "Error", content: "Unable to retrieve posts." })
            setPosts([]);
            return;
        }

        const newPosts = postResp.data as Post[];

        setShowLoader(newPosts.length >= postResp.pageSize);

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
        { (posts ?? []).map(x => <PostComponent post={x} key={x.id} static={false} onclick={(user?: PartialUser)=>{
            nav(`/user/@${user?.username}/post/${x.id}`);
        }}/>) }
        { (showLoader) ? <LoadBox loading={false} label="Load More" onclick={()=>{
            setPage(page + 1);
        }}/> : '' }
    </div>
}
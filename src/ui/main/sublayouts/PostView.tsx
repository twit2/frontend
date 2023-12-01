import { useEffect, useState } from "react";
import { Post } from "../../../api/posts/Post";
import { TitleHeader } from "../../../components/layout/TitleHeader";
import { useParams } from "react-router-dom";
import { PartialUser } from "../../../api/user/PartialUser";
import { sendAPIRequest } from "../../../api/APIRequester";
import { LoadingContainer } from "../../../components/basic/LoadingContainer";
import { PostComponent } from "../../../components/main/PostComponent";
import { AppContext } from "../../../app/AppContext";
import { ReplyBox } from "../../../components/post/ReplyBox";
import { PostBox, PostBoxMode } from "../../../components/main/PostBox";

export const PostView = ()=> {
    const params = useParams();
    const targetUsername = params.name as string;
    const targetPost = params.id as string;

    const [post, setPost] = useState<Post>();

    useEffect(()=>{
        const fetchPost = async()=> {
            try {
                // Get posts
                const postResp = await sendAPIRequest<Post>(`/post/view/${targetPost}`, "GET");

                if((postResp.data == null) || (!postResp.success)) {
                    AppContext.ui.createDlg({ title: "Error", content: "Unable to retrieve posts." })
                    return;
                }

                setPost(postResp.data);
            } catch(e) {
                // Inform user of error
                console.error(e);
            }
        }

        fetchPost();
    }, [targetUsername, targetPost]);

    return <div className="view post">
        <TitleHeader title="Post" backAction={true}/>
        { (post == null) ? <LoadingContainer/> : <>
            <PostComponent static={true} post={post as Post}/>
            <ReplyBox post={post as Post} user={AppContext.currentUser as PartialUser}/>
            <PostBox target={(post as Post).id} mode={PostBoxMode.Replies}/>
        </> }
    </div>;
}
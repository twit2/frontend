import { useEffect, useState } from "react";
import { Post } from "../../../api/posts/Post";
import { TitleHeader } from "../../../components/layout/TitleHeader";
import { useParams } from "react-router-dom";
import { PartialUser } from "../../../api/user/PartialUser";
import { LoadingContainer } from "../../../components/basic/LoadingContainer";
import { PostComponent } from "../../../components/main/post/PostComponent";
import { AppContext } from "../../../app/AppContext";
import { ReplyBox } from "../../../components/post/ReplyBox";
import { PostBox, PostBoxMode } from "../../../components/main/post/PostBox";
import { PostManager } from "../../../app/PostManager";
import { APIError } from "../../../api/APIError";
import { MessageListItem } from "../../../components/layout/lists/MessageListItem";

export const PostView = ()=> {
    const params = useParams();
    const targetUsername = params.name as string;
    const targetPost = params.id as string;

    const [post, setPost] = useState<Post>();
    const [error, setError] = useState("");

    useEffect(()=>{
        const fetchPost = async()=> {
            try {
                // Get posts
                const postResp = await PostManager.getPost(targetPost);
                setPost(postResp);
            } catch(e) {
                // Inform user of error
                if(e instanceof APIError) {
                    console.log(e.resp.code);
                    if(e.resp.code === 1001)
                        setError("Post not found.");
                }
                else
                    AppContext.ui.createDlg({ title: "Error", content: "Unable to retrieve posts." })
                
                console.error(e);
            }
        }

        fetchPost();
    }, [targetUsername, targetPost]);

    return <div className="view post">
        <TitleHeader title="Post" backAction={true}/>
        { (error !== "") ? <MessageListItem message={error}/> : '' }
        { (post == null) ? <LoadingContainer/> : <>
            <PostComponent static={true} post={post as Post}/>
            <ReplyBox post={post as Post} user={AppContext.currentUser as PartialUser}/>
            <PostBox target={(post as Post).id} mode={PostBoxMode.Replies}/>
        </> }
    </div>;
}
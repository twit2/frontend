import { useEffect, useState } from "react";
import { Post } from "../../../api/posts/Post";
import { TitleHeader } from "../../../components/layout/TitleHeader";
import { useNavigate, useParams } from "react-router-dom";
import { PartialUser } from "../../../api/user/PartialUser";
import { sendAPIRequest } from "../../../api/APIRequester";
import { LoadingContainer } from "../../../components/basic/LoadingContainer";
import { PostComponent } from "../../../components/main/PostComponent";

export const PostView = ()=> {
    const params = useParams();
    const targetUsername = params.name as string;
    const targetPost = params.id as string;

    const [post, setPost] = useState<Post>();
    const [author, setAuthor] = useState<PartialUser>();
    const [currentProfile, setCurrentProfile] = useState("");
    const navigate = useNavigate();

    useEffect(()=>{
        const fetchPost = async()=> {
            if(currentProfile !== targetUsername)
                setCurrentProfile(targetUsername);
            else
                return;

            try {
                // Get user
                const userResp = await sendAPIRequest<PartialUser>(`/user/${targetUsername}`, "GET");

                if((userResp.data == null) || (!userResp.success)) {
                    // Say an error occured
                    // alert("Failed to fetch user data - this is a bug!");
                    return;
                }

                // Get posts
                const postResp = await sendAPIRequest<Post>(`/post/view/${targetPost}`, "GET");

                if((postResp.data == null) || (!postResp.success)) {
                    // Say an error occured
                    // TODO put visual error instead
                    // alert("No posts to retrieve.");
                    return;
                }

                setPost(postResp.data);
                setAuthor(userResp.data);
            } catch(e) {
                // Inform user of error
                console.error(e);
            }
        }

        fetchPost();
    });

    return <div className="view post">
        <TitleHeader title="Post" backAction={()=>navigate(`/user/${targetUsername}`)}/>
        { (author == null) ? <LoadingContainer/> : <>
            <PostComponent static={true} post={post as Post} user={author}/>
        </> }
    </div>;
}
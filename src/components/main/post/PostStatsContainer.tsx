import { Post } from "@twit2/std-library-fe";
import "./PostStatsContainer.scss";

interface PostStatsContainerProps {
    post: Post;
}

interface StatButtonProps {
    count: number;
    icon: string;
    onClick?: ()=>void;
}

export const StatButton = (props: StatButtonProps) => {
    return <div className="stat-btn" onClick={(e)=>{
        e.stopPropagation();
        
        if(props.onClick)
            props.onClick();
    }}>
        <div className={"icon " + props.icon}></div>
        <div className="count">{props.count}</div>
    </div>
}

export const PostStatsContainer = (props: PostStatsContainerProps) => {
    return <div className="ui-post-stats">
        <StatButton icon="reply" count={props.post.stats.replies}/>
        <StatButton icon="like" count={props.post.stats.likes}/>
    </div>
}
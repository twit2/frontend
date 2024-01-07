import { useParams } from "react-router-dom"
import { TitleHeader } from "../../../components/layout/TitleHeader"
import { useEffect } from "react";

export enum RelationsViewType {
    followers = 1,
    following = 2,
    blocked = 3
}

export const RelationsView = (props: { type: RelationsViewType })=>{
    const params = useParams();
    const targetUsername = params.name as string;
    
    useEffect(()=>{
        
    });
    
    return <div className="view profile">
        <TitleHeader title={`${targetUsername}'s followers`} backAction={true}/>
    </div>
}
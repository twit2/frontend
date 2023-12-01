import { useNavigate } from "react-router-dom";
import "./TitleHeader.scss";

/**
 * Title header properties.
 */
interface TitleHeaderProps {
    /**
     * Header title
     */
    title: string;

    /**
     * Sets a back action.
     */
    backAction?: boolean;
}

export const TitleHeader = (props: TitleHeaderProps)=>{
    const nav = useNavigate();

    return <div className="hdr-title">
        { (props.backAction != null) ? <div className="back" onClick={()=>{
            nav(-1);
        }}></div> : '' }
        <span className="text">{ props.title }</span>
    </div>;
}
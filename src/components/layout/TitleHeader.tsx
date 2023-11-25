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
    backAction?: ()=>void;
}

export const TitleHeader = (props: TitleHeaderProps)=><div className="hdr-title">
    { (props.backAction != null) ? <div className="back" onClick={()=>props.backAction?.call(this)}></div> : '' }
    <span className="text">{ props.title }</span>
</div>
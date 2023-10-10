import "./TitleHeader.scss";

/**
 * Title header properties.
 */
interface TitleHeaderProps {
    /**
     * Header title
     */
    title: string;
}

export const TitleHeader = (props: TitleHeaderProps)=><div className="hdr-title">
    <span className="text">{ props.title }</span>
</div>
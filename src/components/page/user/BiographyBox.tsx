import "./BiographyBox.scss";

export const BiographyBox = (props: { text: string }) => {
    return <div className="bio-box">
        <div className="section-title">BIOGRAPHY</div>
        <div className="content">
            <div className="text">{props.text}</div>
        </div>
    </div>
}
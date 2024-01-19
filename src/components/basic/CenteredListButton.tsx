import "./CenteredListButton.scss";

export const CenteredListButton = (props: { text: string, onclick: ()=>void }) =><div className="cl-button" onClick={()=>props.onclick()}>
    { props.text }
</div>;
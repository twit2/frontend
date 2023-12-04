import "./MessageListItem.scss";

export const MessageListItem = (props: { message: string })=>{
    return <div className="ui-message">{props.message}</div>
}
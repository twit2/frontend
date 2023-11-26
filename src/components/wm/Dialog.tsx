import { MouseEventHandler } from "react";
import "./Dialog.scss";

interface DialogProps {
    title: string;
    onclose: MouseEventHandler<HTMLDivElement>;
    children?: any;
    hideClose?: boolean;
}

export const Dialog = (props: DialogProps)=>{
    return <div className="ui-dlg-backdrop">
        <div className="ui-dialog">
            <div className="top">
                <div className="title">{props.title}</div>
                <div className="buttons">
                    { props.hideClose ? '' : <div className="close" onClick={props.onclose}></div> }
                </div>
            </div>
            <div className="content">
                { props.children }
            </div>
        </div>
    </div>
}

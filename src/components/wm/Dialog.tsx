// Home Page
import { useState } from "react";
import "./Dialog.scss";

interface DialogProps {
    title: string;
    onclose: ()=>void;
    children: any;
}

export const Dialog = (props: DialogProps)=>{
    return <div className="ui-dialog">
        <div className="top">
            <div className="title">{props.title}</div>
            <div className="buttons">
                <div className="close">X</div>
            </div>
        </div>
        <div className="content">
            { props.children }
        </div>
    </div>
}

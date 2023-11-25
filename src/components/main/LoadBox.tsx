import { useState } from "react";
import "./LoadBox.scss";
import { LoadingContainer } from "../basic/LoadingContainer";

export const LoadBox = (props: { loading: boolean, label: string, onclick: ()=>void }) => {
    return <div className="ui-load-box">
        { props.loading ? <LoadingContainer/> : <span onClick={()=>props.onclick()}>{props.label}</span> }
    </div>
}
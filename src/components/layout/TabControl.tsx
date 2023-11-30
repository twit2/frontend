import { useEffect, useState } from "react";
import "./TabControl.scss";

interface TabPage {
    id: string;
    label: string;
}

interface TabControlProps {
    pages: TabPage[];
    ontab: (id: string)=>void;
    activeTab?: string;
}

export const TabControl = (props: TabControlProps)=>{
    let [activeTab, setActiveTab] = useState(props.activeTab ?? "");

    useEffect(()=>{
        if((activeTab === "") && (props.pages.length > 0))
            setActiveTab(props.pages[0].id);
    }, [props.pages, activeTab])

    return <div className="ui-tab-control">
        <div className="pages">
            { props.pages.map(x => <div key={x.id} className={"blade" + ((x.id === activeTab) ? ' active' : '')}
                onClick={()=>{
                    setActiveTab(x.id);
                    props.ontab(x.id);
                }}>{x.label}</div>) }
        </div>
    </div>
}
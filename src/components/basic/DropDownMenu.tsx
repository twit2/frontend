import { useEffect, useRef, useState } from "react";
import "./DropDownMenu.scss";

export interface DropDownMenuItem {
    icon?: string;
    label: string;
    id: string;
    onclick: (args?: any)=>void;
}

export interface DropDownMenuList {
    items: DropDownMenuItem[];
    x: number;
    y: number;
}

export const DropDownMenu = (props: { menu: DropDownMenuList })=>{
    const ref = useRef<HTMLDivElement>(null);
    const [xOff, setXoff] = useState(0);

    useEffect(()=>{
        if(!ref.current)
            return;

        const rect = ref.current.getBoundingClientRect();
        setXoff(rect.width);
    }, []);
    
    return <div style={{
        top: props.menu.y,
        left: props.menu.x - xOff,
        visibility: ((xOff > 0) ? 'visible' : 'hidden')
    }} className="dropdown-menu" ref={ref}>
        { props.menu.items.map(x => <div key={x.id} className="item" onClick={(e)=>{
            e.stopPropagation();
            x.onclick();
        }}>
            { x.icon != null ? <div className={"icon" + (x.icon != null ? ` ${x.icon}` : '')}></div> : '' }
            <span className="label">{x.label}</span>
        </div>) }
    </div>
}
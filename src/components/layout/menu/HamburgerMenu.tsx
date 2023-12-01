import { useState } from "react";
import { SidebarLink } from "../Sidebar";
import "./HamburgerMenu.scss";
import { useNavigate } from "react-router-dom";

export const HamburgerMenu = (props: { links: SidebarLink[] }) => {
    let [open, setOpen] = useState(false);
    const navigate = useNavigate();

    return <>
        <div className={"ui-hamburger-menu" + (open ? ' open' : '')} onClick={()=>setOpen(!open)}></div>
        { open ? <div className="ui-hamburger-list">
            { props.links.map(x => <div key={x.name} className={"item" + (x.selected ? ' selected' : '')} onClick={()=>{
                setOpen(false);
                navigate(x.link);
            }}>{x.name}</div>) }
        </div> : '' }
    </>
}
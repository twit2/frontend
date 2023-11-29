import { useEffect, useState } from "react";
import "./DropDownButton.scss";
import { DropDownMenu, DropDownMenuItem } from "./DropDownMenu";

export const DropDownButton = (props: { items: DropDownMenuItem[], args?: any })=>{
    let [menuShown, setMenuShown] = useState(false);
    let [coords, setCoords] = useState({x : 0, y: 0 });

    /** Function to close dropdown when other items are clicked. */
    const bodyEventListener = (e: MouseEvent)=>{
        if(!menuShown)
            return; // Do nothing

        setMenuShown(false);
    }

    /**
     * Item click handler.
     */
    const clickHandler = (e: React.MouseEvent<HTMLDivElement>): void => {
        e.stopPropagation();
        const pos = e.currentTarget.getBoundingClientRect();
        setCoords({ x: pos.left, y: pos.top + pos.height });
        setMenuShown(!menuShown);
    }

    useEffect(()=>{
        document.body.addEventListener('click', bodyEventListener);

        return ()=>{
            document.body.removeEventListener('click', bodyEventListener);
        };
    });
    
    return <>
        <div className={"dropdown-btn" + (menuShown ? ' active' : '')} onClick={clickHandler}></div>
        { menuShown ? <DropDownMenu menu={{
            items: props.items.map(x => {
                let oldCall = x.onclick;

                x.onclick = ()=>{
                    oldCall(props.args);
                    setMenuShown(false);
                };

                return x;
            }),
            x: coords.x,
            y: coords.y
        }}/> : '' }
    </>
}
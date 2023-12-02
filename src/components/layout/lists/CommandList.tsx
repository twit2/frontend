import { useNavigate } from "react-router-dom";
import "./CommandList.scss";

interface CommandItemProps {
    title: string;
    description: string;
    icon: string;
    link: string;
}

export const CommandList = (props: { children: any })=><div className="ui-cmd-list">{props.children}</div>

export const CommandItem = (props: CommandItemProps) => {
    const navigate = useNavigate();

    return <div className="cmd-item" onClick={()=>navigate(props.link)}>
        <div className="p1">
            <div className={`icon ${props.icon}`}></div>
        </div>
        <div className="p2">
            <div className="title">{props.title}</div>
            <div className="description">{props.description}</div>
        </div>
        <div className="arrow"></div>
    </div>
}
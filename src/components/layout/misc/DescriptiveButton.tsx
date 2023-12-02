import "./DescriptiveButton.scss";

export const DescriptiveButton = (props: { children: any, title: string, description: string })=><div className="ui-desc-btn">
    <div className="text">
        <div className="title">{props.title}</div>
        <div className="explanation">
            {props.description}
        </div>
    </div>
    <div className="buttons">
        {props.children}
    </div>
</div>
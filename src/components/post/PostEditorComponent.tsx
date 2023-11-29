import "./PostEditorComponent.scss";

interface EditorProps {
    onchange: (text: string)=>void;
    initialValue?: string;
}

export const PostEditorComponent = (props: EditorProps)=>{
    return <div className="ui-post-editor">
        <textarea className="ui-post-text" placeholder="Enter some text" onChange={(e)=>props.onchange(e.target.value)} value={props.initialValue}></textarea>
        {/* Not relevant for now, we are going to keep this to text<div className="controls">

        </div> */}
    </div>
}
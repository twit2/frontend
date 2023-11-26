import "./FormInputField.scss";

interface InputFieldProps {
    /**
     * Field label.
     */
    label: string;

    /**
     * On text change event.
     * @param text The changed text.
     */
    onchange?: (text: string)=>void;

    /**
     * On field submit event.
     * @param text The input text.
     */
    onsubmit?: (text: string)=>void;

    /**
     * The input field type. Has no effect on an extended field.
     */
    type: "text"|"password"|string;

    /**
     * Placeholder string.
     */
    placeholder?: string;

    /**
     * Initial value.
     */
    value?: string;

    /**
     * Whether this is an extended text field.
     */
    extended?: boolean;
}

export const FormInputField = (props: InputFieldProps)=><div className="ui-form-field">
    <div className="label">{ props.label }</div>
    <div className="input">
        { props.extended ? <>
            <textarea className="icomponent" placeholder={props.placeholder}
                onChange={(e)=>props.onchange?.call(this, e.currentTarget.value)}
                onKeyUp={(e)=>{
                    if(e.key === "Enter")
                        props.onsubmit?.call(this, e.currentTarget.value)
                }} value={props.value}></textarea>
        </> : <>
            <input className="icomponent" type={props.type} placeholder={props.placeholder}
                onChange={(e)=>props.onchange?.call(this, e.currentTarget.value)}
                onKeyUp={(e)=>{
                    if(e.key === "Enter")
                        props.onsubmit?.call(this, e.currentTarget.value)
                }} value={props.value}/>
        </> }
    </div>
</div>
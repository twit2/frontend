import "./FormInputField.scss";

interface InputFieldProps {
    label: string;
    onchange?: (text: string)=>void;
    onsubmit?: (text: string)=>void;
    type: "text"|"password"|string;
    placeholder?: string;
    value?: string;
}

export const FormInputField = (props: InputFieldProps)=><div className="ui-form-field">
    <div className="label">{ props.label }</div>
    <div className="input">
        <input type={props.type} placeholder={props.placeholder}
            onChange={(e)=>props.onchange?.call(this, e.currentTarget.value)}
            onKeyUp={(e)=>{
                if(e.key == "Enter")
                    props.onsubmit?.call(this, e.currentTarget.value)
            }} value={props.value}/>
    </div>
</div>
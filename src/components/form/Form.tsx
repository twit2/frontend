import "./Form.scss";

interface FormProps {
    children: any;
}

export const Form = (props: FormProps)=><div className="ui-form">
    { props.children }
</div>
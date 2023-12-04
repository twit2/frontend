import { useState } from "react";
import { Form } from "../../../components/form/Form";
import { FormInputField } from "../../../components/form/FormInputField";
import { ErrorBox } from "../../../components/form/ErrorBox";
import { LoadingContainer } from "../../../components/basic/LoadingContainer";
import { useNavigate } from "react-router-dom";
import { AuthManager } from "../../../app/AuthManager";

export const RegisterDialog = ()=>{
    let [error, setError] = useState("");
    let [busy, setBusy] = useState(false);
    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");
    const nav = useNavigate();

    /**
     * Submits the form.
     */
    async function submit() {
        if(username.trim() === "") {
            setError("No username specified.");
            return;
        } else if(password.trim() === "") {
            setError("No password specified.");
            return;
        }

        setBusy(true);

        // Send register request
        try {
            await AuthManager.register(username, password);
            nav(`/feed`);
        } catch(e) {
            setError(`Could not register: ${(e as Error).message}`);
            setBusy(false);
        }
    }

    return <div className="register-dlg">
        <Form>
            { busy ? <LoadingContainer/> : <>
                <p className="explanation">
                    To create an account, enter your details below.
                </p>
                <FormInputField label="Username" type={"text"} onchange={(v)=>setUsername(v)} value={username} onsubmit={(v)=>submit()}/>
                <FormInputField label="Password" type={"password"} onchange={(v)=>setPassword(v)} value={password} onsubmit={(v)=>submit()}/>
                <p>
                    By creating a new account, you agree to the <a href="/tos">Terms of Service</a>.
                </p>
                { (error !== "") ? <ErrorBox text={error}/> : '' }
                <button onClick={()=>submit()}>Create Account</button>
            </> }
        </Form>
    </div>
}


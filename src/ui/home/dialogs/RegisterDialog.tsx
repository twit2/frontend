import { useState } from "react";
import { Form } from "../../../components/form/Form";
import { FormInputField } from "../../../components/form/FormInputField";
import { ErrorBox } from "../../../components/form/ErrorBox";
import { LoadingContainer } from "../../../components/basic/LoadingContainer";
import { sendAPIRequest } from "../../../api/APIRequester";
import { useNavigate } from "react-router-dom";

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

        // Send login request
        const result = await sendAPIRequest<string>("/auth/register", "POST", { username, password });
        
        if(!result.success) {
            setError(`Could not register: ${result.message}`);
            setBusy(false);
        } else {
            // Store token and navigate to home page
            localStorage.setItem('auth-token', result.data as string);
            nav(`/feed`);
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


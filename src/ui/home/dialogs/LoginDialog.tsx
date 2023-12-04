import { useState } from "react";
import { Form } from "../../../components/form/Form";
import { FormInputField } from "../../../components/form/FormInputField";
import { ErrorBox } from "../../../components/form/ErrorBox";
import { LoadingContainer } from "../../../components/basic/LoadingContainer";
import { useNavigate } from "react-router-dom";
import { AuthManager } from "../../../app/AuthManager";

export const LoginDialog = ()=>{
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
        }
        else if(password.trim() === "") {
            setError("No password specified.");
            return;
        }

        setBusy(true);

        // Send login request
        try {
            await AuthManager.login(username, password);
            nav(`/feed`);
        } catch(e) {
            setError(`Could not login: ${(e as Error).message}`);
            setBusy(false);
        }
    }

    return <div className="login-dlg">
        <Form>
            { busy ? <LoadingContainer/> : <>
                <p className="explanation">
                    Enter your account details below to log in.
                </p>
                <FormInputField label="Username" type={"text"} onchange={(v)=>setUsername(v)} value={username} onsubmit={(v)=>submit()}/>
                <FormInputField label="Password" type={"password"} onchange={(v)=>setPassword(v)} value={password} onsubmit={(v)=>submit()}/>
                { (error !== "") ? <ErrorBox text={error}/> : '' }
                <button onClick={()=>submit()}>Log In</button>
            </> }
        </Form>
    </div>
}


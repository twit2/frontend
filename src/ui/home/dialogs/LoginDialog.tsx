import { useState } from "react";
import { Form } from "../../../components/form/Form";
import { FormInputField } from "../../../components/form/FormInputField";
import "./LoginDialog.scss";
import { ErrorBox } from "../../../components/form/ErrorBox";
import { LoadingContainer } from "../../../components/basic/LoadingContainer";
import { sendAPIRequest } from "../../../api/APIRequester";
import { useNavigate } from "react-router-dom";

/**
 * Renders the home page.
 * @returns 
 */
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
        if(username.trim() === "")
            return void setError("No username specified.");
        else if(password.trim() === "")
            return void setError("No password specified.");

        setBusy(true);

        // Send login request
        const result = await sendAPIRequest<string>("/auth/login", "POST", { username, password });
        
        if(!result.success) {
            setError(`Could not login: ${result.message}`);
            setBusy(false);
        } else {
            // Store token and navigate to home page
            localStorage.setItem('auth-token', result.data as string);
            nav(`/feed`);
        }
    }

    return <div className="login-dlg">
        <Form onsubmit={()=>{}}>
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


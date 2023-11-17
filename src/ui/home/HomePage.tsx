// Home Page
import { useState } from "react";
import "./HomePage.scss";

enum MainUI {
    Main = 0,
    Login = 1,
    Register = 2
}

/**
 * Renders the home page.
 * @returns 
 */
export const HomePage = ()=>{
    let [dialog, setDialog] = useState(MainUI.Main);

    return <div className="page home">
        <div className="right form">
            <div className="title">Twit2</div>
            <div className="subtitle">The next generation of social media</div>
            <div className="separator"></div>
            <div className="buttons">
                <button>Log In</button>
                <button>Create Account</button>
            </div>
            <div className="links">
                <a href="/tos">Terms of Service</a> | 
                <a href="/privacy">Privacy Policy</a>
            </div>
        </div>
    </div>;
}


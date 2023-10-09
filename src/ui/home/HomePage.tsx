// Home Page
import "./HomePage.scss";

/**
 * Renders the home page.
 * @returns 
 */
export const HomePage = ()=>{
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


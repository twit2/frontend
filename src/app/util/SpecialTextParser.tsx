import "./SpecialTextParser.scss";

const TOKENS = {
    USER_MENTION: "@",
    HASHTAG: "#"
}

const USERNAME_REGEXP = /^[a-zA-Z0-9_]*$/;

const isToken = (chr: String)=>{
    return (chr === TOKENS.USER_MENTION) || (chr === TOKENS.HASHTAG);
};

/**
 * Parses SpecialText, a form of text which may include rich components (such as a user mention, link, etc.).
 * @param text The text to parse.
 */
function parse(text: String) {
    const components : JSX.Element[] = [];

    let buffer = "";

    // Make tokens
    for(let x = 0; x < text.length; x++) {
        if(isToken(text[x])) { // always flush buffer first
            components.push(<>{buffer}</>);
            buffer = "";
        }

        // Process user mention
        if(text[x] === TOKENS.USER_MENTION) {
            let username = "";

            for(let y = x + 1; y < text.length; y++) {
                if(!USERNAME_REGEXP.test(text[y])) {
                    break;
                }

                username += text[y];
            }

            x += username.length;
            components.push(<a className="link" href={`/user/@${username}`}>@{username}</a>);

            continue;
        }

        buffer += text[x];
    }

    if(buffer !== "") {
        components.push(<>{buffer}</>);
        buffer = "";
    }

    return <>
        { components }
    </>;
}

export const STParser = {
    parse
}
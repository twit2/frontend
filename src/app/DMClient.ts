import { io } from "socket.io-client";

export const DM_URL = `/dm`;

let socket : ReturnType<typeof io>;

async function init() {
    if(socket)
        return; // Do not let user reinit twice by accident
    
    // socket = io(`${APIConfiguration.apiGwUrl}/${DM_URL}`);
    // console.log("DM client starting...");
    
}

/**
 * Direct messaging client.
 */
export const DMClient = {
    init
}
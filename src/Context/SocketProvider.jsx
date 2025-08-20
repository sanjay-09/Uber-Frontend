import { createContext } from "react";
import {io} from "socket.io-client";
const socket=io(`${import.meta.env.VITE_UBER_BACKEND_URL}`);

export const SocketContext=createContext();

const SocketProvider=({children})=>{

    const sendMessage=(eventName,message)=>{
        socket.emit(eventName,message);
    }
    const receiveMessage=(eventName,cb)=>{
        socket.on(eventName,cb);
    }

    return(
        <SocketContext.Provider value={{sendMessage,receiveMessage}}>
            {children}
        </SocketContext.Provider>
    )
}
export default SocketProvider;
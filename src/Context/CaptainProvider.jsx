import { createContext, useContext, useState } from "react";

const CaptainContext=createContext();
export const CaptainProvider=({children})=>{
    const [captainData,setCaptainData]=useState(null);


    return(
        <CaptainContext.Provider value={{captainData,setCaptainData}}>
            {children}
        </CaptainContext.Provider>
    )

}

export const useCaptain=()=>useContext(CaptainContext)
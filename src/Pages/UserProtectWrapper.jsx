import { useNavigate } from "react-router-dom";
import { useUser } from "../Context/UserProvider"
import { useEffect, useState } from "react";
import axios from "axios";

const UserProtectWrapper=({children})=>{
    console.log("protected");
    const {setUser}=useUser();
     const token=localStorage.getItem('token');
     const navigate=useNavigate();
     

     useEffect(()=>{
        console.log("useProtected useEffect");
        const verifyToken=async()=>{
            if(!token){
            navigate("/login");

        }
        try{

            const res=await axios.get(`${import.meta.env.VITE_UBER_BACKEND_URL}/api/v1/user/profile`,
                {
                    headers:{
                    Authorization:`Bearer ${token}`
                }
                }
            )
         
            if(res.status==200){
                
                
                setUser(res.data.data);

            }

        }
        catch(err){
            console.log(err);
          localStorage.removeItem("token");
          navigate("/login")
        }
        }
        verifyToken();
     },[]);
    return(
        <>
        {
            children
        }

        </>

    )
}
export default UserProtectWrapper;
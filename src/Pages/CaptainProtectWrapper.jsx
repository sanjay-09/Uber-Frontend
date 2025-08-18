import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCaptain } from "../Context/CaptainProvider";

const CaptainProtectWrapper=({children})=>{
    
const {setCaptainData}=useCaptain();
    console.log("captainProtected")
    const navigate=useNavigate();
    const token=localStorage.getItem("token");
    console.log("token",token);
   
   useEffect(() => {
    const verifyToken=async()=>{
        if(!token){
            navigate("/captain-login");
        }
        try{
            const res=await axios.get(`${import.meta.env.VITE_UBER_BACKEND_URL}/api/v1/captain/profile`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });
            if(res.status==200){
                setCaptainData(res.data.data);

            }

        }
        catch(err){
            console.log(err);
            localStorage.removeItem("token");
            navigate("/captain-login")
        }

    }
    verifyToken();
  }, []);
    return(
        <>
      {children}
        </>
    )
}
export default CaptainProtectWrapper;
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserLogout=()=>{
    const token=localStorage.getItem("token");
    const navigate=useNavigate();
    useEffect(()=>{
        logout();
    },[]);

    const logout=async()=>{
        try{
            const response=await axios.post(`${import.meta.env.VITE_UBER_BACKEND_URL}/api/v1/user/logout`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            if(response.status==200){
                localStorage.removeItem('token');
                
              navigate("/login")
            }


        }
        catch(err){
            console.log(err);

        }
    }
    return(
        <>
        <h1>User Logout</h1>

        </>
    )
}
export default UserLogout;
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCaptain } from "../Context/CaptainProvider";
import axios from "axios";
const Captainlogin=()=>{
  const navigate=useNavigate();
    const [formData,setFormData]=useState({
      email:"",
      password:""
    });
   
    const handleSubmit=async()=>{
      console.log(formData);

      try{
        const response=await axios.post(`${import.meta.env.VITE_UBER_BACKEND_URL}/api/v1/captain/login`,formData);
        if(response.status==200){
          console.log(response);
      
        
          localStorage.setItem('token',response.data.data);
          navigate("/captain-home")
        }

      }
      catch(err){
        console.log(err);

      }
         
    }
    const handleChange=(e)=>{
      const {name,value}=e.target;
      setFormData({
        ...formData,
        [name]:value
      })
    }

    return(
        <>
         <div className="flex justify-center items-center h-screen bg-white">
      <div className="w-full max-w-sm p-6">
        {/* Logo */}
        <h1 className="text-2xl font-bold mb-6">Uber Rider</h1>

        {/* Email Input */}
        <label className="block text-sm font-medium mb-1">What's your email</label>
        <input
          type="email"
          placeholder="email@example.com"
          name="email"
        value={formData.email}
        onChange={handleChange}
          className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black"
        />

        {/* Password Input */}
        <label className="block text-sm font-medium mb-1">Enter Password</label>
        <input
          type="password"
          placeholder="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black"
        />

        {/* Login Button */}
        <button className="w-full bg-black text-white py-2 rounded-md font-semibold hover:bg-gray-900 mb-4" onClick={handleSubmit}>
          Login
        </button>

        {/* Create Account Link */}
        <p className="text-center text-sm text-gray-600 mb-6">
          New here?{" "}
          <Link to="/captain-signup" className="text-blue-600 hover:underline">
            Create new Account
          </Link>
        </p>

       
        <button className="w-full bg-green-600 text-white py-2 rounded-md font-semibold hover:bg-green-700">
        <Link to="/login">Sign in as User</Link>
        </button>
      </div>
    </div>
        </>
    )
}
export default Captainlogin
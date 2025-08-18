import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../Context/UserProvider";
import axios from "axios";

const Login=()=>{
    const [formData,setFormData]=useState({
      email:"",
      password:""
    })
    const navigate=useNavigate();

    const {setUser}=useUser();

    const handleChange=(e)=>{
      const {name,value}=e.target;
      setFormData({
        ...formData,
        [name]:value

      })

      

    }

    const handleSubmit=async()=>{
       const final_data={
        email:formData.email,
        password:formData.password
       }
      
     try{

      const response=await axios.post(`${import.meta.env.VITE_UBER_BACKEND_URL}/api/v1/user/login`,final_data);
      console.log(response);
     
      localStorage.setItem('token',response.data.data);
      navigate("/home");
      
     }
     catch(err){
      console.log(err);
     }

      
       
    }

    return(
        <>
         <div className="flex justify-center items-center h-screen bg-white">
      <div className="w-full max-w-sm p-6">
        {/* Logo */}
        <h1 className="text-2xl font-bold mb-6">Uber</h1>

        {/* Email Input */}
        <label className="block text-sm font-medium mb-1">What's your email</label>
        <input
          type="email"
          name="email"
          placeholder="email@example.com"
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
          <Link to="/Signup" className="text-blue-600 hover:underline">
            Create new Account
          </Link>
        </p>

        {/* Sign in as Captain Button */}
        <button className="w-full bg-green-600 text-white py-2 rounded-md font-semibold hover:bg-green-700">
        <Link to="/captain-login">Sign in as Capta</Link>in
        </button>
      </div>
    </div>
        </>
    )
}
export default Login;
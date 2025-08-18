import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUser } from "../Context/UserProvider";
import axios from "axios"

const Signup = () => {
  console.log("Signup component");
  const {user}=useUser();
  console.log(user);
    const [formData,setFormData]=useState({
      firstName:"",
      lastName:"",
      email:"",
      password:""
    })
    const navigate=useNavigate();

    const handleChange=(e)=>{
      const {name,value}=e.target;
      setFormData({
        ...formData,
        [name]:value
      })

    }

    const handleSubmit=async ()=>{
      const final_data={
        fullName:{
          firstName:formData.firstName,
          lastName:formData.lastName
        },
        email:formData.email,
        password:formData.password
      }

     try{
     
       const response=await axios.post(`${import.meta.env.VITE_UBER_BACKEND_URL}/api/v1/user/create`,final_data);
       if(response.status==201){
        navigate("/login");
        
       }
     }
     catch(err){
      console.log(err);
     }

    }

  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <div className="w-full max-w-sm p-6">
        
        {/* Page Title */}
        <h1 className="text-2xl font-bold mb-6">User Signup</h1>

        {/* First Name */}
        <label className="block text-sm font-medium mb-1">First Name</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="John"
          className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black"
        />

        {/* Last Name */}
        <label className="block text-sm font-medium mb-1">Last Name</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Doe"
          className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black"
        />

        {/* Email */}
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          placeholder="johndoe@example.com"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black"
        />

        {/* Password */}
        <label className="block text-sm font-medium mb-1">Password</label>
        <input
          type="password"
          placeholder="yourpassword"
          name="password"
          value={formData.value}
          onChange={handleChange}
          className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black"
        />

        {/* Signup Button */}
        <button
          className="w-full bg-black text-white py-2 rounded-md font-semibold hover:bg-gray-900 mb-4"
           onClick={handleSubmit}
        >
          Sign Up
        </button>

        {/* Already have an account */}
        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;

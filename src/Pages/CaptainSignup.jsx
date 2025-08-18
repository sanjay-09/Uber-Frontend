import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const CaptainSignup = () => {

    const navigate=useNavigate();

    const [formData,setFormData]=useState({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        color:"",
        plate:"",
        capacity:"",
        vehicleType:""
    });

    const handleChange=(e)=>{
        const {name,value}=e.target;
        setFormData({
            ...formData,
            [name]:value
        });


    }

    const handleSubmit=async()=>{
        const final_data={
            fullName:{
                firstName:formData.firstName,
                lastName:formData.lastName
            },
            email:formData.email,
            password:formData.password,
            vehicle:{
                color:formData.color,
                plate:formData.plate,
                capacity:formData.capacity,
                vehicleType:formData.vehicleType
            }
        }
        console.log(final_data);
       try{
        const response=await axios.post(`${import.meta.env.VITE_UBER_BACKEND_URL}/api/v1/captain/create`,final_data);
        if(response.status==201){
            navigate("/captain-login");

        }

       }
       catch(err){
        console.log(err);

       }
    }


  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <div className="w-full max-w-md p-6">
        <h1 className="text-2xl font-bold mb-6">Captain Signup</h1>

        {/* First Name */}
        <label className="block text-sm font-medium mb-1">First Name</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="John"
          className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md"
        />

        {/* Last Name */}
        <label className="block text-sm font-medium mb-1">Last Name</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Doe"
          className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md"
        />

        {/* Email */}
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="captain@example.com"
          className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md"
        />

        {/* Password */}
        <label className="block text-sm font-medium mb-1">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Your password"
          className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md"
        />

        {/* Vehicle Color */}
        <label className="block text-sm font-medium mb-1">Vehicle Color</label>
        <input
          type="text"
          name="color"
          value={formData.color}
          onChange={handleChange}

          placeholder="Red"
          className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md"
        />

        {/* Vehicle Plate */}
        <label className="block text-sm font-medium mb-1">Vehicle Plate</label>
        <input
          type="text"
          name="plate"
          value={formData.plate}
          onChange={handleChange}
          placeholder="AB12CD3456"
          className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md"
        />

        {/* Vehicle Capacity */}
        <label className="block text-sm font-medium mb-1">Vehicle Capacity</label>
        <input
          type="number"
          name="capacity"
          value={formData.capacity}
          onChange={handleChange}
          placeholder="4"
          min="1"
          className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md"
        />

        {/* Vehicle Type */}
        <label className="block text-sm font-medium mb-1">Vehicle Type</label>
        <select
          name="vehicleType"
          value={formData.vehicleType}
          onChange={handleChange}
          className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md"
        >
          <option value="">Select Type</option>
          <option value="car">Car</option>
          <option value="motorcycle">Motorcycle</option>
          <option value="auto">Auto</option>
        </select>

        {/* Submit Button */}
        <button className="w-full bg-black text-white py-2 rounded-md font-semibold hover:bg-gray-900 mb-4"   onClick={handleSubmit}> 
          
          Sign Up
        </button>

        {/* Already have account */}
        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/captain-login" className="text-blue-600 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default CaptainSignup;

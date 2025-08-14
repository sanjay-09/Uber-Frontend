import { useState } from "react";
import { Link } from "react-router-dom";
const Captainlogin=()=>{
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [captainData,setCaptainData]=useState({});
    console.log("captainData",captainData);

    const handleSubmit=()=>{
      
        setCaptainData({
            email:email,
            password:password
        })
       
       
        setEmail("");
        setPassword("");
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
        value={email}
        onChange={(e)=>{setEmail(e.target.value)}}
          className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black"
        />

        {/* Password Input */}
        <label className="block text-sm font-medium mb-1">Enter Password</label>
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e)=>{setPassword(e.target.value)}}
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
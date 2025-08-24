import React, { useContext, useEffect, useState } from "react";
import { Loader2, MapPin, Navigation, KeyRound, Star } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { SocketContext } from "../Context/SocketProvider";
import DriverTrackingMap from "./DriverTrackingMap";

const LookingForDriver = ({ rideData, type, driverData ,pickup }) => {

  const [driverLocation, setDriverLocation]=useState(null);

  const {receiveMessage}=useContext(SocketContext);

  useEffect(()=>{
    if(type=="Waiting"){
      console.log("waitng");
       receiveMessage("driverLocation", (coords) => {
        console.log("cdata");
      setDriverLocation({ lat: coords.lat, lng: coords.lng });
    });
    }
    
  },[]);


  const deleteRide=async()=>{
    try{
      const res=await axios.delete(`${import.meta.env.VITE_UBER_BACKEND_URL}/api/v1/ride/delete`,{
        headers:{
          Authorization:`Bearer ${localStorage.getItem("token")}`
        },
        params:{
          rideId:rideData.id
        }
      })
      toast.success("Ride deleted succesfully");

    }
    catch(err){
      toast.error("not able to delete the ride");
      console.log(err);

    }
  }
  return (
    <div className="bg-white shadow-xl rounded-2xl p-6 max-w-md mx-auto sm:max-w-lg flex flex-col items-center text-center">
      {/* Loading Animation */}
      <div className="flex justify-center mb-4">
        <Loader2 className="animate-spin text-black" size={40} />
      </div>

      {/* Title */}
      <h2 className="text-xl font-bold text-black mb-2">
        {type} for a Driver...
      </h2>
      <p className="text-gray-500 mb-5 text-sm">
        Please wait while we find the best driver for you
      </p>

     {
      
      driverLocation &&   <DriverTrackingMap
      
        driverLocation={driverLocation} pickup={pickup}
      />
     }

      {/* Ride Details Card */}
      <div className="bg-gray-100 rounded-xl p-4 w-full mb-5">
        {/* Pickup */}
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-black text-white p-2 rounded-full">
            <MapPin size={18} />
          </div>
          <p className="text-gray-800 text-left">
            <span className="font-semibold text-black">Pickup:</span>{" "}
            {rideData.origin}
          </p>
        </div>

        {/* Destination */}
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-black text-white p-2 rounded-full">
            <Navigation size={18} />
          </div>
          <p className="text-gray-800 text-left">
            <span className="font-semibold text-black">Destination:</span>{" "}
            {rideData.destination}
          </p>
        </div>

        {/* Vehicle */}
        {rideData.vehicle && (
          <div className="flex items-center justify-between mt-3 bg-white p-3 rounded-xl shadow-sm">
            <div className="flex items-center gap-3">
              <img
                src={
                  rideData?.vehicleImage ||
                  "https://cdn-icons-png.flaticon.com/512/854/854894.png"
                }
                alt="Vehicle"
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div>
                <p className="text-gray-800 font-semibold">
                  {rideData.vehicle.name}
                </p>
                <p className="text-sm text-gray-500">{rideData.vehicle.time}</p>
              </div>
            </div>
            <span className="text-lg font-bold text-black">
              ₹{rideData.vehicle.price}
            </span>
          </div>
        )}
      </div>

      {/* Driver Details Section */}
      {driverData && (
        <div className="bg-white border border-gray-200 rounded-xl p-4 w-full mb-5 flex items-center gap-4 shadow-sm">
          <img
            src={driverData?.image}
            alt="Driver"
            className="w-16 h-16 rounded-full object-cover border border-gray-300"
          />
          <div className="text-left flex-1">
            <p className="text-lg font-bold text-black">{driverData.name}</p>
            <p className="text-sm text-gray-600">{driverData.car}</p>
            <p className="text-sm text-gray-600">{driverData.plate}</p>
            <div className="flex items-center text-yellow-500 text-sm mt-1">
              <Star size={14} className="mr-1" /> {driverData.rating}
            </div>
          </div>
        </div>
      )}

      {/* OTP Section */}
      {rideData.otp && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 w-full mb-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-500 text-white p-2 rounded-full">
              <KeyRound size={18} />
            </div>
            <div>
              <p className="text-gray-700 text-sm">Your OTP</p>
              <p className="text-xl font-bold text-blue-600">{rideData.otp}</p>
            </div>
          </div>
          <p className="text-xs text-gray-500">Share with driver</p>
        </div>
      )}

      {/* Cancel Button */}
      <button className="bg-red-500 text-white w-full py-3 rounded-xl font-semibold hover:bg-red-600 transition" onClick={deleteRide}>
        Cancel Ride
      </button>
    </div>
  );
};

export default LookingForDriver;

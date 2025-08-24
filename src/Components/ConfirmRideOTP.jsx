import React, { useState } from "react";
import { CheckCircle, Loader2 } from "lucide-react";
import { useCaptain } from "../Context/CaptainProvider";
import axios from "axios";
import toast from "react-hot-toast";

const ConfirmRideOTP = ({ ride, onConfirm }) => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const {captainData}=useCaptain();  
  console.log(captainData);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      // Call API to confirm OTP
      const res=await axios.get(`${import.meta.env.VITE_UBER_BACKEND_URL}/api/v1/ride/verify-otp`,{
        headers:{
          Authorization:`Bearer ${localStorage.getItem("token")}`
        },
        params:{
          rideId:ride.id,
          otp:otp
        }
       
      })
      console.log(res);
       onConfirm();
    } catch (err) {
      toast.error(err.response.data?.err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-xl rounded-2xl p-6 mt-6 text-center">
      {!success ? (
        <>
          <h2 className="text-xl font-bold mb-2">Confirm Your Ride</h2>
          <p className="text-gray-500 mb-4">Enter the OTP shared with the driver to start your ride</p>

          <div className="mb-4">
            <h3 className="text-lg font-semibold">{captainData.fullName.firstName+captainData.fullName.lastName}</h3>
            <p className="text-gray-600">{captainData.vehicle.vehicleType} • {captainData.vehicle.color} • {captainData.vehicle.plate}</p>
            <p className="text-gray-800 font-bold mt-2">Fare: ₹{ride.Fare}</p>
          </div>

          <div className="flex justify-center gap-2 mb-4">
            {[...Array(6)].map((_, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={otp[index] || ""}
                onChange={(e) => {
                  const newOtp = otp.split("");
                  newOtp[index] = e.target.value;
                  setOtp(newOtp.join(""));
                }}
                className="w-12 h-12 border-2 border-gray-300 text-center text-xl rounded-lg focus:border-blue-500 outline-none"
              />
            ))}
          </div>

          <button
            disabled={otp.length !== 6 || loading}
            onClick={handleConfirm}
            className={`w-full py-3 text-white rounded-lg font-semibold transition ${
              otp.length === 6 && !loading ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400"
            }`}
          >
            {loading ? <Loader2 className="animate-spin inline-block" /> : "Confirm Ride"}
          </button>
        </>
      ) : (
        <div className="flex flex-col items-center">
          <CheckCircle className="text-green-500 w-16 h-16 mb-4" />
          <h3 className="text-xl font-bold">Ride Confirmed!</h3>
          <p className="text-gray-500">Your ride is now active.</p>
        </div>
      )}
    </div>
  );
};

export default ConfirmRideOTP;

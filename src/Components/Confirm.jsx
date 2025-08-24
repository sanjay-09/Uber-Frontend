import React from "react";
import { MapPin, Navigation } from "lucide-react";

const Confirm = ({ confirmationData,onConfirm }) => {
  return (
    <div className="bg-white shadow-xl rounded-2xl p-5 max-w-md mx-auto sm:max-w-lg">
      {/* Header */}
      <h2 className="text-xl font-bold mb-5 text-black">Confirm Your Ride</h2>

      {/* Ride Details */}
      <div className="bg-gray-100 rounded-xl p-4 mb-5">
        {/* Pickup */}
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-black text-white p-2 rounded-full">
            <MapPin size={18} />
          </div>
          <p className="text-gray-800">
            <span className="font-semibold text-black">Pickup:</span>{" "}
            {confirmationData.origin}
          </p>
        </div>

        {/* Destination */}
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-black text-white p-2 rounded-full">
            <Navigation size={18} />
          </div>
          <p className="text-gray-800">
            <span className="font-semibold text-black">Destination:</span>{" "}
            {confirmationData.destination}
          </p>
        </div>

        {/* Vehicle (Optional) */}
        {confirmationData.vehicle && (
          <div className="flex items-center gap-3 mt-3">
            <img
              src={
                confirmationData.vehicleImage ||
                "https://cdn-icons-png.flaticon.com/512/854/854894.png"
              }
              alt="Vehicle"
              className="w-10 h-10 rounded-lg object-cover"
            />
            <p className="text-gray-800 font-semibold">
              {confirmationData.vehicle.name}
            </p>
          </div>
        )}
      </div>

      {/* Fare */}
      <div className="flex justify-between items-center mb-5">
        <p className="text-lg font-semibold text-gray-700">Estimated Fare</p>
        <span className="bg-black text-white px-4 py-2 rounded-xl font-bold text-lg">
          ₹{confirmationData.fare}
        </span>
      </div>

      {/* Confirm Button */}
      <button className="bg-black text-white w-full py-4 rounded-xl font-semibold hover:bg-gray-900 transition" onClick={onConfirm}>
        Confirm Ride
      </button>
    </div>
  );
};

export default Confirm;

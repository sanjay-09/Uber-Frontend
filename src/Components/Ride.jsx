import React from "react";

const Ride = ({ driver, pickup, destination, fare }) => {
  return (
    <div className="w-[350px] mx-auto bg-white shadow-lg rounded-2xl p-5 flex flex-col gap-4">
      {/* Header */}
      <div className="flex justify-center items-center gap-2">
        <div className="animate-spin border-4 border-gray-300 border-t-red-500 rounded-full w-6 h-6"></div>
        <h2 className="text-lg font-semibold text-gray-800">
          Your ride is on the way
        </h2>
      </div>
      <p className="text-sm text-gray-500 text-center">
        Driver is heading towards your pickup point
      </p>

      {/* Driver Info */}
      <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl shadow-sm">
        <img
          src={driver.image}
          alt="Driver"
          className="w-14 h-14 rounded-full object-cover border-2 border-gray-200"
        />
        <div className="flex flex-col">
          <h3 className="text-base font-bold">{driver.name}</h3>
          <p className="text-sm text-gray-600">{driver.car} • {driver.plate}</p>
          <p className="text-xs text-green-500 font-medium">⭐ {driver.rating}</p>
        </div>
      </div>

      {/* Pickup & Destination */}
      <div className="flex flex-col gap-3">
        <div className="flex gap-2">
          <span className="text-xl text-gray-700">📍</span>
          <p className="text-sm text-gray-700">{pickup}</p>
        </div>
        <div className="flex gap-2">
          <span className="text-xl text-gray-700">🏁</span>
          <p className="text-sm text-gray-700">{destination}</p>
        </div>
      </div>

      {/* Fare & ETA */}
      <div className="flex justify-between items-center bg-gray-100 rounded-lg p-3">
        <div>
          <p className="text-sm text-gray-600">Fare</p>
          <p className="text-lg font-bold text-gray-800">₹{fare}</p>
        </div>
      </div>

      {/* Cancel Button */}
      <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-xl shadow-md transition-all">
        Cancel Ride
      </button>
    </div>
  );
};

export default Ride;

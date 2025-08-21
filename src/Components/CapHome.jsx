import React from "react";

export default function CapHome({ onRequestRide }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 text-center">
      <h2 className="text-xl font-bold mb-4">Captain Dashboard</h2>
      <p className="text-gray-500 mb-2">₹295.20 Earned</p>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <p className="font-bold">10.2</p>
          <p className="text-sm text-gray-500">Hours Online</p>
        </div>
        <div>
          <p className="font-bold">10.2</p>
          <p className="text-sm text-gray-500">Hours Online</p>
        </div>
        <div>
          <p className="font-bold">10.2</p>
          <p className="text-sm text-gray-500">Hours Online</p>
        </div>
      </div>
      <button
        onClick={onRequestRide}
        className="bg-black text-white rounded-xl px-4 py-2"
      >
        New Ride Request
      </button>
    </div>
  );
}



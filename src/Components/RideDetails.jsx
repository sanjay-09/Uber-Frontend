import React from "react";

export default function RideDetails({ onAccept, onReject,ride }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4">
      <h3 className="text-lg font-bold mb-2">Ride Request</h3>
      <p className="text-gray-500">Pickup: {ride.PickUp}</p>
      <p className="text-gray-500">Destination: {ride.Destination}</p>
      <p className="text-gray-500 mb-4">Fare: {ride.Fare}</p>
      <div className="flex justify-around">
        <button
          onClick={onReject}
          className="bg-red-500 text-white rounded-xl px-4 py-2"
        >
          Reject
        </button>
        <button
          onClick={onAccept}
          className="bg-green-500 text-white rounded-xl px-4 py-2"
        >
          Accept
        </button>
      </div>
    </div>
  );
}

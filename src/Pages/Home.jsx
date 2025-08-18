import React, { useState } from "react";

const suggestions = [
  "24B, Near Kapoor's cafe, Sheryians Coding School, Bhopal",
  "22C, Near Malhotra's cafe, Sheryians Coding School, Bhopal",
  "20B, Near Singhai's cafe, Sheryians Coding School, Bhopal",
  "18A, Near Sharma's cafe, Sheryians Coding School, Bhopal",
];

export default function Home() {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [activeField, setActiveField] = useState(null);

  const handleSelect = (value) => {
    if (activeField === "pickup") setPickup(value);
    if (activeField === "destination") setDestination(value);
    setActiveField(null);
  };

  return (
    <div className="w-full h-screen flex flex-col">
      {/* Map Section */}
      <div
        className={`transition-all duration-300 w-full ${
          activeField ? "h-[30%]" : "h-[70%]"
        }`}
      >
        <img
          src="https://t3.ftcdn.net/jpg/07/28/30/26/360_F_728302620_Xddnf5Cl0K1ACZurd6yByUzHiHMMIoe6.jpg"
          alt="Map"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Bottom White Sheet */}
      <div
        className={`transition-all duration-300 bg-white rounded-t-2xl shadow-md flex flex-col ${
          activeField ? "h-[70%]" : "h-[30%]"
        }`}
      >
        {/* Find a Trip Section */}
        <div className="p-4 flex flex-col flex-1">
          <h2 className="font-bold mb-3 text-lg">Find a trip</h2>

          <input
            type="text"
            placeholder="Add a pick-up location"
            value={pickup}
            onClick={() => setActiveField("pickup")}
            onChange={(e) => setPickup(e.target.value)}
            className="w-full p-2 border rounded-lg mb-2"
          />

          <input
            type="text"
            placeholder="Enter your destination"
            value={destination}
            onClick={() => setActiveField("destination")}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full p-2 border rounded-lg mb-2"
          />

          {/* Suggestions */}
          {activeField && (
            <div className="flex-1 overflow-y-auto border rounded-lg shadow-md bg-white">
              {suggestions.map((address, index) => (
                <div
                  key={index}
                  onClick={() => handleSelect(address)}
                  className="p-2 hover:bg-gray-100 cursor-pointer flex items-center"
                >
                  <span className="mr-2">📍</span>
                  <span>{address}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Book Button Section */}
        <div className="p-4 border-t flex items-center justify-center">
          <button
            disabled={!pickup || !destination}
            className={`w-full py-3 rounded-xl text-lg font-semibold 
              ${pickup && destination ? "bg-black text-white" : "bg-gray-300 text-gray-600 cursor-not-allowed"}`}
          >
            Book
          </button>
        </div>
      </div>
    </div>
  );
}

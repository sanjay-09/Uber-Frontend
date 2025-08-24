import React from "react";
import { Car, Bike, Bus } from "lucide-react"; // for vehicle icons

const FareBar = ({ onChoose, vehicles }) => {
  const getVehicleIcon = (name) => {
    if (name.toLowerCase().includes("go")) return <Car size={22} />;
    if (name.toLowerCase().includes("moto")) return <Bike size={22} />;
    if (name.toLowerCase().includes("auto")) return <Bus size={22} />;
    return <Car size={22} />;
  };

  return (
    <div className="bg-white shadow-xl rounded-2xl p-4 max-w-md mx-auto sm:max-w-lg">
      <h2 className="text-xl font-bold mb-4 text-black">Choose a Vehicle</h2>

      <div className="space-y-3">
        {vehicles.map((vehicle, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-gray-100 border border-gray-300 rounded-xl p-4 hover:bg-black hover:text-white transition cursor-pointer"
            onClick={() => {
              onChoose(vehicle);
            }}
          >
            {/* Left: Icon + Details */}
            <div className="flex items-center gap-3">
              <div className="bg-black text-white p-2 rounded-full">
                {getVehicleIcon(vehicle.name)}
              </div>
              <div>
                <p className="font-semibold">{vehicle.name}</p>
                <p className="text-sm text-gray-500 group-hover:text-gray-300">
                  {vehicle.time}
                </p>
              </div>
            </div>

            {/* Right: Price */}
            <p className="font-bold text-lg">{vehicle.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FareBar;

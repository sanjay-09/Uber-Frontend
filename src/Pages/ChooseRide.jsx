import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";

export default function ChooseRide() {
  const location = useLocation();
  const { pickup, destination } = location.state || {};
  const [rides, setRides] = useState([]);
  const [selectedRide,setSelectedRide]=useState("");

  const [chooseRidePanel, setChooseRidePanel] = useState(true);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);

  const chooseRideRef = useRef(null);
  const confirmRideRef = useRef(null);

  useEffect(() => {
    fetchRides();
  }, []);

  const fetchRides = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_UBER_BACKEND_URL}/api/v1/ride/getFare`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          params: {
            origin: pickup,
            destination: destination,
          },
        }
      );

      const ridesData = res.data.data;
      const ridesUpdated = [
        { name: "UberGo", seats: 4, eta: "2 mins away", price: ridesData.car },
        { name: "Moto", seats: 1, eta: "3 mins away", price: ridesData.motorcycle },
        { name: "UberAuto", seats: 3, eta: "3 mins away", price: ridesData.auto },
      ];

      setRides(ridesUpdated);
    } catch (err) {
      console.log(err);
    }
  };

  // GSAP animations
  useEffect(() => {
    if (chooseRidePanel) {
      gsap.to(chooseRideRef.current, { y: 0, duration: 0.4 });
    } else {
      gsap.to(chooseRideRef.current, { y: "100%", duration: 0.4 });
    }
  }, [chooseRidePanel]);

  useEffect(() => {
    if (confirmRidePanel) {
      gsap.to(confirmRideRef.current, { y: 0, duration: 0.4 });
    } else {
      gsap.to(confirmRideRef.current, { y: "100%", duration: 0.4 });
    }
  }, [confirmRidePanel]);

  const handleSelectRide = (ride) => {
    console.log("Selected Ride:", ride);
    setChooseRidePanel(false);
    setConfirmRidePanel(true);
  };

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Fullscreen Map */}
      <div className="absolute top-0 left-0 right-0 bottom-0 z-0">
        <img
          src="https://t3.ftcdn.net/jpg/07/28/30/26/360_F_728302620_Xddnf5Cl0K1ACZurd6yByUzHiHMMIoe6.jpg"
          alt="Map"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Choose Ride Panel */}
      <div
        ref={chooseRideRef}
        className="fixed bottom-0 left-0 right-0 z-10 bg-white rounded-t-2xl shadow-lg p-4 translate-y-full"
      >
        <h2 className="text-lg font-semibold mb-3">Choose a Vehicle</h2>
        {rides.map((ride, i) => (
          <div
            key={i}
            onClick={() => handleSelectRide(ride)}
            className="flex justify-between items-center border p-3 mb-2 rounded-lg cursor-pointer hover:bg-gray-100"
          >
            <div>
              <p className="font-medium">{ride.name}</p>
              <p className="text-sm text-gray-600">{ride.eta}</p>
            </div>
            <p className="font-semibold">₹{ride.price}</p>
          </div>
        ))}
      </div>

      {/* Confirm Ride Panel */}
      <div
        ref={confirmRideRef}
        className="fixed bottom-0 left-0 right-0 z-10 bg-white rounded-t-2xl shadow-lg p-4 translate-y-full"
      >
        <h2 className="text-lg font-semibold mb-3">Confirm Your Ride</h2>
        <p className="text-gray-600">Pickup: {pickup}</p>
        <p className="text-gray-600 mb-4">Destination: {destination}</p>
        <button className="w-full bg-black text-white py-3 rounded-lg">
          Confirm Ride
        </button>
      </div>
    </div>
  );
}

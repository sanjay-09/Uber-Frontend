import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function OnGoingRide({ onComplete }) {
  const rideRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      rideRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
    );
  }, []);

  return (
    <div ref={rideRef} className="bg-white rounded-2xl shadow-md p-4">
      <h3 className="text-lg font-bold mb-2">On Going Ride</h3>
      <p className="text-gray-500">Estimated Time: 9 mins</p>
      <p className="text-gray-500 mb-4">Destination: Market Street</p>
      <button
        onClick={onComplete}
        className="bg-blue-500 text-white rounded-xl px-4 py-2"
      >
        Complete Ride
      </button>
    </div>
  );
}

import React, { useContext, useEffect, useState } from "react";
import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";
import { SocketContext } from "../Context/SocketProvider";
import axios from "axios";

const DriverRideScreen = ({ ride, captainData, pickup,onReached }) => {
  const [captainLocation, setCaptainLocation] = useState(null);
  const { sendMessage } = useContext(SocketContext);

  console.log("ride",ride);

  const mapContainerStyle = {
    width: "100%",
    height: "350px",
    borderRadius: "12px",
  };

  const center = pickup;

  // ✅ Send captain's live location every 10s
  useEffect(() => {
    if (navigator.geolocation && ride.id) {
      const sendLiveLocation = () => {
        navigator.geolocation.getCurrentPosition((position) => {
          const loc = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCaptainLocation(loc);

          sendMessage("captain_moving_location", {
            captainId: captainData._id,
            location: loc,
            rideId: ride.id,
          });
        });
      };

      sendLiveLocation();
      const interval = setInterval(sendLiveLocation, 10000);

      return () => clearInterval(interval);
    }
  }, [ride.id, captainData]);

  // ✅ Handle Reached Button
  

  return (
    <div style={{ padding: "16px" }}>
      <h2 style={{ fontSize: "20px", fontWeight: "600", textAlign: "center", marginBottom: "8px" }}>
        Heading to Rider...
      </h2>
      <p style={{ textAlign: "center", color: "#666", marginBottom: "16px" }}>
        Track your route and update status
      </p>

      <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={captainLocation || center}
          zoom={14}
        >
          {/* Rider Pickup Marker */}
          <Marker position={center} label="Pickup" />

          {/* Captain Live Location Marker */}
          {captainLocation && <Marker position={captainLocation} label="You" />}
        </GoogleMap>
      </LoadScript>

      <div
        style={{
          marginTop: "16px",
          backgroundColor: "#fff",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          padding: "12px",
          borderRadius: "12px",
        }}
      >
        <p>
          <strong>Pickup:</strong> {ride?.PickUp}
        </p>
        <p>
          <strong>Destination:</strong> {ride?.Destination}
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "16px",
          }}
        >
          <p style={{ fontWeight: "500", fontSize: "18px" }}>UberGo</p>
          <button
            onClick={onReached}
            style={{
              backgroundColor: "#16a34a",
              color: "#fff",
              padding: "10px 16px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Reached Pickup
          </button>
        </div>
      </div>
    </div>
  );
};

export default DriverRideScreen;

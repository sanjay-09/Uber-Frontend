import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useEffect, useState, useContext } from "react";
import { SocketContext } from "../Context/SocketProvider";

const DriverTrackingMap = ({driverLocation,pickup }) => {
  const containerStyle = {
    width: "100%",
    height: "300px"
  };

  console.log("pickup",pickup);

  const center = driverLocation;


  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={14}
      >
        {/* Pickup Marker */}
        <Marker position={pickup} icon="http://maps.google.com/mapfiles/ms/icons/green-dot.png" />
        
        {/* Driver Marker */}
        {driverLocation && (
          <Marker
            position={driverLocation}

            icon="http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
          />
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default DriverTrackingMap;

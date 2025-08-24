import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useEffect, useState } from 'react';

const Map = () => {
  const [currentPosition, setCurrentPosition] = useState(null);

  const containerStyle = {
    width: '100%',
    height: '400px'
  };

  const center = currentPosition || { lat: 28.6139, lng: 77.209 }; // Default to Delhi

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => console.error(error),
        { enableHighAccuracy: true }
      );
    }
  }, []);

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
        {currentPosition && <Marker position={currentPosition} />}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;

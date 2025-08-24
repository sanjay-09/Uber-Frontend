import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { MapPin, Navigation, X, Loader2 } from "lucide-react";
import axios from "axios";

const TripFinderWithMap = ({ request }) => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [activeField, setActiveField] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(null);

  // Fetch user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setCurrentPosition({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
        },
        (error) => console.error(error),
        { enableHighAccuracy: true }
      );
    }
  }, []);

  // Handle suggestions
  useEffect(() => {
    if (!activeField) return;

    const query = activeField === "pickup" ? pickup : destination;
    if (!query) {
      setSuggestions([]); // clear if input empty
      return;
    }

    const handler = setTimeout(() => {
      fetchData(query);
    }, 400);

    return () => clearTimeout(handler);
  }, [pickup, destination, activeField]);

  const fetchData = async (query) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_UBER_BACKEND_URL}/api/v1/getSuggestions`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          params: { input: query },
        }
      );
      setSuggestions(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    if (activeField === "pickup") {
      setPickup(suggestion);
    } else {
      setDestination(suggestion);
    }
    setActiveField(null);
    setSuggestions([]);
  };

  const clearInput = (field) => {
    if (field === "pickup") setPickup("");
    else setDestination("");
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Trip Finder Section */}
      <div className="bg-white/90 backdrop-blur-lg shadow-lg rounded-3xl p-5 max-w-lg mx-auto mt-6 border border-gray-200 w-[90%]">
        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <img
            src="https://cdn-icons-png.flaticon.com/512/854/854894.png"
            alt="Car Icon"
            className="w-8 h-8"
          />
          <h2 className="text-xl font-bold text-gray-800">Book Your Ride</h2>
        </div>

        {/* Pickup Input */}
        <div className="relative mb-4">
          <div className="flex items-center gap-2 border rounded-xl p-3 bg-gray-50 focus-within:ring-2 focus-within:ring-black">
            <MapPin className="text-gray-500" size={20} />
            <input
              type="text"
              placeholder="Add a pick-up location"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              onClick={() => setActiveField("pickup")}
              className="w-full bg-transparent focus:outline-none"
            />
            {pickup && (
              <X
                size={18}
                className="text-gray-400 cursor-pointer hover:text-gray-600"
                onClick={() => clearInput("pickup")}
              />
            )}
          </div>
          {activeField === "pickup" && (
            <SuggestionList
              loading={loading}
              suggestions={suggestions}
              onClick={handleSuggestionClick}
            />
          )}
        </div>

        {/* Destination Input */}
        <div className="relative mb-6">
          <div className="flex items-center gap-2 border rounded-xl p-3 bg-gray-50 focus-within:ring-2 focus-within:ring-black">
            <Navigation className="text-gray-500" size={20} />
            <input
              type="text"
              placeholder="Enter your destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              onClick={() => setActiveField("destination")}
              className="w-full bg-transparent focus:outline-none"
            />
            {destination && (
              <X
                size={18}
                className="text-gray-400 cursor-pointer hover:text-gray-600"
                onClick={() => clearInput("destination")}
              />
            )}
          </div>
          {activeField === "destination" && (
            <SuggestionList
              loading={loading}
              suggestions={suggestions}
              onClick={handleSuggestionClick}
            />
          )}
        </div>

        {/* Search Button */}
        <button
          onClick={() => request(pickup, destination)}
          disabled={!pickup || !destination}
          className={`w-full py-3 rounded-xl font-semibold text-white transition ${
            !pickup || !destination
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-black hover:bg-gray-800"
          }`}
        >
          Search Rides
        </button>
      </div>

      {/* Map Section */}
      <div className="flex-1 mt-4">
        <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "100%" }}
            center={currentPosition || { lat: 28.6139, lng: 77.209 }}
            zoom={15}
          >
            {currentPosition && <Marker position={currentPosition} />}
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
};

const SuggestionList = ({ loading, suggestions, onClick }) => {
  if (loading) {
    return (
      <div className="absolute bg-white border rounded-xl w-full mt-1 shadow-lg z-10 p-3 flex items-center gap-2 text-gray-500 text-sm">
        <Loader2 className="animate-spin" size={16} /> Fetching suggestions...
      </div>
    );
  }

  if (suggestions.length === 0) return null;

  return (
    <ul className="absolute bg-white border rounded-xl w-full mt-1 shadow-lg z-10 max-h-60 overflow-y-auto">
      {suggestions.map((item, index) => (
        <li
          key={index}
          onClick={() => onClick(item.description)}
          className="flex items-center gap-3 p-3 hover:bg-gray-100 cursor-pointer transition"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/684/684908.png"
            alt="Location"
            className="w-5 h-5"
          />
          <span className="text-gray-700">{item.description}</span>
        </li>
      ))}
    </ul>
  );
};

export default TripFinderWithMap;

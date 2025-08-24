import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../Context/SocketProvider";
import { useUser } from "../Context/UserProvider";


export default function Home() {
    console.log("home");
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [activeField, setActiveField] = useState(null);
  const [suggestions,setSuggestions]=useState([]);
  const navigate=useNavigate();
  const {sendMessage}=useContext(SocketContext);
  const {user}=useUser();

  useEffect(()=>{
   if(user){
      sendMessage("join",{
        userId:user._id,
        userType:"user"

      }); 

   }


  },[user]);


  useEffect(()=>{
    if(!activeField){
        return;
    }
    const query=activeField=='pickup'? pickup:destination;

    if(!query){
        return;
    }

    const handler=setTimeout(()=>{
        fetchData(query)

    },500);

    return ()=>{
        clearTimeout(handler);
    }

  },[pickup,destination,activeField])

  const fetchData=async(query)=>{
    try{
        console
        const res=await axios.get(`${import.meta.env.VITE_UBER_BACKEND_URL}/api/v1/getSuggestions`,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
            },
            params:{
                input:query
            }
        })
        setSuggestions(res.data.data);

    }
    catch(err){

    }
  }



  const handleSelect = (value) => {
    if (activeField === "pickup") setPickup(value);
    if (activeField === "destination") setDestination(value);
    setActiveField(null);
  };

    const handleFindTrip = () => {
    if (pickup && destination) {
      navigate("/choose-ride", {
        state: { pickup, destination },
      });
    }
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

          {
            pickup && destination &&  <div className="">
          <button
  className="w-full py-3 rounded-xl text-lg font-semibold bg-black text-white hover:bg-gray-800 transition-all duration-300 shadow-md"
 onClick={handleFindTrip}>
  🚖 Find a Trip
</button>
        </div>
          }

          {/* Suggestions */}
          {activeField && suggestions.length>0 && (
            <div className="flex-1 overflow-y-auto border rounded-lg shadow-md bg-white">
              {suggestions.map((address, index) => (
                <div
                  key={index}
                  onClick={() => handleSelect(address.description)}
                  className="p-2 hover:bg-gray-100 cursor-pointer flex items-center"
                >
                  <span className="mr-2">📍</span>
                  <span>{address.description}</span>
                </div>
              ))}
            </div>
          )}
        </div>

       
       
      </div>
    </div>
  );
}
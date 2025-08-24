import { act, useContext, useEffect, useRef, useState } from "react";
import TripFinder from "../Components/TripFinder";
import FareBar from "../Components/FareBar";
import Search from "../Components/Search";
import axios from "axios";
import Confirm from "../Components/Confirm";
import LookingForDriver from "../Components/LookingForDriver";
import { useUser } from "../Context/UserProvider";
import { SocketContext } from "../Context/SocketProvider";
import Ride from "../Components/Ride";
import { Coffee } from "lucide-react";
import Map from "../Components/Map";


const NewHome = () => {
  const [activePanel, setActivePanel] = useState("home");
  const [vehicles, setVehicles] = useState(null);
  const [confirmationData, setConfirmationData] = useState(null);
  const [driver,setDriver]=useState(null);
  const [pickUpCoordinates,setPickUpCoornidates]=useState(null);
  const panel = useRef();
  console.log("data",confirmationData);

  const {user}=useUser();
  const {sendMessage,receiveMessage}=useContext(SocketContext)

  const tripHandler = async (origin, destination) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_UBER_BACKEND_URL}/api/v1/ride/getFare`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          params: {
            origin: origin,
            destination: destination,
          },
        }
      );
      const obj = res.data.data;
      const vehicles_data = [
        { name: "UberGo", type:"car" ,time: "2 mins away", price: obj.car },
        { name: "Moto", type:"motorcycle" ,time: "3 mins away", price: obj.motorcycle },
        { name: "UberAuto", type:"auto", time: "3 mins away", price: obj.auto },
      ];
      setVehicles(vehicles_data);
      setActivePanel("FareBar");
      setConfirmationData({
        ...confirmationData,
        origin,
        destination
      });
    } catch (err) {
      console.log(err);
    }
  };

  const ConfirmProps=(vehicle)=>{
    console.log(vehicle)
    setConfirmationData({
        ...confirmationData,
        fare:vehicle.price,
        vehicle:vehicle
    });
    setActivePanel("confirm")

  }

 
   useEffect(()=>{
    if(user){
        console.log("user",user);
       sendMessage("join",{
         userId:user._id,
         userType:"user"
 
       }); 

       receiveMessage("rideAccepted",(captain)=>{
        setActivePanel("waiting");
        const driverData={
            name:captain.cp_first_name+captain.cp_last_name,
            car:captain.vehicle.vehicleType,
            plate:captain.vehicle.plate,
            rating:4.8,
            image:"https://via.placeholder.com/150"
        }
        setDriver(driverData)
       })

       receiveMessage("rideStarted",()=>{
        setActivePanel("ongoing")
       })
       receiveMessage("rideCompleted",()=>{
        setActivePanel("home")
       })
 
    }
 
 
   },[user]);

   const confirmRide=async()=>{
    try{

      const token = localStorage.getItem("token");

  const [rideResponse, locationResponse] = await Promise.all([
    axios.post(`${import.meta.env.VITE_UBER_BACKEND_URL}/api/v1/ride/create`, {
      origin: confirmationData.origin,
      destination: confirmationData.destination,
      vehicleType: confirmationData.vehicle.type
    }, {
      headers: { Authorization: `Bearer ${token}` }
    }),

    axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
      params: {
        address: confirmationData.origin,
        key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
      }
    })
  ]);

  // ✅ Ride Response
  const rideData = rideResponse.data.data;
  console.log("Ride Created:", rideData);

  setConfirmationData({
    ...confirmationData,
    id: rideData._id,
    otp: rideData.otp
  });

  // ✅ Location Response
  const coordinates = locationResponse.data.results[0].geometry.location;
  console.log("Coordinates:", coordinates);
  setPickUpCoornidates(coordinates);
  setActivePanel("looking");
        
    }
    catch(err){
        console.log(err);

    }
   
   }

 

  return (
    <div>
      <div ref={panel}>
        {activePanel == "home" && (
          <>
          <TripFinder request={tripHandler}/>
          
          </>
        ) }
        {activePanel == "FareBar" && (
          <FareBar
           onChoose={ConfirmProps}
            vehicles={vehicles}
          />
        )}
        {activePanel == "confirm" && <Confirm confirmationData={confirmationData} onConfirm={confirmRide}/>}

        {activePanel =="looking" && <LookingForDriver rideData={confirmationData} driverData={driver} type="Looking" pickup={pickUpCoordinates}/>}
          {activePanel =="waiting" && <LookingForDriver rideData={confirmationData} driverData={driver} type="Waiting" pickup={pickUpCoordinates}/> }

        {
            activePanel=="ongoing" && <Ride driver={driver}
  pickup={confirmationData.origin}
  destination={confirmationData.destination}
  fare={confirmationData.fare}
  />
        }

     
        
      </div>
    </div>
  );
};
export default NewHome;

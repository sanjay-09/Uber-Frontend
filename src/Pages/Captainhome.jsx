import React, { useState, useEffect, useRef, useContext, act } from "react";
import gsap from "gsap";
import CaptainHome from "../Components/CapHome";
import RideDetails from "../Components/RideDetails";
import OnGoingRide from "../Components/OnGoingRide";
import { useCaptain } from "../Context/CaptainProvider";
import { SocketContext } from "../Context/SocketProvider";
import axios from "axios";
import ConfirmRideOTP from "../Components/ConfirmRideOTP";
import DriverRideScreen from "../Components/DriverRideScreen";

export default function Captainhome() {
  const [activePanel, setActivePanel] = useState("home"); // home | ride | ongoing
  const [pickUpCoordinates,setPickUpCoornidates]=useState(null);
  const [ride, setRide] = useState(null);
  const panelRef = useRef(null);


  const activePanelRef=useRef(activePanel);
  const ridePanelRef=useRef(ride);

  const { captainData } = useCaptain();
  const { sendMessage, receiveMessage } = useContext(SocketContext);


  useEffect(()=>{
    activePanelRef.current=activePanel;

  },[activePanel]);

  useEffect(()=>{
    ridePanelRef.current=ride;
  },[ride])

  useEffect(() => {
    receiveMessage("ride-notifications", (ride) => {
      console.log(ride);

      const ride_object = {
        id:ride._id,
        PickUp: ride.origin,
        Destination: ride.destination,
        Fare: ride.fare,
        user: {
          firstName: ride.userId.fullName.firstName,
          lastName: ride.userId.fullName.lastName,
        },
      };

      setRide(ride_object);
      setActivePanel("ride");
    });
    receiveMessage("ride-notifications-2",(incoming)=>{
      console.log("active",activePanelRef.current);
       console.log("active",ridePanelRef.current.id);
   
      if(activePanelRef.current=="ride" && ridePanelRef.current?.id==incoming._id){
        console.log("why not going to the home");
        setActivePanel("home");

      }
    })

    

    
  }, []);

useEffect(() => {
  if (captainData) {
    sendMessage("join", {
      userId: captainData._id,
      userType: "captain",
    });

    if (navigator.geolocation) {
      const liveLocation = () => {
        console.log("live location called");
        navigator.geolocation.getCurrentPosition(
          (position) => {
            sendMessage("captain_live_location", {
              captainId: captainData._id,
              location: {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              },
            });
          },
          (err) => {
            console.error("Geo Error:", err);
          }
        );
      };

      liveLocation(); // Send immediately
      const locationInterval = setInterval(liveLocation, 10000);

      return () => clearInterval(locationInterval); // ✅ Cleanup
    }
  }
}, [captainData]); // ✅ Runs only when ride.id becomes available

  useEffect(() => {
    if (panelRef.current) {
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }
      );
    }
  }, [activePanel]);

  const confirmRide= async()=>{
    try{
        
         const [resRideConfirmData,locationResponse]=await Promise.all([axios.post(`${import.meta.env.VITE_UBER_BACKEND_URL}/api/v1/ride/confirm`,{},{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`
            },
            params:{
                rideId:ride.id
            }}),
            axios.get(`https://maps.googleapis.com/maps/api/geocode/json`,{
              params:{
                address:ride.PickUp,
                key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY

              }
            })
          ]);

            const coordinates = locationResponse.data.results[0].geometry.location;
            setPickUpCoornidates(coordinates);


            
        
        setActivePanel('riding');

        

    }
    catch(err){}
 

  }

  const completeRide=async()=>{
    try{
        
        await axios.post(`${import.meta.env.VITE_UBER_BACKEND_URL}/api/v1/ride/complete`,{},{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`
            },
            params:{
                 rideId:ride.id

            }
        });
        setActivePanel("home");

    }
    catch(err){
        console.log(err);
    }
  }


  return (
    <div className="p-4">
      <div ref={panelRef}>
        {activePanel === "home" && (
          <CaptainHome onRequestRide={() => setActivePanel("ride")} />
        )}
        {activePanel === "ride" && (
          <RideDetails
            onAccept={confirmRide}
            onReject={() => setActivePanel("home")}
            ride={ride}
          />
        )}
        {activePanel === "ongoing" && (
          <OnGoingRide onComplete={completeRide} />
        )}
        {
            activePanel==="OTP" && <ConfirmRideOTP ride={ride} onConfirm={()=>setActivePanel("ongoing")}/>
        }
        {
          activePanel=='riding' && <DriverRideScreen ride={ride} captainData={captainData} pickup={pickUpCoordinates} onReached={()=>{setActivePanel("OTP")}} />
        }
      </div>
    </div>
  );
}

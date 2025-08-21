import React, { useState, useEffect, useRef, useContext } from "react";
import gsap from "gsap";
import CaptainHome from "../Components/CapHome";
import RideDetails from "../Components/RideDetails";
import OnGoingRide from "../Components/OnGoingRide";
import { useCaptain } from "../Context/CaptainProvider";
import { SocketContext } from "../Context/SocketProvider";


export default function Captainhome() {
  const [activePanel, setActivePanel] = useState("home"); // home | ride | ongoing
  const panelRef = useRef(null);



    const {captainData}=useCaptain();
    const {sendMessage,receiveMessage}=useContext(SocketContext);

    useEffect(()=>{

        receiveMessage("ride-notifications",(ride)=>{
            console.log(ride);
            setActivePanel("ride");
        })

        
        if(captainData){
            sendMessage("join",{
                userId:captainData._id,
                userType:'captain'
            })

        

            if(navigator.geolocation){
                console.log("navigator");
                
               const liveLocation=()=>{
                console.log("live location called");
                 navigator.geolocation.getCurrentPosition((position)=>{
                                console.log("Lat:", position.coords.latitude, "Lng:", position.coords.longitude);
                    sendMessage("captain_live_location",{
                        captainId:captainData._id,
                        location:{
                            ltd:position.coords.latitude,
                            lng:position.coords.longitude
                        }
                    })
                },(err)=>{
                    console.log("geo",err);
                })
               }
                liveLocation();
               const locationInterval=setInterval(liveLocation,10000);
              

            }
               
        }

        

    },[captainData])
  
    

  useEffect(() => {
    if (panelRef.current) {
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }
      );
    }
  }, [activePanel]);

  return (
    <div className="p-4">
      <div ref={panelRef}>
        {activePanel === "home" && <CaptainHome onRequestRide={() => setActivePanel("ride")} />}
        {activePanel === "ride" && (
          <RideDetails
            onAccept={() => setActivePanel("ongoing")}
            onReject={() => setActivePanel("home")}
          />
        )}
        {activePanel === "ongoing" && <OnGoingRide onComplete={() => setActivePanel("home")} />}
      </div>
    </div>
  );
}

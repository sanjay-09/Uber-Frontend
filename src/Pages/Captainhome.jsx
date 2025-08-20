import { useContext, useEffect } from "react";
import { useCaptain } from "../Context/CaptainProvider";
import { SocketContext } from "../Context/SocketProvider";

const CaptainHome=()=>{

    const {captainData}=useCaptain();
    const {sendMessage}=useContext(SocketContext)
    

    
    




    useEffect(()=>{
        if(captainData){
            sendMessage("join",{
                userId:captainData._id,
                userType:'captain'
            })

        

            if(navigator.geolocation){
                console.log("navigator");
                
               const liveLocation=()=>{
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
  



    return(
        <>
        <h1>Captain Home</h1>
        </>
    )
}
export default CaptainHome;
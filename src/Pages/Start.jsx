import { useEffect } from "react";
import { Link } from "react-router-dom";

const Start=()=>{


    useEffect(()=>{
        console.log("mounted");

        return ()=>{
            console.log("unmounted");
        }

    },[]);
    
    return(
        <>
        <div className="h-screen bg-black text-white flex flex-col justify-between ">
            <div className="flex flex-1 justify-center items-center">
                <h1 className="text-4xl">Uber</h1>

            </div>

            <div>
                <h1 className="text-center font-bold text-2xl">Welcome to the Uber</h1>
                <button className="w-full border py-2 text-2xl mt-2"><Link to="/login">Continue</Link></button>
            </div>
            

        </div>
        </>
    )
}
export default Start;
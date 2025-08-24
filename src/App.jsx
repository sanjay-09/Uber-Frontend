import { Route, Routes } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Captainlogin from "./Pages/Captainlogin";
import CaptainSignup from "./Pages/CaptainSignup";
import Start from "./Pages/Start";
import Home from "./Pages/Home";
import UserProtectWrapper from "./Pages/UserProtectWrapper";
import CaptainProtectWrapper from "./Pages/CaptainProtectWrapper";
import CaptainHome from "./Pages/Captainhome";
import ChooseRide from "./Pages/ChooseRide";
import NewHome from "./Pages/NewHome";

const App=()=>{

  return(
    <>
   <Routes>
    <Route path="/" element={<Start/>}/>
    <Route path="/home" element={<UserProtectWrapper><NewHome/></UserProtectWrapper>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/signup" element={<Signup/>}/>
    <Route path="/captain-login" element={<Captainlogin/>}/>
    <Route path="/captain-signup" element={<CaptainSignup/>}/>
    <Route path="/captain-home" element={<CaptainProtectWrapper><CaptainHome/></CaptainProtectWrapper>}/>
    <Route path="/choose-ride" element={<ChooseRide/>}/>
       </Routes>
    </>
  )
}
export default App;
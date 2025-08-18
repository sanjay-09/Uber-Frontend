import { Route, Routes } from "react-router-dom";

import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Captainlogin from "./Pages/Captainlogin";
import CaptainSignup from "./Pages/CaptainSignup";
import Start from "./Pages/Start";
import Home from "./Pages/Home";
import UserProtectWrapper from "./Pages/UserProtectWrapper";
import CaptainProtectWrapper from "./Pages/CaptainProtectWrapper";
import CaptainHome from "./Pages/Captainhome";

const App=()=>{

  return(
    <>
   <Routes>
    <Route path="/" element={<Start/>}/>
    <Route path="/home" element={<UserProtectWrapper><Home/></UserProtectWrapper>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/signup" element={<Signup/>}/>
    <Route path="/captain-login" element={<Captainlogin/>}/>
    <Route path="/captain-signup" element={<CaptainSignup/>}/>
    <Route path="/captain-home" element={<CaptainProtectWrapper><CaptainHome/></CaptainProtectWrapper>}/>
       </Routes>
    </>
  )
}
export default App;
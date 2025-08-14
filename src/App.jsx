import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Captainlogin from "./Pages/Captainlogin";
import CaptainSignup from "./Pages/CaptainSignup";

const App=()=>{

  return(
    <>
   <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/signup" element={<Signup/>}/>
    <Route path="/captain-login" element={<Captainlogin/>}/>
    <Route path="/captain-signup" element={<CaptainSignup/>}/>
       </Routes>
    </>
  )
}
export default App;
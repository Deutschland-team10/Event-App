import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Home from "../pages/Home";
import Profile from "../pages/Profile"
import Login from "../pages/Login";
import Register from "../pages/Register";
//import Navbar from "../components/Navbar";
import PrivateRouter from "./PrivateRouter";


const AppRouter = () => {
  return (
    <Router>
      <Navbar/>
       <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/register" element={<Register />} />
         <Route path="/login" element={<Login />} />

         <Route path="/event" element={<PrivateRouter />} >
           <Route path="" element={<Event />} />
         </Route>
         <Route path="/profile" element={<PrivateRouter />} >
           <Route path="" element={<Profile />} />
         </Route>
       </Routes>
    </Router>
  )
}

export default AppRouter
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Home from "../pages/Home";
import Profile from "../pages/Profile"
import ProfileForm from "../pages/ProfileEdit";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Navbar from "../components/Navbar";
import Dashboard from "../pages/Dashboard";
import PrivateRouter from "./PrivateRouter";
import EventList from "../pages/EventList";
import CardDetails from "../pages/CardDetails"


const AppRouter = () => {
  return (
    <Router>
      <Navbar/>
      
       <Routes>
       <Route element={<Dashboard/>}>
         <Route path="/" element={<EventList />} />
         <Route path="/register" element={<Register />} />
         <Route path="/login" element={<Login />} />
         <Route path="/details" element={<CardDetails />} />
         <Route path="/event" element={<PrivateRouter />} >
           <Route path="" element={<Event />} />
         </Route>
         <Route path="/profile" element={<PrivateRouter />} >
           <Route path="" element={<Profile />} />
         </Route>
         <Route path="/profile/edit" element={<PrivateRouter />}>
          <Route path="" element={<ProfileForm />} />
         </Route>
         </Route>
       </Routes>
    </Router>
  )
}

export default AppRouter
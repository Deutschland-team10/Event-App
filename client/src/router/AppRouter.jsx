import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import ProfileForm from "../pages/ProfileEdit";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Navbar from "../components/Navbar";
import Dashboard from "../pages/Dashboard";
import PrivateRouter from "./PrivateRouter";
import CardDetails from "../pages/CardDetails";
import StartPage from "../pages/StartPage";
import EventForm from "../pages/EventForm";



const AppRouter = () => {
  const { currentUser } = useSelector((state) => state.auth);

  return (
    <Router>

      {currentUser && <Navbar />}

      <Routes>
         <Route path="/" element={!currentUser && <StartPage />} />

        
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        <Route element={<Dashboard />}>
          <Route path="/event" element={<PrivateRouter />}>
            <Route path="" element={<EventForm />} />
          </Route>
          <Route path="/details" element={<PrivateRouter />}>
            <Route path="" element={<CardDetails />} />
          </Route>
          <Route path="/profile" element={<PrivateRouter />}>
            <Route path="" element={<Profile />} />
          </Route>
          <Route path="/profile/edit" element={<PrivateRouter />}>
            <Route path="" element={<ProfileForm />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;

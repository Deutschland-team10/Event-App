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
import CreateEvent from "../pages/CreateEvent";

const AppRouter = () => {
  const { currentUser } = useSelector((state) => state.auth);

  return (
    <Router>

      {currentUser && <Navbar />}

      <Routes>
        <Route path="/" element={!currentUser && <StartPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route  element={<PrivateRouter />}>
          <Route path="/home" element={<Dashboard />}>
            <Route path="create-event" element={<CreateEvent />} />
            <Route path="detail" element={<CardDetails />} />
            <Route path="profile" element={<Profile />} />
            <Route path="profile/edit" element={<ProfileForm />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
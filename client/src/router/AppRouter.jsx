import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import ProfileForm from "../pages/ProfileEdit";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import PrivateRouter from "./PrivateRouter";
import CardDetails from "../pages/CardDetails";
import StartPage from "../pages/StartPage";
import About from "../pages/About";
import CreateEvent from "../pages/CreateEvent";
import ChatPage from "../pages/ChatPage";
import MyEvents from "../pages/myEvents";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="home" element={<PrivateRouter />}>
          <Route path="" element={<Dashboard />}>
            <Route index element={<Home />} />
            <Route path="create-event" element={<CreateEvent />} />
            <Route path="details/:id" element={<CardDetails />} />
            <Route path="profile" element={<Profile />} />
            <Route path="my-events" element={<MyEvents />} />
            <Route path="about" element={<About />} />
            <Route path="chat-page" element={<ChatPage />} />
            <Route path="profile/edit" element={<ProfileForm />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;

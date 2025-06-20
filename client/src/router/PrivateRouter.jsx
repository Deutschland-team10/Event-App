import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRouter = () => {

  const user= sessionStorage.getItem("userInfo")

  return user ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRouter;

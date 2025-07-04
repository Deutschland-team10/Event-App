import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRouter = () => {

  // const user= sessionStorage.getItem("userInfo")
  const user = true

  return user ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRouter;

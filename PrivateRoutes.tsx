import { Navigate, Outlet } from "react-router-dom";
const PrivateRoutes = () => {
  // const location = useLocation();
  const user = sessionStorage.getItem("user");
  if (!user) {
    return <Navigate to="Login" />;
  }
  return <Outlet />;
};
export default PrivateRoutes;

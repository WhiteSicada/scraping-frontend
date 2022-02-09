import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();
  const token = localStorage.getItem("jwtToken");

  return token &&
    user?.roles?.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : token ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;

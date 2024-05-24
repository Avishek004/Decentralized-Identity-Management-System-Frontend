import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoute = () => {
  const loggedInUser = localStorage.getItem("access_token");

  const location = useLocation();
  // console.log(location)

  if (!loggedInUser) {
    // Store the location the user is coming from in localStorage
    localStorage.setItem("redirectPath", location.pathname + location.search);
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default PrivateRoute;

import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./authSlice";

// const RequireAuth = () => {
//   const token = useSelector(selectCurrentToken);
//   const location = useLocation();

//   //basic check for the token component ---------->
//   return token ? (
//     <Outlet />
//   ) : (
//     <Navigate to="/api/auth/sign_in" state={{ from: location }} replace />
//   );
// };

const RequireAuth = () => {
  const token = useSelector(selectCurrentToken);
  const location = useLocation();
  //basic check for the token component ---------->
  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;

import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import {selectApproved} from './authSlice'


const RequireApproved = () => {
  const approved = useSelector(selectApproved);
  const location = useLocation();
  //basic check for the token component ---------->
  return approved ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireApproved;

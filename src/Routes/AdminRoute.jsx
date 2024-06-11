import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";
import useAuth from "../Hooks/useAuth";
import Loading from "../Shared/Loading/Loading";
import PropTypes from "prop-types";

const AdminRoute = ({children}) => {
  const { user, loading } = useAuth();
  const [isAdmin,isAdminLoading]=useAdmin();
  const location=useLocation();

  if(loading || isAdminLoading){
    return <div className="min-h-screen flex justify-center items-center"><Loading></Loading></div>
  }

  if(user && isAdmin){
    return children
  }
  return <Navigate to="/login" state={{from:location}} replace></Navigate>;
};

AdminRoute.propTypes={
    children:PropTypes.node
}
export default AdminRoute;

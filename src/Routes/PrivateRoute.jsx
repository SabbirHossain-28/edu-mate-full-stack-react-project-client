import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import PropTypes from "prop-types"

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location=useLocation();


  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner text-success w-24 h-24"></span>
      </div>
    );
  }

  if (user) {
    return children;
  }
  return <Navigate to="/login" state={{from:location}} replace></Navigate>;
};

PrivateRoute.propTypes={
    children:PropTypes.node,
}
export default PrivateRoute;
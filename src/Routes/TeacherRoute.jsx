import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";
import useAuth from "../Hooks/useAuth";
import Loading from "../Shared/Loading/Loading";
import PropTypes from "prop-types";

const TeacherRoute = ({children}) => {
  const { user, loading } = useAuth();
  const [isTeacher,isTeacherLoading]=useAdmin();
  const location=useLocation();

  if(loading || isTeacherLoading){
    return <div className="min-h-screen flex justify-center items-center"><Loading></Loading></div>
  }

  if(user && isTeacher){
    return children
  }
  return <Navigate to="/login" state={{from:location}} replace></Navigate>;
};

TeacherRoute.propTypes={
    children:PropTypes.node
}
export default TeacherRoute;

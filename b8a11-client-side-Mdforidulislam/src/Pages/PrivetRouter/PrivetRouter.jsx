import { useContext } from "react";
import { usecontextHook } from "../../Hoks/Context/Context";
import { Navigate, useLocation } from "react-router-dom";

const PrivetRouter = ({children}) => {
    const {userInfo,loading} = useContext(usecontextHook)
    const {pathname} = useLocation()
console.log(pathname);
console.log(loading,userInfo);
  if (loading) {
    return  <span className="loading loading-spinner loading-lg"></span>
  }
  if (userInfo) {
    return children
  }
  return <Navigate to={'/login'}></Navigate>
};

export default PrivetRouter;
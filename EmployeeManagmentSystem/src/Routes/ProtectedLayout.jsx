import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const ProtectedLayout = ({adminOnly = false}) => {
    const {isLogin , currentUserDetails } = useSelector(state => state.authSlice)
    const location = useLocation()

    const sensitiveRoutes = ['/addTask' , '/editTask']
    const isSensitivePath = sensitiveRoutes.some(path =>
    location.pathname.startsWith(path)
  );

if(!isLogin)   return <Navigate to={"/login"} replace/>

  if (adminOnly && !currentUserDetails?.admin) {
    return <Navigate to="/employee" replace />;
  }

   if (adminOnly && isSensitivePath && !currentUserDetails?.admin) {
    return <Navigate to="/task" replace />;
  }

return <Outlet/>
}

export default ProtectedLayout
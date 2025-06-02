import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'


const ProtectedLayout = ({adminOnly = false}) => {
    const {isLogin , currentUserDetails } = useSelector(state => state.authSlice)
    

if(!isLogin)   return <Navigate to={"/login"} replace/>

  if (adminOnly && !currentUserDetails?.admin) {
    return <Navigate to="/employee" replace />;
  }


return <Outlet/>
}

export default ProtectedLayout
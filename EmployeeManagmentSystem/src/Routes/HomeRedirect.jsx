// components/HomeRedirect.jsx
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';


const HomeRedirect = () => {
  const { isLogin, currentUserDetails } = useSelector(state => state.authSlice);



  if (!isLogin) {
    return <Navigate to="/login" replace/>;
  }

  if (currentUserDetails?.admin) {
    console.log('navigate tp admin');
    
    return <Navigate to="/admin" replace />;
  }

  return <Navigate to="/employee" replace />;
};

export default HomeRedirect;

// components/HomeRedirect.jsx
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import authSlice from '../Store/authSlice';

const HomeRedirect = () => {
  const { isLogin, currentUserDetails } = useSelector(state => state.authSlice);

  if (!isLogin) {
    return <Navigate to="/login" replace />;
  }

  if (currentUserDetails?.admin) {
    return <Navigate to="/admin" replace />;
  }

  return <Navigate to="/employee" replace />;
};

export default HomeRedirect;

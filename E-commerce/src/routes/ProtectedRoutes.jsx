import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = ({ isAdmin = false }) => {
  const { userData } = useSelector((state) => state.authSlice);

  // User not logged in
  if (!userData) {
    return <Navigate to="/login" replace />;
  }

  // If route is admin-only but user is not an admin, redirect to home
  if (isAdmin && !userData.isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
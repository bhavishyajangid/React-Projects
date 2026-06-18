import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AuthRoutes = () => {
  const { userData } = useSelector((state) => state.authSlice);

  if (userData) {
    return null; // or a loader
  }

  return <Outlet />;
};

export default AuthRoutes
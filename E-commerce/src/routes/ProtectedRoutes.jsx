import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const { userData } = useSelector((state) => state.authSlice);

  if (userData) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PublicRoute;
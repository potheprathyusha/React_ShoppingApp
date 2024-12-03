import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("username"); // Check if the user is logged in

  if (!isLoggedIn) {
    return <Navigate to="/" />; // Redirect to login if not logged in
  }

  return children; // If logged in, render the protected page
};

export default ProtectedRoute;

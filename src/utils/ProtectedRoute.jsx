import React from "react";
import { userStore } from "../services/store/store";
import { Navigate } from "react-router-dom";
const ProtectedRoute = ({ children }) => {
  const { user } = userStore();
  return user?._id ? children : <Navigate to={"/"} replace={true} />;
};
const UserProtected = ({ children }) => {
  const { user } = userStore();
  return user?._id ? <Navigate to={"/"} /> : children;
};

export { ProtectedRoute, UserProtected };

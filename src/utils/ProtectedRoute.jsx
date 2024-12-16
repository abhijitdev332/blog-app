import React from "react";
import { useUserStore } from "../services/store/store";
import { Navigate } from "react-router-dom";
const ProtectedRoute = ({ children }) => {
  const { user } = useUserStore();
  return user?._id ? children : <Navigate to={"/"} replace={true} />;
};
const UserProtected = ({ children }) => {
  const { user } = useUserStore();
  return user?._id ? <Navigate to={"/"} /> : children;
};

export { ProtectedRoute, UserProtected };

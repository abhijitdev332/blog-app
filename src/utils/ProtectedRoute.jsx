import React from "react";
import { useUserStore } from "../services/store/store";
import { Navigate } from "react-router-dom";
const ProtectedRoute = ({ children }) => {
  const { user } = useUserStore();
  return "email" in user ? children : <Navigate to={"/auth"} />;
};

export { ProtectedRoute };

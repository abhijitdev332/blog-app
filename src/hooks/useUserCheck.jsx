import React from "react";
import { useState } from "react";
import { userStore } from "../services/store/store";

const useUserCheck = () => {
  const { user } = userStore();
  const [isUSer, setIsUser] = useState(false);
  if ("email" in user) {
    setIsUser(true);
  } else {
    setIsUser(false);
  }

  return [isUSer, setIsUser];
};

export default useUserCheck;

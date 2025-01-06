import { useState } from "react";
import { useUserStore } from "../services/store/store";
const useUserCheck = () => {
  const { user } = useUserStore();
  const [isUSer, setIsUser] = useState(false);
  if ("email" in user) {
    setIsUser(true);
  } else {
    setIsUser(false);
  }

  return [isUSer, setIsUser];
};

export default useUserCheck;

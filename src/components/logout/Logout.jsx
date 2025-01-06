import React, { useState } from "react";
import AxiosInt from "../../services/api/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { CustomButton } from "../components";
import cl from "classnames";
import { useUserStore } from "../../services/store/store";
const Logout = ({ style }) => {
  const navigate = useNavigate();
  const { removeUser } = useUserStore();
  const [loader, setLoader] = useState(false);
  const handleLogout = async () => {
    try {
      setLoader(true);
      const res = await AxiosInt.post("/auth/logout");
      if (res.status == 200) {
        toast.success(res.data?.msg);
        removeUser();
        navigate("/", { replace: true });
      }
    } catch (err) {
      toast.error(err?.response?.data?.msg);
    } finally {
      setLoader(false);
    }
  };

  return (
    <>
      <CustomButton
        loader={loader}
        func={handleLogout}
        classnames={cl("robo", style)}
      >
        Logout
      </CustomButton>
    </>
  );
};

export default Logout;

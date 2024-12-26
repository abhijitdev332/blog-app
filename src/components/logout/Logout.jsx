import React from "react";
import AxiosInt from "../../services/api/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import cl from "classnames";
import { useUserStore } from "../../services/store/store";
const Logout = ({ style }) => {
  const navigate = useNavigate();
  const { removeUser } = useUserStore();
  const handleLogout = async () => {
    try {
      const res = await AxiosInt.post("/auth/logout");
      if (res.status == 200) {
        toast.success(res.data?.msg);
        removeUser();
        navigate("/", { replace: true });
      }
    } catch (err) {
      toast.error(err?.response?.data?.msg);
    }
  };

  return (
    <>
      <button onClick={handleLogout} className={cl("robo", style)}>
        <span>Logout</span>
      </button>
    </>
  );
};

export default Logout;

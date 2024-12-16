import React, { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import style from "./dashbroad.module.scss";
import { FaRegEye } from "react-icons/fa";
import {
  MdOutlinePublishedWithChanges,
  MdOutlineUnpublished,
} from "react-icons/md";
import cl from "classnames";
import AxiosInt from "../../services/api/api";
import { userStore, UseDataStore } from "../../services/store/store";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Dashbroad = () => {
  const navigate = useNavigate();
  const [userPosts, setUserPosts] = useState([]);
  const { user } = userStore();
  const { setRefetch } = UseDataStore();
  const [isAdmin, setIsAdmin] = useState(user?.roles?.includes("admin"));

  useEffect(() => {
    setIsAdmin(user?.roles?.includes("admin"));
    if (isAdmin) {
      getAdminPosts();
    } else {
      getUserPosts();
    }
  }, [user]);
  return (
    <>
      <div className="dashbroad">
        <div className="dashbroad__wrapper  px-5 py-4">
          <div className="flex">
            <div className="card"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashbroad;

import React, { useEffect, useState } from "react";
import useFetchData from "../../hooks/useFetchData";
import style from "./table.module.scss";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { BiSort } from "react-icons/bi";
import cl from "classnames";
import AxiosInt from "../../services/api/api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { HiDotsVertical } from "react-icons/hi";
import { useLoaderStore } from "../../services/store/store";
import UserTableRow from "./UserTableRow";
import Pagination from "./Pagination";
const UserTable = () => {
  const [users, setUsers] = useState([]);
  const { setLoading, removeLoading } = useLoaderStore();
  const { data } = useFetchData("/admin/user");
  const [modalShow, setModalShow] = useState(false);
  const [selected, setSelected] = useState(null);
  const getUsers = async () => {
    try {
      setLoading();
      let res = await AxiosInt.get("/admin/user");
      if (res.status == 200) {
        setUsers(res.data?.data);
      }
    } catch (err) {
      setUsers([]);
      toast("something went wrong!!");
    } finally {
      removeLoading();
    }
  };
  const handleActiveClick = async (e) => {
    try {
      // setLoading();
      if (e?.isActive) {
        let res = await AxiosInt.put(`/admin/user/${e?._id}`, {
          isActive: false,
        });
        if (res.status == 200) {
          toast.success("User updated");
          getUsers();
        }
      } else {
        let res = await AxiosInt.put(`/admin/user/${e?._id}`, {
          isActive: true,
        });
        if (res.status == 200) {
          toast.success("User updated");
          getUsers();
        }
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      // removeLoading();
    }
  };
  const handleDeleteClick = async (e) => {
    try {
      // setLoading();
      let res = await AxiosInt.delete(`/user/${e}`);
      if (res.status == 200) {
        getUsers();
      }
    } catch (err) {
      toast("something went wrong!!");
    } finally {
      // removeLoading();
    }
  };
  const handleAccess = async (e) => {
    try {
      // setLoading();
      let res = await AxiosInt.put(`/admin/user/${e?._id}`, {
        roles: [...e?.roles, "admin"],
      });
      if (res.status == 200) {
        getUsers();
      }
    } catch (err) {
      setUsers([]);
      toast.error("something went wrong");
    } finally {
      // removeLoading();
    }
  };
  const handleRemoveAccess = async (e) => {
    try {
      // setLoading();
      let res = await AxiosInt.put(`/admin/user/${e?._id}`, {
        roles: [...e?.roles?.filter((ele) => ele !== "admin")],
      });
      if (res.status == 200) {
        getUsers();
      }
    } catch (err) {
      setUsers([]);
      toast("something went wrong");
    } finally {
      // removeLoading();
    }
  };
  // const handleMenuClick = (e) => {
  //   setSelected(e);
  //   setModalShow((prev) => !prev);
  // };
  // fetch users
  useEffect(() => {
    if (users?.length <= 0) {
      setLoading();
    } else {
      removeLoading();
    }
    setUsers(data);
  }, [data]);

  return (
    <div className={style.table__container}>
      <div className="lg:container lg:mx-auto p-5 h-full">
        <div className={style.table__wrapper}>
          <table className={cl("relative", style.table)}>
            <thead>
              {/* <td>SL No</td> */}
              <td>
                {/* <span>Avatar</span> */}

                <div className="flex items-center">
                  <span>Username</span>
                  <span>
                    <BiSort fontSize={"0.9rem"} />
                  </span>
                </div>
              </td>
              <td>Email ID</td>
              <td>
                <div className="flex items-center">
                  <span>Status</span>
                  <span>
                    <BiSort fontSize={"0.9rem"} />
                  </span>
                </div>
              </td>
              <td>
                <div className="flex items-center">
                  <span>Created</span>
                  <span>
                    <BiSort fontSize={"0.9rem"} />
                  </span>
                </div>
              </td>
              <td>Roles</td>
              <td>Actions</td>
            </thead>
            <tbody>
              {users?.length > 0 ? (
                users?.map((ele) => (
                  <UserTableRow ele={ele} getUsers={getUsers} />
                ))
              ) : (
                <h3>No Users in here</h3>
              )}
            </tbody>
          </table>
          <Pagination />
        </div>
      </div>
    </div>
  );
};

export default UserTable;

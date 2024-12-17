import React, { useEffect, useState } from "react";
import useFetchData from "../../hooks/useFetchData";
import style from "./table.module.scss";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import AxiosInt from "../../services/api/api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { HiDotsVertical } from "react-icons/hi";
import { useLoaderStore } from "../../services/store/store";
const UserTable = () => {
  const [users, setUsers] = useState([]);
  const { setLoading, removeLoading } = useLoaderStore();
  const { data } = useFetchData("/admin/user");
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
    <div className={style.table__wrapper}>
      <div className="lg:container lg:mx-auto p-5">
        <table className={style.table}>
          <thead>
            {/* <td>SL No</td> */}
            <td>
              {/* <span>Avatar</span> */}
              <span>Name</span>
            </td>
            <td>Mail</td>
            <td>status</td>
            <td>Roles</td>
            <td>Actions</td>
          </thead>
          <tbody>
            {users?.length > 0 ? (
              users?.map((ele, index) => (
                <tr>
                  {/* <td>{index + 1}</td> */}
                  <td>
                    <Link to={`/admin/user/post/${ele?._id}`}>
                      {ele?.username}
                    </Link>
                  </td>

                  <td>{ele?.email}</td>
                  <td>{ele?.isActive ? "active" : "unactive"}</td>
                  <td>
                    {ele?.roles?.map((ele) => (
                      <span className="px-2">{ele}</span>
                    ))}

                    {ele?.roles?.includes("admin") ? (
                      <button
                        className="p-1 bg-teal-600 rounded-md"
                        onClick={() => handleRemoveAccess(ele)}
                      >
                        remove Access
                      </button>
                    ) : (
                      <button
                        className="p-1 bg-teal-600 rounded-md"
                        onClick={() => handleAccess(ele)}
                      >
                        Give Access
                      </button>
                    )}
                  </td>
                  <td className="flex gap-4">
                    <button
                      className="hover:scale-125 transition-transform"
                      onClick={() => handleActiveClick(ele)}
                    >
                      {ele?.isActive ? (
                        <FaEye fontSize={"1.4rem"} color="indigo" />
                      ) : (
                        <FaEyeSlash fontSize={"1.4rem"} color="indigo" />
                      )}
                    </button>
                    <button
                      className="hover:scale-125 transition-transform"
                      onClick={() => handleDeleteClick(ele?._id)}
                    >
                      <RiDeleteBin6Fill fontSize={"1.4rem"} color="crimson" />
                    </button>
                    <button>
                      <HiDotsVertical fontSize={"1.4rem"} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <h3>No Users in here</h3>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;

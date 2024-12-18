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
import { UserTableRow } from "./tableRows/rows";
import Pagination from "./Pagination";
const UserTable = () => {
  const [users, setUsers] = useState([]);
  const { setLoading, removeLoading } = useLoaderStore();
  const { data } = useFetchData("/admin/user");
  const [sorted, setSorted] = useState(false);
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
  const sortUser = () => {
    let sortedData = [];
    if (sorted) {
      sortedData = users?.toSorted((a, b) =>
        a?.username > b?.username ? -1 : b?.username > a?.username ? 1 : 0
      );
      setUsers(sortedData);
      setSorted(!sorted);
      return;
    }
    sortedData = users?.toSorted((a, b) =>
      b?.username > a?.username ? -1 : a?.username > b?.username ? 1 : 0
    );
    setUsers(sortedData);
    setSorted(!sorted);
  };
  const sortCreatedDate = () => {
    let sortedData = [];
    if (sorted) {
      sortedData = users?.toSorted((a, b) =>
        a?.createdAt > b?.createdAt ? -1 : b?.createdAt > a?.createdAt ? 1 : 0
      );
      setUsers(sortedData);
      setSorted(!sorted);
      return;
    }
    sortedData = users?.toSorted((a, b) =>
      b?.createdAt > a?.createdAt ? -1 : a?.createdAt > b?.createdAt ? 1 : 0
    );
    setUsers(sortedData);
    setSorted(!sorted);
  };
  const sortStatus = () => {
    let sortedData = [];
    if (sorted) {
      sortedData = users?.toSorted((a, b) => a?.isActive - b?.isActive);
      setUsers(sortedData);
      setSorted(!sorted);
      return;
    }
    sortedData = users?.toSorted((a, b) => b?.isActive - a?.isActive);
    setUsers(sortedData);
    setSorted(!sorted);
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
    <div className={style.table__container}>
      <div className="lg:container lg:mx-auto p-5 h-full">
        <div className={style.table__wrapper}>
          <table className={cl("relative", style.table)}>
            <thead>
              {/* <td>SL No</td> */}
              <td>
                {/* <span>Avatar</span> */}

                <div
                  className="flex items-center"
                  onClick={() => {
                    sortUser();
                  }}
                >
                  <span>Username</span>
                  <span>
                    <BiSort fontSize={"0.9rem"} />
                  </span>
                </div>
              </td>
              <td>Email ID</td>
              <td>
                <div className="flex items-center" onClick={() => sortStatus()}>
                  <span>Status</span>
                  <span>
                    <BiSort fontSize={"0.9rem"} />
                  </span>
                </div>
              </td>
              <td>
                <div
                  className="flex items-center"
                  onClick={() => {
                    sortCreatedDate();
                  }}
                >
                  <span>Created</span>
                  <span>
                    <BiSort fontSize={"0.9rem"} />
                  </span>
                </div>
              </td>
              <td>
                <div className="flex items-center">
                  <span>Roles</span>
                  {/* <span>
                    <BiSort fontSize={"0.9rem"} />
                  </span> */}
                </div>
              </td>
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

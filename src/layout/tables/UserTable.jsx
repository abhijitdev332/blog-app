import React, { useEffect, useState } from "react";
import useFetchData from "../../hooks/useFetchData";
import style from "./table.module.scss";
import { BiSort } from "react-icons/bi";
import cl from "classnames";
import AxiosInt from "../../services/api/api";
import { toast } from "react-toastify";
import { UserTableRow } from "./tableRows/rows";
import Pagination from "./Pagination";
import useLoaderStore from "../../services/store/useLoaderStore";
const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUsers] = useState([]);
  const { data } = useFetchData("/admin/user");
  const [sorted, setSorted] = useState(false);
  const { setLoading, removeLoading } = useLoaderStore();
  const getUsers = async () => {
    try {
      setLoading();
      let res = await AxiosInt.get("/admin/user");
      if (res.status == 200) {
        setUsers(res.data?.data);
      }
    } catch (err) {
      setUsers([]);
      toast.error(err?.response?.data?.msg);
    } finally {
      removeLoading();
    }
  };
  const sortUser = () => {
    let sortedData = [];
    if (sorted) {
      sortedData = currentUser?.toSorted((a, b) =>
        a?.username > b?.username ? -1 : b?.username > a?.username ? 1 : 0
      );
      setCurrentUsers(sortedData);
      setSorted(!sorted);
      return;
    }
    sortedData = currentUser?.toSorted((a, b) =>
      b?.username > a?.username ? -1 : a?.username > b?.username ? 1 : 0
    );
    setCurrentUsers(sortedData);
    setSorted(!sorted);
  };
  const sortCreatedDate = () => {
    let sortedData = [];
    if (sorted) {
      sortedData = currentUser?.toSorted((a, b) =>
        a?.createdAt > b?.createdAt ? -1 : b?.createdAt > a?.createdAt ? 1 : 0
      );
      setCurrentUsers(sortedData);
      setSorted(!sorted);
      return;
    }
    sortedData = currentUser?.toSorted((a, b) =>
      b?.createdAt > a?.createdAt ? -1 : a?.createdAt > b?.createdAt ? 1 : 0
    );
    setCurrentUsers(sortedData);
    setSorted(!sorted);
  };
  const sortStatus = () => {
    let sortedData = [];
    if (sorted) {
      sortedData = currentUser?.toSorted((a, b) => a?.isActive - b?.isActive);
      setCurrentUsers(sortedData);
      setSorted(!sorted);
      return;
    }
    sortedData = currentUser?.toSorted((a, b) => b?.isActive - a?.isActive);
    setCurrentUsers(sortedData);
    setSorted(!sorted);
  };
  const handleCurrentPost = (data) => {
    setCurrentUsers(data);
  };

  // fetch users
  useEffect(() => {
    setUsers(data);
  }, [data]);

  return (
    <div className={style.table__container}>
      <div className="lg:container lg:mx-auto p-1 sm:p-5 h-full">
        <div className={style.table__wrapper}>
          <table className={cl("relative", style.table)}>
            <thead className="bg-slate-200">
              {/* <td>SL No</td> */}
              <td>
                {/* <span>Avatar</span> */}

                <div
                  className="flex items-center"
                  onClick={() => {
                    sortUser();
                  }}
                >
                  <span>User Name</span>
                  <span>
                    <BiSort fontSize={"0.9rem"} />
                  </span>
                </div>
              </td>
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
                  <span>Date Added</span>
                  <span>
                    <BiSort fontSize={"0.9rem"} />
                  </span>
                </div>
              </td>
              <td>
                <div className="flex items-center">
                  <span>Access</span>
                  {/* <span>
                    <BiSort fontSize={"0.9rem"} />
                  </span> */}
                </div>
              </td>
              <td>Actions</td>
            </thead>
            <tbody>
              {currentUser?.length > 0 ? (
                currentUser?.map((ele) => (
                  <UserTableRow ele={ele} getUsers={getUsers} />
                ))
              ) : (
                <h3 className="p-5 font-semibold text-lg">
                  No Users in here !!
                </h3>
              )}
            </tbody>
          </table>
          <Pagination
            posts={users}
            setCurrent={handleCurrentPost}
            perPage={5}
          />
        </div>
      </div>
    </div>
  );
};

export default UserTable;

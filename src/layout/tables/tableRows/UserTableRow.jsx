import React, { useState } from "react";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FaUserEdit } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import { MdOutlinePostAdd } from "react-icons/md";
import { LuView } from "react-icons/lu";
import AxiosInt from "../../../services/api/api";
import { toast } from "react-toastify";
import cl from "classnames";
import { Link } from "react-router-dom";
import { toDateString } from "../../../utils/utils";
const UserTableRow = ({ ele, getUsers }) => {
  const [show, setShow] = useState(false);
  const [showAccess, setAccess] = useState(false);

  const handleDeleteClick = async (e) => {
    try {
      // setLoading();
      let res = await AxiosInt.delete(`/user/${e}`);
      if (res.status == 200) {
        getUsers();
        toast.success(res.data?.msg);
      }
    } catch (err) {
      toast.error(err?.response?.data?.msg);
    }
  };
  const handleAccessClick = async (e) => {
    let permission = e?.target?.innerText;
    setAccess(false);
    try {
      if (permission?.toLowerCase() == "user") {
        let res = await AxiosInt.put(`/admin/user/${ele?._id}`, {
          roles: ["user"],
        });
        if (res.status == 200) {
          getUsers();
          toast.success(res.data?.msg);
        }
      } else if (permission?.toLowerCase() == "admin") {
        let res = await AxiosInt.put(`/admin/user/${ele?._id}`, {
          roles: ["admin"],
        });
        if (res.status == 200) {
          getUsers();
          toast.success(res.data?.msg);
        }
      } else {
        let res = await AxiosInt.put(`/admin/user/${ele?._id}`, {
          roles: ["user", "admin"],
        });
        if (res.status == 200) {
          getUsers();
          toast.success(res.data?.msg);
        }
      }
    } catch (err) {
      toast.error(err?.response?.data?.msg);
    }
  };
  return (
    <tr className="relative">
      <td>
        <Link to={`/admin/user/post/${ele?._id}`} className="flex flex-col">
          <span className="font-medium">{ele?.username}</span>
          <span className="text-sm text-slate-500">{ele?.email}</span>
        </Link>
      </td>

      <td>
        <span
          className={cl(
            "px-2 py-1 rounded-full",
            ele?.isActive
              ? "text-green-900 bg-green-400"
              : "text-slate-900 bg-slate-400"
          )}
        >
          {ele?.isActive ? "active" : "unactive"}
        </span>
      </td>
      <td>{toDateString(ele?.createdAt)}</td>
      <td>
        <div className="role inline-flex gap-2">
          {ele?.roles?.map((ele) => (
            <AccessChip access={ele} />
          ))}
        </div>
      </td>
      <td className="flex items-center gap-4">
        <SetStatus ele={ele} getUsers={getUsers} />
        <button onClick={() => setShow(!show)} title="Actions">
          <HiDotsVertical fontSize={"1.4rem"} />
        </button>
      </td>
      <div
        className={cl(
          "modal absolute top-[2rem] right-[3rem] z-20 transition-all",
          show ? "h-0 block" : "h-fit hidden"
        )}
        onMouseLeave={() => {
          setShow(false);
          setAccess(false);
        }}
      >
        <div className="wrapper bg-slate-100 px-3 py-2 rounded-md">
          <ul className="flex flex-col gap-2 list-none">
            <li>
              <button className=" flex gap-1 cursor-pointer items-center hover:text-blue-500">
                <LuView fontSize={"1rem"} />
                <span className="font-semibold">
                  <Link to={`/user/${ele?._id}`}>View User</Link>
                </span>
              </button>
            </li>
            <li>
              <button className=" flex gap-1 items-center cursor-pointer hover:text-blue-500">
                <MdOutlinePostAdd fontSize={"1rem"} />
                <span className="font-semibold">
                  <Link to={`/admin/user/post/${ele?._id}`}>User Posts</Link>
                </span>
              </button>
            </li>
            <li>
              <button
                className={cl(
                  "flex gap-1 items-center cursor-pointer hover:text-blue-500"
                )}
                onClick={() => setAccess(!showAccess)}
              >
                <FaUserEdit fontSize={"1rem"} />
                <span className="font-semibold">Edit Access</span>
              </button>
              <div
                className={cl(
                  "select__modal w-full",
                  showAccess ? "h-fit block" : "h-0 hidden"
                )}
              >
                <ul
                  name=""
                  id=""
                  className="w-full border-2 rounded-md p-2 bg-slate-400 list-none"
                  onClick={handleAccessClick}
                >
                  <li className=" hover:bg-blue-400 cursor-pointer p-1 rounded">
                    User
                  </li>
                  <li className=" hover:bg-blue-400 cursor-pointer p-1 rounded">
                    Admin
                  </li>
                  <li className=" hover:bg-blue-400 cursor-pointer p-1 rounded">
                    Both
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <button
                className="flex gap-1 items-center cursor-pointer hover:text-red-600"
                onClick={() => handleDeleteClick(ele?._id)}
              >
                <RiDeleteBin6Fill fontSize={"1rem"} />
                <span className="font-semibold">Delete</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </tr>
  );
};

const AccessChip = ({ access }) => {
  return access.toLowerCase() == "admin" ? (
    <span className="px-2 bg-green-400 text-green-900 rounded-full">
      {access}
    </span>
  ) : (
    <span className="px-2 bg-blue-400 text-blue-900 rounded-full">
      {access}
    </span>
  );
};
const SetStatus = ({ ele, getUsers }) => {
  const [loading, setLoading] = useState(false);
  const handleActiveClick = async (e) => {
    try {
      setLoading(true);
      if (e?.isActive) {
        let res = await AxiosInt.put(`/admin/user/${e?._id}`, {
          isActive: false,
        });
        if (res.status == 200) {
          toast.success(res.data?.msg);
          getUsers();
        }
      } else {
        let res = await AxiosInt.put(`/admin/user/${e?._id}`, {
          isActive: true,
        });
        if (res.status == 200) {
          toast.success(res.data?.msg);
          getUsers();
        }
      }
    } catch (err) {
      toast.error(err?.response?.data?.msg);
    } finally {
      setLoading(false);
    }
  };
  return (
    <button
      className="hover:scale-125 transition-transform"
      onClick={() => handleActiveClick(ele)}
      title="change status"
    >
      {ele?.isActive ? (
        <FaEye
          fontSize={"1.4rem"}
          color="indigo"
          className={cl(loading ? "animate-pulse" : "")}
        />
      ) : (
        <FaEyeSlash
          fontSize={"1.4rem"}
          color="indigo"
          className={cl(loading ? "animate-pulse" : "")}
        />
      )}
    </button>
  );
};
export default UserTableRow;

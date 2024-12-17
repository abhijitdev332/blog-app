import React, { useState } from "react";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FaUserEdit } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import { MdOutlinePostAdd } from "react-icons/md";
import { LuView } from "react-icons/lu";
import AxiosInt from "../../services/api/api";
import { toast } from "react-toastify";
import cl from "classnames";
import { Link } from "react-router-dom";
const UserTableRow = ({ ele, getUsers }) => {
  const [show, setShow] = useState(false);
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
      toast("something went wrong");
    } finally {
      // removeLoading();
    }
  };
  return (
    <tr className="relative">
      {/* <td>{index + 1}</td> */}
      <td>
        <Link to={`/admin/user/post/${ele?._id}`}>{ele?.username}</Link>
      </td>

      <td>{ele?.email}</td>
      <td>
        <span
          className={cl(
            "px-2 py-1 rounded",
            ele?.isActive ? "bg-green-400 " : "bg-red-400 "
          )}
        >
          {ele?.isActive ? "active" : "unactive"}
        </span>
      </td>
      <td>
        <div className="role inline-flex gap-2">
          {ele?.roles?.map((ele) => (
            <span className="px-2 bg-blue-300  rounded">{ele}</span>
          ))}
        </div>

        {/* {ele?.roles?.includes("admin") ? (
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
        )} */}
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
        <button onClick={() => setShow(!show)}>
          <HiDotsVertical fontSize={"1.4rem"} />
        </button>
      </td>
      <div
        className={cl(
          "modal absolute top-[1rem] right-[3rem] z-20",
          show ? "block" : "hidden"
        )}
        onMouseLeave={() => {
          setShow(false);
        }}
      >
        <div className="wrapper bg-slate-100 px-3 py-2 rounded-md">
          <ul className="flex flex-col gap-2">
            <li>
              <button className=" flex gap-1 cursor-pointer items-center hover:text-blue-500">
                <LuView fontSize={"1rem"} />
                <span className="font-semibold">View User</span>
              </button>
            </li>
            <li>
              <button className=" flex gap-1 items-center cursor-pointer hover:text-blue-500">
                <MdOutlinePostAdd fontSize={"1.rem"} />
                <span className="font-semibold">User Posts</span>
              </button>
            </li>
            <li>
              <button className=" flex gap-1 items-center cursor-pointer hover:text-blue-500">
                <FaUserEdit fontSize={"1rem"} />
                <span className="font-semibold">Edit Access</span>
              </button>
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

export default UserTableRow;

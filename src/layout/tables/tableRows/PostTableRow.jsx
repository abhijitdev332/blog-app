import React, { useCallback, useEffect, useState } from "react";
import { FaRegEdit, FaUserEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaRegEye } from "react-icons/fa";
import {
  MdOutlinePostAdd,
  MdOutlinePublishedWithChanges,
  MdOutlineUnpublished,
} from "react-icons/md";
import AxiosInt from "../../../services/api/api";
import { Link, useNavigate } from "react-router-dom";
import { toDateString } from "../../../utils/utils";
import { toast } from "react-toastify";
import { useUserStore, useDataStore } from "../../../services/store/store.js";
import { HiDotsVertical } from "react-icons/hi";
import { LuView } from "react-icons/lu";
// style
import cl from "classnames";
import style from "./rowStyle.module.scss";

const PostTableRow = ({ ele, setFetch = "" }) => {
  // global states
  const { user } = useUserStore();
  const { setRefetch } = useDataStore();
  // local states
  const [show, setShow] = useState(false);
  const [isAdmin, setIsAdmin] = useState(user?.roles?.includes("admin"));
  // functions
  const handlePublishClick = async (e) => {
    try {
      if (e?.status == "published" && isAdmin) {
        let res = await AxiosInt.put(`/admin/post/${e?._id}`, {
          status: "archived",
        });
        if (res.status == 200) {
          setRefetch();
          setFetch();
          toast.success("update Successfull");
        }
      } else if (isAdmin) {
        let res = await AxiosInt.put(`/admin/post/${e?._id}`, {
          status: "published",
        });
        if (res.status == 200) {
          setRefetch();
          setFetch();
          toast.success("update successfull");
        }
      }
    } catch (err) {
      toast.error("something went wrong!!");
    }
  };

  const handleDelete = async (e) => {
    try {
      let res = await AxiosInt.delete(`/post/${e}`);
      if (res.status == 200) {
        setRefetch();
        setFetch();
        toast.success("Delete Successfull");
      }
    } catch (err) {
      toast.error("something went wrong!!");
    }
  };

  return (
    <tr key={ele?._id} className={cl(style.table__row, "relative")}>
      <td>
        <input type="checkbox" name="check" className={style.checkbox} />
      </td>
      {/* <td title={ele?._id}>{ele?._id?.slice(0, 5) + "...."}</td> */}
      <td title={ele?.title}>{ele.title.substring(0, 20)}...</td>
      <td>{ele?.author?.username}</td>
      <td>
        <span
          className={cl(
            ele?.status == "published" ? "text-green-400" : "text-slate-500"
          )}
        >
          {ele?.status}
        </span>
      </td>
      <td>{toDateString(ele?.createdAt)}</td>
      <td className={cl("flex justify-center gap-2")}>
        <div className="flex gap-3">
          {isAdmin ? (
            <>
              <button
                onClick={() => handlePublishClick(ele)}
                className="hover:scale-125  transition-transform"
                title="Publish Post"
              >
                {ele?.status == "published" ? (
                  <MdOutlineUnpublished fontSize={"1.3rem"} color="orange" />
                ) : (
                  <MdOutlinePublishedWithChanges
                    fontSize={"1.3rem"}
                    color="orange"
                  />
                )}
              </button>
            </>
          ) : (
            <button
              className="hover:scale-125 transition-all"
              title="Edit Post"
            >
              <span>
                <FaRegEdit color="indigo" fontSize={"1.4rem"} />
              </span>
            </button>
          )}
        </div>
        <div>
          <button onClick={() => setShow(!show)}>
            <HiDotsVertical />
          </button>
        </div>
      </td>
      <div
        className={cl(
          "modal absolute top-[2rem] right-0 z-20",
          show ? "h-0 block" : "h-fit hidden",
          style.transition
        )}
        onMouseLeave={() => {
          setShow(false);
        }}
      >
        <div className="wrapper bg-slate-100 px-3 py-2 rounded-md">
          {isAdmin ? (
            <AdminModal ele={ele} handleDelete={handleDelete} />
          ) : (
            <UserModal ele={ele} handleDelete={handleDelete} />
          )}
        </div>
      </div>
    </tr>
  );
};

const UserModal = ({ ele, handleDelete }) => {
  return (
    <ul className="flex flex-col gap-2">
      <li>
        <button className=" flex gap-1 items-center cursor-pointer hover:text-blue-500">
          <MdOutlinePostAdd fontSize={"1.rem"} />
          <span className="font-semibold">
            <Link to={`/admin/viewPost/${ele?._id}`}>View Post</Link>
          </span>
        </button>
      </li>
      <li>
        <button className=" flex gap-1 items-center cursor-pointer hover:text-blue-500">
          <span>
            <FaRegEdit fontSize={"1rem"} />
          </span>
          <span className="font-semibold">Edit Post</span>
        </button>
      </li>

      <li>
        <button
          className="flex gap-1 items-center cursor-pointer hover:text-red-600"
          onClick={() => handleDelete(ele?._id)}
        >
          <RiDeleteBin6Fill fontSize={"1rem"} />
          <span className="font-semibold">Delete</span>
        </button>
      </li>
    </ul>
  );
};
const AdminModal = ({ ele, handleDelete }) => {
  return (
    <ul className="flex flex-col gap-2">
      <li>
        <button className=" flex gap-1 items-center cursor-pointer hover:text-blue-500">
          <MdOutlinePostAdd fontSize={"1.rem"} />
          <span className="font-semibold">
            <Link to={`/admin/viewPost/${ele?._id}`}>View Post</Link>
          </span>
        </button>
      </li>
      <li>
        <button className=" flex gap-1 cursor-pointer items-center hover:text-blue-500">
          <LuView fontSize={"1rem"} />
          <span className="font-semibold">View User</span>
        </button>
      </li>

      <li>
        <button
          className="flex gap-1 items-center cursor-pointer hover:text-red-600"
          onClick={() => handleDelete(ele?._id)}
        >
          <RiDeleteBin6Fill fontSize={"1rem"} />
          <span className="font-semibold">Delete</span>
        </button>
      </li>
    </ul>
  );
};

export default PostTableRow;

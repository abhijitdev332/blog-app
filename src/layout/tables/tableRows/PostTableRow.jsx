import React, { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import {
  MdOutlinePostAdd,
  MdOutlinePublishedWithChanges,
  MdOutlineUnpublished,
} from "react-icons/md";
import AxiosInt from "../../../services/api/api";
import { Link } from "react-router-dom";
import { toDateString } from "../../../utils/utils";
import { toast } from "react-toastify";
import { useUserStore, useDataStore } from "../../../services/store/store.js";
import { HiDotsVertical } from "react-icons/hi";
import { LuView } from "react-icons/lu";
// style
import cl from "classnames";
import style from "./rowStyle.module.scss";

const PostTableRow = ({ ele, setFetch = "", allCheck, setCheckArr }) => {
  // global states
  const { user } = useUserStore();
  const { setRefetch } = useDataStore();
  // local states
  const [show, setShow] = useState(false);
  const [isAdmin, setIsAdmin] = useState(user?.roles?.includes("admin"));
  const [checked, setChecked] = useState(false);
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
          toast.success(res.data?.msg);
        }
      } else if (isAdmin) {
        let res = await AxiosInt.put(`/admin/post/${e?._id}`, {
          status: "published",
        });
        if (res.status == 200) {
          setRefetch();
          setFetch();
          toast.success(res.data?.msg);
        }
      }
    } catch (err) {
      toast.error(err?.response?.data?.msg);
    }
  };

  const handleDelete = async (e) => {
    try {
      let res = await AxiosInt.delete(`/post/${e}`);
      if (res.status == 200) {
        setRefetch();
        setFetch();
        toast.success(res.data?.msg);
      }
    } catch (err) {
      toast.error(err?.response?.data?.msg);
    }
  };
  const handleCheck = (e) => {
    if (e.target.checked) {
      setCheckArr((prev) => [...prev, ele?._id]);
    } else {
      setCheckArr((prev) => {
        let fillterArr = prev?.filter((item) => item !== ele?._id);
        return [...fillterArr];
      });
    }
    setChecked(e.target.checked);
  };

  useEffect(() => {
    if (allCheck) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [allCheck]);
  return (
    <tr key={ele?._id} className={cl("relative")}>
      <td>
        <input
          type="checkbox"
          name="check"
          checked={checked}
          className={style.checkbox}
          onChange={handleCheck}
        />
      </td>
      <td title={ele?.title}>{ele.title.substring(0, 15)}...</td>
      <td>{ele?.author?.username}</td>
      <td>
        <span
          className={cl(
            "p-2 rounded-full capitalize",

            ele?.status == "published"
              ? "text-green-900 bg-green-400"
              : "text-slate-900 bg-slate-400"
          )}
        >
          {ele?.status}
        </span>
      </td>
      <td>{toDateString(ele?.createdAt)}</td>
      <td className={cl("flex justify-start gap-2")}>
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
            ""
            // <button
            //   className="hover:scale-125 transition-all"
            //   title="Edit Post"
            // >
            //   <span>
            //     <FaRegEdit color="indigo" fontSize={"1.4rem"} />
            //   </span>
            // </button>
          )}
        </div>
        <div className="inline-flex items-center">
          <button onClick={() => setShow(!show)}>
            <HiDotsVertical fontSize={"1.4rem"} />
          </button>
        </div>
      </td>
      <div
        className={cl(
          "modal absolute top-[2rem] right-0 z-20 transition-all",
          show ? "h-0 block" : "h-fit hidden"
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
    <ul className="flex flex-col gap-2 list-none">
      <li>
        <button className=" flex gap-1 items-center cursor-pointer hover:text-blue-500">
          <MdOutlinePostAdd fontSize={"1.rem"} />
          <span className="font-semibold">
            <Link to={`/admin/viewPost/${ele?._id}`}>View Post</Link>
          </span>
        </button>
      </li>
      {/* <li>
        <button className=" flex gap-1 items-center cursor-pointer hover:text-blue-500">
          <span>
            <FaRegEdit fontSize={"1rem"} />
          </span>
          <span className="font-semibold">Edit Post</span>
        </button>
      </li> */}

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
    <ul className="flex flex-col gap-2 list-none">
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
          <Link to={`/user/${ele?.author?._id}`} className="font-semibold">
            View User
          </Link>
        </button>
      </li>
      <li>
        <button className=" flex gap-1 cursor-pointer items-center hover:text-blue-500">
          <MdOutlinePostAdd fontSize={"1rem"} />
          <span>
            <Link
              to={`/admin/user/post/${ele?.author?._id}`}
              className="font-semibold"
            >
              User Posts
            </Link>
          </span>
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

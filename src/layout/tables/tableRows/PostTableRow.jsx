import React, { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaRegEye } from "react-icons/fa";
import {
  MdOutlinePublishedWithChanges,
  MdOutlineUnpublished,
} from "react-icons/md";
import AxiosInt from "../../../services/api/api";
import { useNavigate } from "react-router-dom";
import { toDateString } from "../../../utils/utils";
import { toast } from "react-toastify";
// style
import cl from "classnames";
import { useUserStore, useDataStore } from "../../../services/store/store.js";
const PostTableRow = ({ ele, setFetch = "" }) => {
  const navigate = useNavigate();
  const { user } = useUserStore();
  const { setRefetch } = useDataStore();
  const [isAdmin, setIsAdmin] = useState(user?.roles?.includes("admin"));

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
  const handleViewPost = (e) => {
    navigate(`/admin/viewPost/${e}`);
  };

  return (
    <tr key={ele._id}>
      <td>{ele?._id?.slice(0, 5) + "...."}</td>
      <td>{ele.title.substring(0, 20)}...</td>
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
      <td className={cl("flex gap-3")}>
        {isAdmin ? (
          <button
            onClick={() => handlePublishClick(ele)}
            className="hover:scale-125  transition-transform"
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
        ) : (
          ""
        )}

        {isAdmin ? (
          <button
            className="hover:scale-125 transition-all"
            onClick={() => handleViewPost(ele?._id)}
          >
            <span>
              <FaRegEye color="indigo" fontSize={"1.4rem"} />
            </span>
          </button>
        ) : (
          <button className="hover:scale-125 transition-all">
            <span>
              <FaRegEdit color="indigo" fontSize={"1.4rem"} />
            </span>
          </button>
        )}

        <button
          className="hover:scale-110 transition-all"
          onClick={() => {
            handleDelete(ele._id);
          }}
        >
          <span>
            <RiDeleteBin6Fill color="crimson" fontSize={"1.4rem"} />
          </span>
        </button>
      </td>
    </tr>
  );
};

export default PostTableRow;

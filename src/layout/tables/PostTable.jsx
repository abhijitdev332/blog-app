import React, { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaRegEye } from "react-icons/fa";
import {
  MdOutlinePublishedWithChanges,
  MdOutlineUnpublished,
} from "react-icons/md";
import AxiosInt from "../../services/api/api";
import {
  useUserStore,
  useDataStore,
  useLoaderStore,
} from "../../services/store/store";
import { useNavigate } from "react-router-dom";
import { toDateString } from "../../utils/utils";
import { toast } from "react-toastify";
// style
import cl from "classnames";
import style from "./table.module.scss";
const PostTable = () => {
  const navigate = useNavigate();
  const [userPosts, setUserPosts] = useState([]);
  const { user } = useUserStore();
  const { setRefetch } = useDataStore();
  const { setLoading, removeLoading } = useLoaderStore();
  const [isAdmin, setIsAdmin] = useState(user?.roles?.includes("admin"));
  const getUserPosts = async (sig) => {
    try {
      setLoading();
      const res = await AxiosInt.get(`/post/user/${user._id}`, { signal: sig });
      if (res.status == 200) {
        setUserPosts(res.data?.data);
      }
    } catch (err) {
      setUserPosts([]);
      toast.error("Something went wrong");
    } finally {
      removeLoading();
    }
  };
  const getAdminPosts = async (sig) => {
    try {
      setLoading();
      const res = await AxiosInt.get(`/admin/posts`, { signal: sig });
      if (res.status == 200) {
        setUserPosts(res.data?.data);
      }
    } catch (err) {
      setUserPosts([]);
      toast.error("something went wrong!!");
    } finally {
      removeLoading();
    }
  };
  const handlePublishClick = async (e) => {
    try {
      if (e?.status == "published" && isAdmin) {
        let res = await AxiosInt.put(`/admin/post/${e?._id}`, {
          status: "archived",
        });
        if (res.status == 200) {
          getAdminPosts();
          setRefetch();
          toast.success("update Successfull");
        }
      } else if (isAdmin) {
        let res = await AxiosInt.put(`/admin/post/${e?._id}`, {
          status: "published",
        });
        if (res.status == 200) {
          getAdminPosts();
          setRefetch();
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
        getAdminPosts();
        setRefetch();
        toast.success("Delete Successfull");
      }
    } catch (err) {
      toast.error("something went wrong!!");
    }
  };
  const handleViewPost = (e) => {
    navigate(`/admin/viewPost/${e}`);
  };

  useEffect(() => {
    let abortCon = new AbortController();
    setIsAdmin(user?.roles?.includes("admin"));
    if (isAdmin) {
      getAdminPosts(abortCon.signal);
    } else {
      getUserPosts(abortCon.signal);
    }
    return () => abortCon.abort();
  }, [user]);
  return (
    <div className={style.table__wrapper}>
      <div className="lg:container lg:mx-auto p-5">
        <table className={style.table}>
          <thead>
            <td>Sl No. </td>
            <td>Title</td>
            <td>Author </td>
            <td>Status</td>
            <td>Created</td>
            <td>Actions</td>
          </thead>
          <tbody>
            {userPosts?.map((ele, index) => (
              <tr key={ele._id} className={cl(style.item)}>
                <td>{index + 1}</td>
                <td>{ele.title.substring(0, 20)}...</td>
                <td>{ele?.author?.username}</td>
                <td>{ele?.status}</td>
                <td>{toDateString(ele?.createdAt)}</td>
                <td className={cl("flex gap-3")}>
                  {isAdmin ? (
                    <button
                      onClick={() => handlePublishClick(ele)}
                      className="hover:scale-125  transition-transform"
                    >
                      {ele?.status == "published" ? (
                        <MdOutlineUnpublished
                          fontSize={"1.3rem"}
                          color="orange"
                        />
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PostTable;

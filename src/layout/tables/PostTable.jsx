import React, { useEffect, useState } from "react";
import AxiosInt from "../../services/api/api";
import { useUserStore, useLoaderStore } from "../../services/store/store";
import { toast } from "react-toastify";
import Pagination from "./Pagination";
// style
import cl from "classnames";
import style from "./table.module.scss";
import { PostTableRow } from "./tableRows/rows";
const PostTable = () => {
  const [userPosts, setUserPosts] = useState([]);
  const [fetch, setFetch] = useState(false);
  const { user } = useUserStore();
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
  const handleFetch = () => {
    setFetch(!fetch);
  };

  useEffect(() => {
    let abortCon = new AbortController();
    setIsAdmin(user?.roles?.includes("admin"));
    if (isAdmin) {
      getAdminPosts(abortCon.signal);
    } else {
      getUserPosts(abortCon.signal);
    }
    return () => {
      abortCon.abort();
    };
  }, [user, fetch]);
  return (
    <div className={style.table__container}>
      <div className="lg:container lg:mx-auto p-5 h-full">
        <div className={style.table__wrapper}>
          <table className={style.table}>
            <thead>
              <td>Post ID</td>
              <td>Title</td>
              <td>Author </td>
              <td>Status</td>
              <td>Created</td>
              <td>Actions</td>
            </thead>
            <tbody>
              {userPosts?.length > 0 ? (
                userPosts?.map((ele) => (
                  <PostTableRow ele={ele} setFetch={handleFetch} />
                ))
              ) : (
                <h2>No post exist</h2>
              )}
            </tbody>
          </table>
          <Pagination />
        </div>
      </div>
    </div>
  );
};

export default PostTable;

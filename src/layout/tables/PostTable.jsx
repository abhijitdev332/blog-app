import React, { useEffect, useState } from "react";
import AxiosInt from "../../services/api/api";
import { BiSort } from "react-icons/bi";
import { useUserStore, useLoaderStore } from "../../services/store/store";
import { toast } from "react-toastify";
import Pagination from "./Pagination";
// style
import cl from "classnames";
import style from "./table.module.scss";
import { PostTableRow } from "./tableRows/rows";
const PostTable = () => {
  const [userPosts, setUserPosts] = useState([]);
  const [currentPosts, setCurrentPosts] = useState([]);
  const [fetch, setFetch] = useState(false);
  const { user } = useUserStore();
  const [sorted, setSorted] = useState(false);
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
  const sortAuthor = () => {
    let sortedData = [];
    if (sorted) {
      sortedData = userPosts?.toSorted((a, b) =>
        a?.author?.username > b?.author?.username
          ? -1
          : b?.author?.username > a?.author?.username
          ? 1
          : 0
      );
      setUserPosts(sortedData);
      setSorted(!sorted);
      return;
    }
    sortedData = userPosts?.toSorted((a, b) =>
      b?.author?.username > a?.author?.username
        ? -1
        : a?.author?.username > b?.author?.username
        ? 1
        : 0
    );
    setUserPosts(sortedData);
    setSorted(!sorted);
  };
  const sortStatus = () => {
    let sortedData = [];
    if (sorted) {
      sortedData = userPosts?.toSorted((a, b) =>
        a?.status > b?.status ? -1 : b?.status > a?.status ? 1 : 0
      );
      setUserPosts(sortedData);
      setSorted(!sorted);
      return;
    }
    sortedData = userPosts?.toSorted((a, b) =>
      b?.status > a?.status ? -1 : a?.status > b?.status ? 1 : 0
    );
    setUserPosts(sortedData);
    setSorted(!sorted);
  };
  const sortCreatedDate = () => {
    let sortedData = [];
    if (sorted) {
      sortedData = userPosts?.toSorted((a, b) =>
        a?.createdAt > b?.createdAt ? -1 : b?.createdAt > a?.createdAt ? 1 : 0
      );
      setUserPosts(sortedData);
      setSorted(!sorted);
      return;
    }
    sortedData = userPosts?.toSorted((a, b) =>
      b?.createdAt > a?.createdAt ? -1 : a?.createdAt > b?.createdAt ? 1 : 0
    );
    setUserPosts(sortedData);
    setSorted(!sorted);
  };
  const handleCurrentPost = (data) => {
    setCurrentPosts(data);
  };
  console.log(currentPosts);
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
      <div className="lg:container lg:mx-auto p-2 sm:p-4 h-full">
        <div className={style.table__wrapper}>
          <table className={style.table}>
            <thead>
              <td>
                <input
                  type="checkbox"
                  name="check"
                  className={style.checkbox}
                />
              </td>
              <td>Post Title</td>
              <td>
                <div
                  className="inline-flex items-center gap-1"
                  onClick={() => {
                    sortAuthor();
                  }}
                >
                  <span>Posted By</span>
                  <span>
                    <BiSort />
                  </span>
                </div>
              </td>
              <td>
                <div
                  className="inline-flex items-center gap-1"
                  onClick={() => {
                    sortStatus();
                  }}
                >
                  <span>Post Status</span>
                  <span>
                    <BiSort />
                  </span>
                </div>
              </td>
              <td>
                <div
                  className="inline-flex items-center gap-1"
                  onClick={() => {
                    sortCreatedDate();
                  }}
                >
                  <span>Created Date</span>
                  <span>
                    <BiSort />
                  </span>
                </div>
              </td>
              <td>Actions</td>
            </thead>
            <tbody>
              {currentPosts?.length > 0 ? (
                currentPosts?.map((ele) => (
                  <PostTableRow ele={ele} setFetch={handleFetch} />
                ))
              ) : (
                <h2>No post exist</h2>
              )}
            </tbody>
          </table>
          <Pagination
            posts={userPosts}
            setCurrent={handleCurrentPost}
            itemsPerPage={5}
          />
        </div>
      </div>
    </div>
  );
};

export default PostTable;

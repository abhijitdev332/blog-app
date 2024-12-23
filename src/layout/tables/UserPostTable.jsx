import React, { useEffect, useState } from "react";
import { useUserStore } from "../../services/store/store";
import { useParams } from "react-router-dom";
import AxiosInt from "../../services/api/api";
import Pagination from "./Pagination";
import { toast } from "react-toastify";
import PostTableRow from "./tableRows/PostTableRow";
// style
import style from "./table.module.scss";
import { BiSort } from "react-icons/bi";
const UserPostTable = () => {
  const { id } = useParams();
  const [userPosts, setUserPosts] = useState([]);
  const [currentPosts, setCurrentPosts] = useState([]);
  const { user } = useUserStore();
  const [fetch, setFetch] = useState(false);
  const [sorted, setSorted] = useState(false);
  const [isAdmin, setIsAdmin] = useState(user?.roles?.includes("admin"));
  const getUserPosts = async (sig = "") => {
    try {
      const res = await AxiosInt.get(`/post/user/${id}`, { signal: sig });
      if (res.status == 200) {
        setUserPosts(res.data?.data);
      }
    } catch (err) {
      setUserPosts([]);
      toast.error(err?.response?.data?.msg);
    }
  };
  const handleFetch = () => {
    setFetch(!fetch);
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
  const handleCurrentPost = (data) => {
    setCurrentPosts(data);
  };
  useEffect(() => {
    let abortCon = new AbortController();
    setIsAdmin(user?.roles?.includes("admin"));
    if (isAdmin) {
      getUserPosts(abortCon.signalsig);
    }
    return () => abortCon.abort();
  }, [id, fetch]);

  return (
    <div className={style.table__container}>
      <div className="lg:container lg:mx-auto p-5 h-full">
        <div className={style.table__wrapper}>
          <table className={style.table}>
            <thead>
              <td>
                <input type="checkbox" className={style.checkbox} />
              </td>
              <td>Post Title</td>
              <td>Post Author </td>
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
              <td>Post Actions</td>
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

export default UserPostTable;

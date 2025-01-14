import React, { useEffect, useState } from "react";
import AxiosInt from "../../services/api/api";
import { BiSort } from "react-icons/bi";
import { useLoaderStore, useUserStore } from "../../services/store/store";
import { toast } from "react-toastify";
import Pagination from "./Pagination";
// style
import cl from "classnames";
import style from "./table.module.scss";
import { PostTableRow } from "./tableRows/rows";
import Actions from "./hoverActions/Actions";

const PostTable = () => {
  const [userPosts, setUserPosts] = useState([]);
  const [currentPosts, setCurrentPosts] = useState([]);
  const [fetch, setFetch] = useState(false);
  const { user } = useUserStore();
  const { setLoading, removeLoading } = useLoaderStore();
  const [sorted, setSorted] = useState(false);
  const [isAdmin, setIsAdmin] = useState(user?.roles?.includes("admin"));
  const [checked, setChecked] = useState(false);
  const [checkedArr, setCheckArr] = useState([]);
  const getUserPosts = async (sig) => {
    try {
      setLoading();
      const res = await AxiosInt.get(`/post/user/${user._id}`, { signal: sig });
      if (res.status == 200) {
        setUserPosts(res.data?.data);
      }
    } catch (err) {
      setUserPosts([]);
      toast.error(err?.response?.data?.msg);
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
      toast.error(err?.response?.data?.msg);
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
      sortedData = currentPosts?.toSorted((a, b) =>
        a?.author?.username > b?.author?.username
          ? -1
          : b?.author?.username > a?.author?.username
          ? 1
          : 0
      );
      setCurrentPosts(sortedData);
      setSorted(!sorted);
      return;
    }
    sortedData = currentPosts?.toSorted((a, b) =>
      b?.author?.username > a?.author?.username
        ? -1
        : a?.author?.username > b?.author?.username
        ? 1
        : 0
    );
    setCurrentPosts(sortedData);
    setSorted(!sorted);
  };
  const sortStatus = () => {
    let sortedData = [];
    if (sorted) {
      sortedData = currentPosts?.toSorted((a, b) =>
        a?.status > b?.status ? -1 : b?.status > a?.status ? 1 : 0
      );
      setCurrentPosts(sortedData);
      setSorted(!sorted);
      return;
    }
    sortedData = currentPosts?.toSorted((a, b) =>
      b?.status > a?.status ? -1 : a?.status > b?.status ? 1 : 0
    );
    setCurrentPosts(sortedData);
    setSorted(!sorted);
  };
  const sortCreatedDate = () => {
    let sortedData = [];
    if (sorted) {
      sortedData = currentPosts?.toSorted((a, b) =>
        a?.createdAt > b?.createdAt ? -1 : b?.createdAt > a?.createdAt ? 1 : 0
      );
      setCurrentPosts(sortedData);
      setSorted(!sorted);
      return;
    }
    sortedData = currentPosts?.toSorted((a, b) =>
      b?.createdAt > a?.createdAt ? -1 : a?.createdAt > b?.createdAt ? 1 : 0
    );
    setCurrentPosts(sortedData);
    setSorted(!sorted);
  };
  const handleCurrentPost = (data) => {
    setCurrentPosts(data);
  };
  useEffect(() => {
    if (checked) {
      setCheckArr(currentPosts?.map((ele) => ele?._id));
    } else {
      setCheckArr([]);
    }
  }, [checked]);
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
            <thead className="bg-slate-200">
              <td>
                <div className="grid place-items-center">
                  <input
                    type="checkbox"
                    name="check"
                    className={style.checkbox}
                    checked={checked}
                    onChange={(e) => {
                      setChecked(e.target.checked);
                    }}
                  />
                </div>
              </td>
              <td>Post Title</td>
              <td>
                <div
                  className="inline-flex items-center"
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
                  className="inline-flex items-center"
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
                  className="inline-flex items-center"
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
                  <PostTableRow
                    ele={ele}
                    setFetch={handleFetch}
                    allCheck={checked}
                    setCheckArr={setCheckArr}
                  />
                ))
              ) : (
                <h2 className="p-5 font-semibold text-lg">No post exist!!</h2>
              )}
            </tbody>
          </table>
          <Actions
            checkedArr={checkedArr}
            setCheckArr={setCheckArr}
            setFetch={setFetch}
          />
          <Pagination
            posts={userPosts}
            setCurrent={handleCurrentPost}
            perPage={5}
          />
        </div>
      </div>
    </div>
  );
};

export default PostTable;

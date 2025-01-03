import React, { useEffect, useState } from "react";
import { Link, ScrollRestoration, useParams } from "react-router-dom";
import style from "./singlePost.module.scss";
import cl from "classnames";
import { Chip, PostList } from "../components";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa6";
import useFetchData from "../../hooks/useFetchData";
import useParallelFetch from "../../hooks/useParallelFetch";
import { toDateString } from "../../utils/utils";
import { useLoaderStore, useUserStore } from "../../services/store/store";
import AddComment from "./addComment/AddComment";
import { ImBin2 } from "react-icons/im";
import AxiosInt from "../../services/api/api";
import { toast } from "react-toastify";
import { LuLoaderCircle } from "react-icons/lu";
const APPURL = import.meta.env.VITE_REACT_APP_APP_URL;

const icons = [
  {
    id: 1,
    url: `https://wa.me/?text=${APPURL}`,
    icon: <IoLogoWhatsapp />,
  },
  {
    id: 2,
    url: `https://twitter.com/intent/tweet?url=${APPURL}&text=blog%20app`,
    icon: <FaXTwitter />,
  },
  {
    id: 3,
    url: `https://www.facebook.com/sharer/sharer.php?u=${APPURL}`,
    icon: <FaFacebook />,
  },
];
const SinglePost = () => {
  const { id } = useParams();
  // const fetchFunctions = [
  //   () => useFetchData(`/post/${id}`).then((res) => res.data),
  //   () => useFetchData(`/post/related/${id}`).then((res) => res.data),
  // ];
  // const { data } = useParallelFetch(fetchFunctions);
  const { data } = useFetchData(`/post/${id}`);
  const { data: relatedData } = useFetchData(`/post/related/${id}`);
  const { setLoading, removeLoading } = useLoaderStore();
  const [post, setPost] = useState(null);
  const [related, setRelated] = useState([]);
  const [postComments, setPostComments] = useState([]);
  const handleCommentAdd = (comment) => {
    setPostComments((prev) => [{ ...comment }, ...prev]);
  };
  const handleCommentDelete = (commentId) => {
    setPostComments((prev) => [
      ...prev?.filter((ele) => ele?._id !== commentId),
    ]);
  };

  useEffect(() => {
    setPost(data);
    setPostComments(data?.comments?.toReversed());
    setRelated(relatedData);
  }, [id, data, relatedData]);
  useEffect(() => {
    if (!data) {
      setLoading();
    } else {
      removeLoading();
    }
  }, [data]);
  if (post == null || post?.status !== "published") {
    return (
      <h3 className="font-medium text-lg text-center">No Post Found !!</h3>
    );
  }
  return (
    <>
      <ScrollRestoration />
      <div className={cl(style.post)}>
        <div className="wrapper">
          <div className="lg:container flex gap-4 lg:mx-auto p-5">
            <div className="md:basis-4/6 flex flex-col gap-3 md:p-5">
              <div className="title__wrapper flex flex-col gap-2">
                <h2 className=" text-lg md:text-3xl robo font-bold ">
                  {post.title}
                </h2>
                <div className="tags flex gap-7 items-center">
                  <div className="tag__group flex gap-3">
                    {post.tags.map((ele) => (
                      <Chip title={ele} />
                    ))}
                  </div>
                  <div className="share__group flex gap-3">
                    {icons.map((ele) => (
                      <span
                        key={ele.id}
                        className="text-2xl cursor-pointer hover:scale-125 hover:text-indigo-600 transition-transform "
                      >
                        <Link to={ele.url} target="_blank">
                          {ele.icon}
                        </Link>
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-sm flex gap-1 text-slate-400 pt-2 font-medium">
                  <span className="robo">{toDateString(post?.createdAt)}</span>
                  &diams;
                  <span className="robo">{post?.author?.username}</span>
                </p>
              </div>
              <div className={cl(style.img)}>
                <img src={post?.imageUrl} alt="post_image" />
              </div>
              <div
                className="content__wrapper p-6 list-disc unset"
                dangerouslySetInnerHTML={{
                  __html: post?.content,
                }}
              />
              <div className="flex flex-col  border-black">
                <h2 className="text-lg font-semibold py-3 border-b-2 border-black">
                  Comments:
                </h2>
                <AddComment postId={post?._id} addComment={handleCommentAdd} />
                <div className="flex-col">
                  {postComments?.map((com) => (
                    <Comment
                      com={com}
                      postId={post?._id}
                      deleteComment={handleCommentDelete}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div
              className={cl(
                "md:basis-2/6 hidden md:flex flex-col",
                style.list__wrapper
              )}
            >
              <PostList posts={related} title="Related Posts" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Comment = ({ com, postId, deleteComment }) => {
  const { user } = useUserStore();
  const [isAdmin, setAdmin] = useState(user?.roles?.includes("admin") || false);
  const [loading, setLoading] = useState(false);
  const handleCommentClick = async () => {
    try {
      setLoading(true);
      let res = await AxiosInt.delete(
        `/post/comment/${com?._id}?postId=${postId}`
      );
      if (res.status == 200) {
        deleteComment(com?._id);
        toast.success(res.data?.msg);
      }
    } catch (err) {
      toast.error(err?.response?.data?.msg || "failed to delete comment");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    setAdmin(user?.roles?.includes("admin"));
  }, [user]);
  return (
    <div className="flex py-3 gap-2">
      {/* img */}
      <div className="text-slate-200 bg-slate-800 rounded-full w-8 h-8 flex justify-center items-center">
        <span className="font-bold text-lg">
          {com?.user?.username?.charAt(0)}
        </span>
      </div>

      <p className="flex flex-col gap-1">
        <span className="text-sm leading-loose text-slate-600">
          {com?.user?.username} &diams;
          {toDateString(com?.createdAt)}
        </span>

        <span className="font-medium text-md">{com?.text}</span>
      </p>

      {(user?._id == com?.user?._id || isAdmin) && (
        <div
          className="flex gap-1 justify-center items-center p-1 rounded-md cursor-pointer"
          onClick={handleCommentClick}
        >
          {loading && (
            <span>
              <LuLoaderCircle
                fontSize={"1.4rem"}
                color="#000"
                className="animate-spin"
              />
            </span>
          )}
          <span className="hover:animate-pulse">
            <ImBin2 fontSize={"1.5rem"} color="crimson" />
          </span>
        </div>
      )}
    </div>
  );
};

export default SinglePost;

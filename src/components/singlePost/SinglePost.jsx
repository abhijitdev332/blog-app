import React, { useEffect, useState } from "react";
import { Link, ScrollRestoration, useParams } from "react-router-dom";
import style from "./singlePost.module.scss";
import cl from "classnames";
import { Chip, PostList } from "../components";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa6";
import useFetchData from "../../hooks/useFetchData";
import { toDateString } from "../../utils/utils";
import { useLoaderStore } from "../../services/store/store";
import AddComment from "./addComment/AddComment";
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
  const [reFetch, setRefetch] = useState(false);
  const { data } = useFetchData(`/post/${id}`, reFetch);
  const { data: relatedData } = useFetchData(`/post/related/${id}`);
  const { setLoading, removeLoading } = useLoaderStore();
  const [post, setPost] = useState(null);
  const [related, setRelated] = useState([]);
  useEffect(() => {
    setPost(data);
    setRelated(relatedData);
  }, [id, data, relatedData]);
  useEffect(() => {
    if (!post) {
      setLoading();
    } else {
      removeLoading();
    }
  }, [post]);

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
                className="content__wrapper p-6 list-disc"
                dangerouslySetInnerHTML={{
                  __html: post?.content,
                }}
              />
              <div className="flex flex-col  border-black">
                <h2 className="text-lg font-semibold py-3 border-b-2 border-black">
                  Comments:
                </h2>
                <AddComment postId={post?._id} setRefetch={setRefetch} />
                <div className="flex-col">
                  {post?.comments?.map((com) => {
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

                          <span className="font-medium text-md">
                            {com?.text}
                          </span>
                        </p>
                      </div>
                    );
                  })}
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

export default SinglePost;

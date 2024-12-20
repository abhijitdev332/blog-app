import React, { useEffect, useState } from "react";
import { ScrollRestoration, useParams } from "react-router-dom";
import style from "./singlePost.module.scss";
import cl from "classnames";
import { Chip, PostList } from "../components";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa6";
import useFetchData from "../../hooks/useFetchData";
import { toDateString } from "../../utils/utils";
import { useLoaderStore } from "../../services/store/store";
const icons = [
  {
    id: 1,
    icon: <IoLogoWhatsapp />,
  },
  {
    id: 2,
    icon: <FaXTwitter />,
  },
  {
    id: 3,
    icon: <FaFacebook />,
  },
];
const SinglePost = () => {
  const { id } = useParams();
  const { data, loading, err } = useFetchData(`/post/${id}`);
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
    return <h3>No Post Found</h3>;
  }

  console.log(post?.content);
  return (
    <>
      <ScrollRestoration />
      <div className={cl(style.post)}>
        <div className="wrapper">
          <div className="lg:container flex gap-4 lg:mx-auto p-5">
            <div className="md:basis-4/6 flex flex-col gap-3 md:p-5">
              <div className="title__wrapper flex flex-col gap-2">
                <h2 className=" text-lg md:text-3xl font-bold robo">
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
                      <span className="text-2xl cursor-pointer hover:scale-125 hover:text-indigo-600 transition-transform ">
                        {ele.icon}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-sm flex gap-1 text-slate-400 pt-2 pop">
                  <span>{toDateString(post?.createdAt)}</span>
                  &diams;
                  <span>{post?.author?.username}</span>
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

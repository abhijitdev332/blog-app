import React, { useEffect, useState } from "react";
import { ScrollRestoration, useParams } from "react-router-dom";
import useFetchData from "../../hooks/useFetchData";
import cl from "classnames";
import style from "./view.module.scss";
import { Chip } from "../../components/components";
import { toDateString } from "../../utils/utils";
import useLoaderStore from "../../services/store/useLoaderStore";

const ViewPost = () => {
  const { id } = useParams();
  const { setLoading, removeLoading } = useLoaderStore();
  const { data } = useFetchData(`/post/${id}`);
  const [post, setPost] = useState(null);
  useEffect(() => {
    setPost(data);
  }, [data]);

  useEffect(() => {
    !post ? setLoading() : removeLoading();
  }, [post]);
  return (
    <>
      <ScrollRestoration />
      <div className={cl(style.post)}>
        <div className="wrapper">
          <div className="lg:container flex gap-4 lg:mx-auto p-5">
            <div className="w-full flex flex-col gap-3 p-5">
              <div className="title__wrapper flex flex-col gap-2">
                <h2 className="text-2xl font-bold">{post?.title}</h2>
                <div className="tags flex gap-7 items-center">
                  <div className="tag__group flex gap-3">
                    {post?.tags?.map((ele) => (
                      <Chip title={ele} />
                    ))}
                  </div>
                </div>
                <p className="text-sm flex gap-1 text-slate-400 font-medium robo">
                  <span>{toDateString(post?.createdAt)}</span> &diams;
                  <span>{post?.author?.username}</span>
                </p>
              </div>
              <div className={cl(style.img)}>
                <img src={post?.imageUrl} alt="post_image" />
              </div>
              <div
                className="content__wrapper p-6 unset"
                dangerouslySetInnerHTML={{ __html: post?.content }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewPost;

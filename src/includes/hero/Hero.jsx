import React, { useEffect, useState } from "react";
import cl from "classnames";
import Skeleton from "react-loading-skeleton";
import style from "./hero.module.scss";
import Chip from "../../components/chip/Chip";
import { Link } from "react-router-dom";
import { toDateString } from "../../utils/utils";
import useFetchData from "../../hooks/useFetchData";
const Slider = () => {
  const { data, loading } = useFetchData("/post/trending");
  const [post, setPost] = useState([]);
  useEffect(() => {
    let fillterData = data?.length > 0 ? data[0] : [];
    setPost(fillterData);
  }, [data]);
  if (!post || post.length < 0) {
    return <h2>No trending post</h2>;
  }

  return (
    <div className={style.hero}>
      <div className={cl("lg:container lg:mx-auto", style.hero__wrapper)}>
        <h2 className={cl(style.hero__title)}>Hot Topics</h2>
        <div className="flex flex-col md:flex-row justify-center gap-5 p-3 md:p-5">
          {!post || post?.length <= 0 ? (
            <Skeleton />
          ) : (
            <Link
              to={`/post/${post?._id}`}
              className={cl(style.hero__link, "lg:basis-2/4")}
              key={post.id}
              style={{ background: `url(${post?.imageUrl})` }}
            >
              <img src={post?.imageUrl} alt="post image" />
            </Link>
          )}

          <div className={cl("summary lg:basis-1/4 flex flex-col px-5")}>
            <div
              className={cl("flex gap-1 text-[13px] items-center font-medium")}
            >
              <span className="robo">
                {(
                  <Link
                    to={`/user/${post?.author?._id}`}
                    className="cursor-pointer"
                  >
                    {post?.author?.username}
                  </Link>
                ) || <Skeleton />}
              </span>
              {post.author?.username && <span>&diams;</span>}

              <span className="robo">
                {toDateString(post?.createdAt) || <Skeleton />}
              </span>
            </div>
            <div className="text-pretty font-bold text-lg">
              <h3 className={cl("py-3 sm:text-2xl robo")}>{post.title}</h3>
            </div>
            <span className="font-semibold">
              <div
                className="text-sm"
                dangerouslySetInnerHTML={{
                  __html: post?.content?.substring(0, 70).trim(""),
                }}
              ></div>
              {!post || post.length <= 0 ? (
                <Skeleton />
              ) : (
                <Link to={`/post/${post?._id}`}>Read More ...</Link>
              )}
            </span>
            <div className="flex gap-2 py-4 ">
              {post.tags?.map((ele) => <Chip title={ele} />) || <Skeleton />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;

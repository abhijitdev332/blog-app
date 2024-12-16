import React, { useEffect, useState } from "react";
import useFetchData from "../../hooks/useFetchData";
import cl from "classnames";
import style from "./hero.module.scss";
import Chip from "../../components/chip/Chip";
import { Link } from "react-router-dom";
import AxiosInt from "../../services/api/api";
import { toast } from "react-toastify";
import { toDateString } from "../../utils/utils";
const Slider = () => {
  const { data, loading } = useFetchData("/post/trending");
  const [post, setPost] = useState([]);
  // const getTrending = async () => {
  //   const res = await AxiosInt.get("/post/trending");
  //   if (res.status == 200) {
  //     setPost(res.data?.data[0]);
  //   } else {
  //     setPost([]);
  //     toast.warning("Can't get trending post");
  //   }
  // };
  useEffect(() => {
    // if (!post||post.length > 0) {
    //   return;
    // }
    let fillterData = data?.length > 0 ? data[0] : [];
    setPost(fillterData);
  }, [data]);
  if (!post || post.length < 0) {
    return <h2>No trending post</h2>;
  }

  return (
    <div className="slider">
      <div className="slider__wrapper lg:container lg:mx-auto">
        <h2 className={style.hero__title}>Hot Topics</h2>
        <div className="flex flex-col md:flex-row gap-3 p-5 md:p-7">
          {!post || post?.length <= 0 ? (
            ""
          ) : (
            <Link
              to={`/post/${post?._id}`}
              className={cl(style.slideItem, "lg:basis-3/4")}
              key={post.id}
              style={{
                backgroundImage: `url(${post?.imageUrl}`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "100%",
                backgroundPosition: "top center",
              }}
            ></Link>
          )}

          <div className={cl("summary lg:basis-1/4 flex flex-col px-5")}>
            <div
              className={cl("flex gap-1 text-[13px] items-center", style.pop)}
            >
              <span>{post.author?.username}</span> &diams;
              <span>{toDateString(post?.createdAt)}</span>
            </div>
            <div className="text-pretty font-bold text-lg">
              <h3 className={cl("py-3 sm:text-2xl", style.robo)}>
                {post.title}
              </h3>
            </div>
            <span className="font-semibold">
              <div
                className="text-sm"
                dangerouslySetInnerHTML={{
                  __html: post?.content?.substring(0, 70).trim(""),
                }}
              ></div>
              {!post || post.length <= 0 ? (
                <p>No trending post</p>
              ) : (
                <Link to={`/post/${post?._id}`}>Read More ...</Link>
              )}
            </span>
            <div className="flex gap-2 py-4 ">
              {post.tags?.map((ele) => (
                <Chip title={ele} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;

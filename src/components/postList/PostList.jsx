import React, { useState } from "react";
import { Post } from "../components";
import style from "./postList.module.scss";
import cl from "classnames";
import { Pagination } from "../../layout/layouts.js";
const PostList = ({ title = "Latest Posts", posts }) => {
  const [currentPosts, setCurrentPost] = useState([]);
  const handleCurrentPost = (data) => {
    setCurrentPost([...data]);
  };
  return (
    <>
      <section className="lg:container lg:mx-auto p-3">
        <h2 className={style.hero__title}>{title}</h2>
        <div
          className={cl("justify-center md:justify-normal", style.post__list)}
        >
          {currentPosts?.length > 0 ? (
            currentPosts?.map((ele) => <Post post={ele} />)
          ) : (
            <h4>No Posts in here</h4>
          )}
        </div>
        <Pagination
          posts={posts}
          setCurrent={handleCurrentPost}
          perPage={7}
          style={"!bg-slate-200 my-7 !static"}
        />
      </section>
    </>
  );
};

export default PostList;

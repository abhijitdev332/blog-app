import React from "react";
import { Post } from "../components";
import style from "./postList.module.scss";
import cl from "classnames";
const PostList = ({ title = "Latest Posts", posts }) => {
  return (
    <>
      <section className="lg:container lg:mx-auto p-3">
        <h2 className={style.hero__title}>{title}</h2>
        <div
          className={cl("justify-center md:justify-normal", style.post__list)}
        >
          {posts?.length > 0 ? (
            posts?.map((ele) => <Post post={ele} />)
          ) : (
            <h4 className="py-5 text-center font-semibold text-lg">
              No Posts in here!!
            </h4>
          )}
        </div>
      </section>
    </>
  );
};

export default PostList;

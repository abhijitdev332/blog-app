import React from "react";
import cl from "classnames";
import style from "./post.module.scss";
import { Chip } from "../components";
import { Link } from "react-router-dom";
import { toDateString } from "../../utils/utils";

const Post = ({ post }) => {
  return (
    <div className={style.postCard}>
      <Link to={`/post/${post?._id}`}>
        <img src={post?.imageUrl} className={style.postImg} alt="post image" />
      </Link>
      <div className={cl("flex justify-center", style.postContent)}>
        <h3 className={style.title}>
          {post?.title?.substring(0, 35)}
          ...
        </h3>
        {/* <p className={style.content}>
          {post.content.substring(0, 20) + "...."}
        </p> */}
        <p className={style.author}>
          {post?.author?.username} &diams;
          {toDateString(post?.createdAt)}
        </p>
      </div>
      <div className="flex gap-2 px-3">
        {post?.tags?.map((ele) => (
          <Chip title={ele} />
        ))}
      </div>
    </div>
  );
};

export default Post;

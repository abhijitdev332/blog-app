import React from "react";
import Header from "../../includes/header/Header";
import { Outlet } from "react-router-dom";
import { Footer } from "../../includes/includes";
import cl from "classnames";
import style from "./post.module.scss";
const PostPage = () => {
  return (
    <div>
      <Header />

      <Outlet />

      <Footer />
    </div>
  );
};

export default PostPage;

import React from "react";
import Header from "../../includes/header/Header";
import { Outlet } from "react-router-dom";
import { Footer } from "../../includes/includes";
import cl from "classnames";
import style from "./post.module.scss";
import { DataLoader } from "../../layout/layouts";
const PostPage = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
      <DataLoader bg={"rgba(255, 255, 255, 0.361)"} />
    </div>
  );
};

export default PostPage;

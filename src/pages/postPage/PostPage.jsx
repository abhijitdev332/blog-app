import React from "react";
import Header from "../../includes/header/Header";
import { Outlet } from "react-router-dom";
import { Footer } from "../../includes/includes";
import { DataLoader } from "../../layout/layouts";
const PostPage = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
      <DataLoader />
    </div>
  );
};

export default PostPage;

import React from "react";
import Header from "../../includes/header/Header";
import { Outlet } from "react-router-dom";
import { Footer } from "../../includes/includes";
import { DataLoader } from "../../layout/layouts";
import useLoaderStore from "../../services/store/useLoaderStore";
import AxiosInt from "../../services/api/api";
const PostPage = () => {
  const { setLoading, removeLoading } = useLoaderStore();
  AxiosInt.interceptors.request.use((config) => {
    setLoading();
    return config;
  });
  AxiosInt.interceptors.response.use(
    (value) => {
      removeLoading();
      return value;
    },
    (error) => {
      removeLoading();
      return Promise.reject(error);
    }
  );
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

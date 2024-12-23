import React from "react";
import Header from "../../includes/header/Header";
import { Hero } from "../../includes/includes";
import { PostList } from "../../components/components";
import { ToastContainer } from "react-toastify";
import Footer from "../../includes/footer/Footer";
import { useDataStore, useLoaderStore } from "../../services/store/store";
import { DataLoader } from "../../layout/layouts";
import AxiosInt from "../../services/api/api";

const Home = () => {
  const { data } = useDataStore();
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
    <>
      <div className="bg-[#f8f8f8]">
        <Header />
        <Hero />
        <PostList posts={data} />
        <Footer />
      </div>
      <DataLoader />
      <ToastContainer />
    </>
  );
};

export default Home;

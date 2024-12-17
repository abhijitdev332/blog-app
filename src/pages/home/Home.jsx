import React, { useEffect } from "react";
import Header from "../../includes/header/Header";
import { Hero } from "../../includes/includes";
import { PostList } from "../../components/components";
import { ToastContainer } from "react-toastify";
import Footer from "../../includes/footer/Footer";
import {
  useDataStore,
  useLoaderStore,
  useTrendingData,
} from "../../services/store/store";
import { DataLoader } from "../../layout/layouts";

const Home = () => {
  const { data } = useDataStore();
  // const { status } = useLoaderStore();
  // const { post, setPost } = useTrendingData();
  // useEffect(() => {
  //   if (post) {
  //     console.log(post);
  //     return;
  //   }
  //   setPost();
  // }, []);

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

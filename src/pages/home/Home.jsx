import React from "react";
import Header from "../../includes/header/Header";
import { Hero } from "../../includes/includes";
import { PostList } from "../../components/components";
import { ToastContainer } from "react-toastify";
import Footer from "../../includes/footer/Footer";
import InitialData from "../../data/InitialData";
import { useDataStore } from "../../services/store/store";
const Home = () => {
  const { data } = useDataStore();
  return (
    <>
      <div className="bg-[#f8f8f8]">
        <Header />
        <Hero />
        <PostList posts={data} />
        <Footer />
      </div>
      <ToastContainer />
      <InitialData />
    </>
  );
};

export default Home;

import React, { useEffect, useState } from "react";
import Header from "../../includes/header/Header";
import { Hero } from "../../includes/includes";
import { PostList } from "../../components/components";
import { toast, ToastContainer } from "react-toastify";
import Footer from "../../includes/footer/Footer";
import { useDataStore } from "../../services/store/store";
import { DataLoader } from "../../layout/layouts";

// style
import style from "./home.module.scss";
import AxiosInt from "../../services/api/api";

const Home = () => {
  const { data, setData } = useDataStore();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const perPage = 5;

  // window scroll event
  const handleScroll = (e) => {
    if (
      document.body.scrollHeight - 500 <
      window.scrollY + window.innerHeight
    ) {
      setLoading(true);
    }
  };
  window.addEventListener("scroll", handleScroll);
  // fetch data
  const getData = async () => {
    try {
      const res = await AxiosInt.get(
        `/post?limit=${perPage}&skip=${perPage * (page - 1)}`
      );
      if (res.status == 200) {
        setData(res.data?.data);
      }
    } catch (err) {
      window.removeEventListener("scroll", handleScroll);
      setLoading(false);
      toast.error(err?.response?.data?.msg || "No Posts found!!");
      // toast("Please try after some times!!");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (loading) {
      setPage((prev) => prev + 1);
    }
  }, [loading]);
  useEffect(() => {
    if (page > 1) {
      setTimeout(() => {
        getData();
      }, 1000);
    }
  }, [page]);

  return (
    <>
      <div className="bg-[#f8f8f8]">
        <Header />
        <Hero />
        <PostList posts={data} />
        {/* loader */}
        {loading && (
          <div className="flex h-full justify-center items-center">
            <div className={style.loader}></div>
          </div>
        )}

        <Footer />
      </div>
      <DataLoader />
      <ToastContainer />
    </>
  );
};

export default Home;

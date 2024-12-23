import React from "react";
import { Link, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { DataLoader } from "../../layout/layouts";
import AxiosInt from "../../services/api/api";
import { useLoaderStore } from "../../services/store/store.js";
const Auth = () => {
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
      <div className="bg-slate-900 md:h-screen">
        <button className="fixed top-[20px] left-[15px] border-2 border-white text-white p-2 rounded">
          <Link to={"/"}>Go Back</Link>
        </button>
        <div className="flex lg:w-10/12 w-full mx-auto p-5 justify-center items-center h-full">
          <div className="card flex bg-slate-100 p-6  h-fit rounded-md  flex-col md:mx-7 md:flex-row">
            <div className="basis-1/2 order-2 md:order-1">
              <Outlet />
            </div>
            <div className="basis-1/2 order-1 md:order-2">
              <div className="img-wrapper h-full ">
                <img
                  src="/images/auth.jpg"
                  alt="auth_image"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <DataLoader />
      <ToastContainer />
    </>
  );
};

export default Auth;

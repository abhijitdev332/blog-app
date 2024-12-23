import React, { useState } from "react";
import { Sidebar } from "../../includes/includes.js";
import { Outlet } from "react-router-dom";
import { DashHeader } from "../../includes/includes.js";
import { ToastContainer } from "react-toastify";
import { DataLoader } from "../../layout/layouts.js";
import useLoaderStore from "../../services/store/useLoaderStore.js";
import AxiosInt from "../../services/api/api.js";

const Admin = () => {
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
      <div className="admin overflow-y-hidden">
        <div className="admin__wrapper flex">
          <Sidebar />
          <div className="flex flex-col w-full h-full">
            <DashHeader />
            <section className="w-full">
              {/* <button className="m-2 px-3 py-2  rounded-lg border-2 bg-slate-400">
                <Link to={-1}>
                  <span>Back</span>
                </Link>
              </button> */}
              <Outlet />
            </section>
          </div>
        </div>
      </div>
      <DataLoader bg={"rgba(255, 255, 255, 0.46)"} />
      <ToastContainer />
    </>
  );
};

export default Admin;

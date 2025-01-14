import React from "react";
import { Sidebar } from "../../includes/includes.js";
import { Outlet } from "react-router-dom";
import { DashHeader } from "../../includes/includes.js";
import { ToastContainer } from "react-toastify";
import { DataLoader } from "../../layout/layouts.js";

const Admin = () => {
  return (
    <>
      <div className="admin overflow-y-hidden">
        <div className="admin__wrapper flex">
          <Sidebar />
          <div className="flex flex-col w-full h-full">
            <DashHeader />
            <section className="w-full bg-[#f6f8ff]">
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

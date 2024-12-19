import React, { useState } from "react";
import { Sidebar } from "../../includes/includes.js";
import InitialData from "../../data/InitialData.jsx";

import { Link, Outlet } from "react-router-dom";
import { DashHeader } from "../../includes/includes.js";
import { ToastContainer } from "react-toastify";
import { DataLoader } from "../../layout/layouts.js";

const Admin = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  return (
    <>
      <div className="admin">
        <div className="admin__wrapper">
          <DashHeader />
          <div className="flex gap-2">
            <Sidebar show={showSidebar} />
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

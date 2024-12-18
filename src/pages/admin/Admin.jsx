import React, { useState } from "react";
import { Sidebar } from "../../includes/includes.js";
import { user } from "../../constants/constant";
import { Outlet } from "react-router-dom";
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

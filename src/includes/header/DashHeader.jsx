import React from "react";
import { Link } from "react-router-dom";
import { Logout } from "../../components/components";
// style
import cl from "classnames";
import style from "./header.module.scss";
const DashHeader = () => {
  return (
    <header className={cl(style.dash__header)}>
      <div className="header__wrapper lg:container lg:mx-auto p-2">
        <div className="flex justify-between">
          <div className="logo flex items-center">
            <Link
              to={"/admin"}
              className="py-3 px-2 text-2xl text-white roboto font-bold"
            >
              Dashbroad
            </Link>
          </div>
          <div className={cl(style.actions__btn, "flex gap-6")}>
            <Logout style={[style.logout, "bg-slate-100"]} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashHeader;

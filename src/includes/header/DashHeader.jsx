import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useUserStore } from "../../services/store/store";
import { Logout } from "../../components/components";
// style
import cl from "classnames";
import style from "./header.module.scss";
const DashHeader = () => {
  const { user } = useUserStore();
  const [isAdmin] = useState(user?.roles?.includes("admin"));
  return (
    <header className={cl(style.dash__header)}>
      <div className="header__wrapper lg:container lg:mx-auto p-2">
        <div className="flex justify-between">
          <div className="logo flex items-center">
            <Link to={"/"} className="py-3 px-2 text-2xl text-white font-bold">
              Blog App
            </Link>
          </div>
          {/* <div className="navigation hidden md:block">
            <div className="ham hidden"></div>
            <div className="navbar h-full">
              <div className="close hidden"></div>
              <ul className="h-full flex gap-4 items-center">
                {headerNav?.map((ele) => (
                  <li key={ele.id}>
                    <NavLink
                      to={ele.link}
                      className={cl(
                        "font-medium text-lg text-white hover:text-orange-500 transition-colors capitalize "
                      )}
                    >
                      {ele?.title}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div> */}

          {/* <div className={cl(style.actions__btn, "flex gap-6")}>
            <button className={cl(style.add)}>
              <Link to={"/admin/addpost"}>Add Post</Link>
            </button>
            {isAdmin && (
              <button className={cl(style.user)}>
                <Link to={"/admin/users"}>View Users</Link>
              </button>
            )}

            <button className={cl(style.view)}>
              <Link to={"/admin"}>View Posts</Link>
            </button>

            <Logout style={[style.logout, "bg-slate-100"]} />
          </div> */}
          <div className={cl(style.actions__btn, "flex gap-6")}>
            <Logout style={[style.logout, "bg-slate-100"]} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashHeader;

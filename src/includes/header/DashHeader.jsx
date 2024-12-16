import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import cl from "classnames";
import style from "./header.module.scss";
import AxiosInt from "../../services/api/api";
import { useUserStore } from "../../services/store/store";
import { toast } from "react-toastify";
const DashHeader = () => {
  const navigate = useNavigate();
  const { user, removeUser } = useUserStore();
  const [isAdmin, setIsAdmin] = useState(user?.roles?.includes("admin"));
  const handleLogout = async () => {
    const res = await AxiosInt.post("/auth/logout");
    if (res.status == 200) {
      toast.success("you are successfully logout");
      removeUser();
      navigate("/", { replace: true });
    } else {
      toast.error("something went wrong please try again");
    }
  };
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

          <div className={cl(style.actions__btn, "flex gap-6")}>
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

            <button
              className={cl(style.logout, "bg-slate-100")}
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashHeader;

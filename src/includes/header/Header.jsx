import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { useUserStore, useDataStore } from "../../services/store/store";
import { toast } from "react-toastify";
import { Logout } from "../../components/components";
// style
import cl from "classnames";
import style from "./header.module.scss";
const Header = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user } = useUserStore();
  const { setRefetch } = useDataStore();
  const [searchInput, setSearchInput] = useState("");
  const handleSearch = async () => {
    if (searchInput.trim() == "") {
      setRefetch();
      return toast.info("Plese enter topic to search");
    }
    navigate(`/post/search/${searchInput}`);
  };
  return (
    <header className={cl(style.header)}>
      <div className="header__wrapper lg:container lg:mx-auto px-4 py-3">
        <div className="flex justify-between md:justify-normal md:gap-4">
          <div className="logo md:basis-1/4 flex items-center">
            <Link
              to={"/"}
              className={style.header__logo}
              onClick={() => {
                setSearchInput("");
              }}
            >
              Blog Now
            </Link>
          </div>
          <div className="navigation  md:basis-2/4 justify-end items-center flex px-3">
            <div className="navbar h-full">
              <div className="close hidden"></div>
              <ul className="h-full flex gap-4 items-center">
                <div className=" hidden md:block search ">
                  <label
                    htmlFor=""
                    className="flex gap-1 border-2 border-slate-500 p-1 rounded"
                  >
                    <input
                      type="text"
                      className="bg-transparent outline-none robo"
                      placeholder="Search topic"
                      value={searchInput}
                      onKeyDown={(e) => {
                        if (e.key == "Enter") {
                          handleSearch();
                        }
                      }}
                      onChange={(e) => setSearchInput(e.target.value)}
                    />
                    <span
                      className=" px-1 cursor-pointer"
                      onClick={handleSearch}
                    >
                      <IoIosSearch fontSize={"1.3rem"} />
                    </span>
                  </label>
                </div>
                {/* <div className={"navmenu hidden gap-4 items-center"}>
                  {headerNav?.map((ele) => (
                    <li key={ele.id}>
                      <NavLink
                        to={ele.link}
                        className={cl(
                          "font-medium text-lg capitalize",
                          style.navlink
                        )}
                      >
                        {ele?.title}
                      </NavLink>
                    </li>
                  ))}
                </div> */}
              </ul>
            </div>
          </div>
          <div
            className={cl(
              "flex md:basis-1/4 sm:justify-center justify-end  gap-4",
              style.actions__btn
            )}
          >
            {"email" in user ? (
              <>
                <Link to={"/admin"} className={cl(style.admin, "rounded-full")}>
                  Panel
                </Link>
                <Logout style={[style.logout, "rounded-full"]} />
              </>
            ) : (
              <>
                <button className={cl("rounded-lg", style.login)}>
                  <Link to={"/auth"} state={pathname}>
                    Log In
                  </Link>
                </button>
                <button
                  className={cl("rounded-lg hidden sm:block", style.signin)}
                >
                  <Link to={"/auth/register"}>Sign Up</Link>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

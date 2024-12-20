import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoAdd } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import { BsPostcard } from "react-icons/bs";
import { IoIosPeople } from "react-icons/io";
import { IoIosListBox } from "react-icons/io";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoHomeOutline } from "react-icons/io5";
import { Logout } from "../../components/components";
import style from "./sidebar.module.scss";
import cl from "classnames";
import { useUserStore } from "../../services/store/store";
const Sidebar = () => {
  const { user } = useUserStore();
  const [isAdmin, setIsAdmin] = useState(user?.roles?.includes("admin"));
  return (
    <div
      className={cl(
        "w-[20%]",
        // show ? "block" : "hidden",
        style.sidebar__container
      )}
    >
      <div className="lg:container lg:mx-auto h-full px-2">
        <div className=" h-full flex flex-col divide-y-2 gap-2">
          <Link
            className="lg:text-xl font-semibold flex gap-1 items-center robo"
            to={"/"}
          >
            <span>
              <IoHomeOutline />
            </span>
            Home
          </Link>
          <ul
            className={cl(
              "flex flex-col gap-5 text-lg justify-start items-start text-nowrap",
              style.list
            )}
          >
            <li>
              <div className="flex justify-start gap-1 items-center hover:text-indigo-400">
                <span>
                  <IoMdAddCircleOutline fontSize={"1.3rem"} />
                </span>
                <Link to={"/admin/addpost"}>Add Post</Link>
              </div>
            </li>
            <li>
              <div className="flex justify-start gap-1 items-center hover:text-indigo-400">
                <span>
                  <BsPostcard />
                </span>
                <Link to={"/admin"}>View Posts</Link>
              </div>
            </li>
            {isAdmin && (
              <li>
                <div className="flex justify-start gap-1 items-center hover:text-indigo-400">
                  <span>
                    <IoIosPeople />
                  </span>
                  <Link to={"/admin/users"}>View Users</Link>
                </div>
              </li>
            )}
          </ul>
          {/* <ul className="flex flex-col gap-3 py-3 px-2 items-center sm:hidden">
            <li>
              <Link to={"/admin"}>
                <IoIosListBox />
              </Link>
            </li>
            <li>
              <Link to={"/admin/addpost"}>
                <IoAdd />
              </Link>
            </li>
            <li>
              <Link to={"/admin"}>
                <BsPostcard />
              </Link>
            </li>
            <li>
              <Link to={"/admin/users"}>
                <IoIosPeople />
              </Link>
            </li>
            <li>
              <Logout />
            </li>
          </ul> */}

          <div className="flex gap-1 items-center text-lg py-5 hover:text-indigo-400">
            <span>
              <IoIosLogOut />
            </span>
            <Logout />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

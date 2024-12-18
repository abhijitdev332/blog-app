import React from "react";
import { Link } from "react-router-dom";
import { IoAdd } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import { BsPostcard } from "react-icons/bs";
import { IoIosPeople } from "react-icons/io";
import { Logout } from "../../components/components";
import style from "./sidebar.module.scss";
import cl from "classnames";
const Sidebar = ({ show }) => {
  return (
    <div
      className={cl(
        style.sidebar__container,
        "w-[20%] robo",
        show ? "block" : "hidden"
      )}
    >
      <div className="lg:container lg:mx-auto py-3 px-4 h-full">
        <div className=" h-full flex flex-col gap-3">
          <Link className="text-lg font-semibold text-center" to={"/admin"}>
            Dashbroad
          </Link>
          <ul className="flex flex-col gap-3 py-4 text-lg px-5 items-center">
            <li>
              <div className="flex justify-start gap-1 items-center">
                <span>
                  <IoAdd />
                </span>
                <Link to={"/admin/addpost"}>Add Post</Link>
              </div>
            </li>
            <li>
              <div className="flex justify-start gap-1 items-center">
                <span>
                  <BsPostcard />
                </span>
                <Link to={"/admin"}>View Posts</Link>
              </div>
            </li>
            <li>
              <div className="flex justify-start gap-1 items-center">
                <span>
                  <IoIosPeople />
                </span>
                <Link to={"/admin/users"}>View Users</Link>
              </div>
            </li>
            <li>
              <div className="flex justify-start gap-1 items-center">
                <span>
                  <IoIosLogOut />
                </span>
                <Logout />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

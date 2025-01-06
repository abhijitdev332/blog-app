import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdPersonPin } from "react-icons/md";
import { Logout } from "../../components/components";
// style
import cl from "classnames";
import style from "./header.module.scss";
import { useUserStore } from "../../services/store/store";
import { toDateString } from "../../utils/utils";
const DashHeader = () => {
  const { user } = useUserStore();
  const [modalState, setModalState] = useState(false);
  return (
    <>
      <header className={cl(style.dash__header)}>
        <div className="header__wrapper lg:container lg:mx-auto px-2">
          <div className="flex justify-between">
            <div className="logo flex items-center">
              <Link to={"/admin"} className="py-3 px-2 text-xl">
                Dashbroad
              </Link>
            </div>
            <div className={cl(style.actions__btn, "flex gap-6")}>
              <button
                onMouseEnter={() => {
                  setModalState(true);
                }}
              >
                <MdPersonPin fontSize={"1.5rem"} />
              </button>
              <Logout style={[style.logout, "bg-slate-100"]} />
            </div>
          </div>
        </div>
      </header>
      <div
        className={cl(
          "fixed top-10 z-20 right-10",
          modalState ? "block" : "hidden"
        )}
        onMouseLeave={() => {
          setModalState(false);
        }}
      >
        <div className="modal__wrapper bg-slate-800 text-white flex flex-col p-2 rounded-md  h-fit">
          <div className="flex flex-col px-4 py-3">
            <div className="flex flex-col">
              <span className="font-semibold">User Name:</span>
              <span>{user?.username}</span>
            </div>

            <div className="flex flex-col">
              <span className="font-semibold"> Email:</span>
              <span>{user?.email}</span>
            </div>

            <div className="flex flex-col gap-2">
              <span className="font-semibold">Roles:</span>
              <div className="flex gap-2">
                {user?.roles?.map((ele) => (
                  <div className="chip">
                    <div
                      className={`rounded-full px-2`}
                      style={{ background: "#f8f8f8" }}
                    >
                      <span className="text-sm  text-black font-medium leading-loose capitalize">
                        <p className="robo">{ele}</p>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <p className="flex flex-col gap-2 robo">
              <span className="font-semibold">Join Date:</span>
              <span>{toDateString(user?.createdAt)}</span>
            </p>
          </div>

          {/* <button className="bg-red-500 text-white rounded-md p-2 font-medium">
              Delete Account
            </button> */}
          <Logout style={[style.logout, "bg-red-600 rounded py-2"]} />
        </div>
      </div>
    </>
  );
};

export default DashHeader;

import React from "react";
import { IoMailOutline } from "react-icons/io5";
import style from "./footer.module.scss";
import cl from "classnames";
import { footerMenus } from "../../constants/constant";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className={style.footer}>
      <div className="wrapper">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="basis-1/2 flex flex-col">
            <div className={style.footer__logo}>Blog App</div>
            <p className="py-1 font-semibold">
              Lorem ipsum dolor sit amet consectetur adipisicing.
            </p>
            <div className="flex gap-3 py-2">
              <label
                htmlFor=""
                className=" flex gap-2 p-2 border-2 items-center rounded "
              >
                <span>
                  <IoMailOutline fontSize={"1.1rem"} />
                </span>
                <input
                  type="text"
                  className="outline-none bg-transparent"
                  placeholder="Your Email"
                />
              </label>
              <button className={cl("px-3 py-2 rounded-md", style.subs)}>
                Subscribe
              </button>
            </div>
          </div>
          <div className="basis-1/2 flex flex-wrap gap-4 md:justify-around">
            {footerMenus.map((ele) => (
              <div className="flex gap-3   flex-col">
                <h4 className="font-bold text-lg">{ele.title}</h4>
                <ul className="flex flex-col gap-2">
                  {ele.links.map((ele) => (
                    <li className="hover:text-indigo-300 font-semibold">
                      <Link>{ele.linkName}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

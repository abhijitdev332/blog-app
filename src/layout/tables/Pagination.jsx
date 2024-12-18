import React from "react";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import cl from "classnames";
const Pagination = ({ style }) => {
  return (
    <div className={cl(style, "bg-slate-300")}>
      <div className="pagination__wrapper px-3 py-3 md:px-4 ">
        <div className="flex items-center justify-between">
          <div className="flex">
            <p className="font-semibold text-sm">1-12 of 40 items</p>
          </div>
          <div className="flex items-center justify-between gap-4">
            <div className="select__wrapper flex gap-2 font-semibold text-sm">
              <select
                name=""
                id=""
                className="bg-transparent border-2 rounded border-slate-400 p-1"
              >
                <option value="1">01</option>
                <option value="1">02</option>
                <option value="1">03</option>
              </select>
              <span>of 05 pages</span>
            </div>
            <div className="btns__group flex items-center justify-between gap-2">
              <button className="bg-slate-400 p-1 rounded">
                <MdNavigateBefore fontSize={"1.4rem"} />
              </button>
              <button className="bg-slate-400 p-1 rounded">
                <MdNavigateNext fontSize={"1.4rem"} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pagination;

import React from "react";
import cl from "classnames";
import style from "./loader.module.scss";
import { useLoaderStore } from "../../services/store/store";
import { createPortal } from "react-dom";
import "ldrs/grid";
const DataLoader = ({ bg = "#f8f8f8" }) => {
  const { status } = useLoaderStore();
  return (
    <>
      {status &&
        createPortal(
          <div
            className={cl("h-screen  w-screen z-50 fixed top-0 left-0")}
            style={{ backgroundColor: bg }}
          >
            <div className="flex h-full justify-center items-center">
              <div className={style.loader}></div>
            </div>
          </div>,
          document.getElementById("loader")
        )}
    </>
  );
};

export default DataLoader;

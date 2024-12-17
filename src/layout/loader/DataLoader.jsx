import React from "react";
import "ldrs/grid";
import cl from "classnames";
import { useLoaderStore } from "../../services/store/store";
import { createPortal } from "react-dom";
const DataLoader = ({ bg = "#fff" }) => {
  const { status } = useLoaderStore();
  return (
    <>
      {status &&
        createPortal(
          <div
            className={cl("h-screen w-screen  z-50 fixed top-0 left-0")}
            style={{ background: bg }}
          >
            <div className="flex h-full justify-center items-center">
              <span>
                <l-grid size="60" speed="1.5" color="teal"></l-grid>
              </span>
            </div>
          </div>,
          document.getElementById("loader")
        )}
    </>
  );
};

export default DataLoader;

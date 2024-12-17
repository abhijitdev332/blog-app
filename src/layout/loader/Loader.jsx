import React from "react";
import style from "./loader.module.scss";
const Loader = () => {
  return (
    <div className="h-screen w-screen bg-gray-300">
      <div className="flex h-full justify-center items-center">
        <div className={style.loader}></div>
      </div>
    </div>
  );
};

export default Loader;

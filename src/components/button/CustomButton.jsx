import React from "react";
import { LuLoaderCircle } from "react-icons/lu";
import cl from "classnames";
const CustomButton = ({ loader = false, func, classnames, children }) => {
  return (
    <button
      className={cl("flex justify-center gap-2", classnames)}
      onClick={func}
    >
      {loader && (
        <span>
          <LuLoaderCircle
            fontSize={"1.4rem"}
            color="#fff"
            className="animate-spin"
          />
        </span>
      )}
      <span>{children}</span>
    </button>
  );
};

export default CustomButton;

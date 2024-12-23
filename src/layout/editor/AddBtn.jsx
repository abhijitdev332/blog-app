import React, { useState } from "react";
import { LuLoaderCircle } from "react-icons/lu";
const AddBtn = ({ sendData }) => {
  const [loader, setLoader] = useState(false);
  return (
    <button
      className="p-3  rounded w-full text-center flex justify-center gap-1 mt-8 text-lg font-semibold bg-indigo-400 robo"
      onClick={() => {
        setLoader(true);
        sendData();
      }}
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

      <span>Add Post</span>
    </button>
  );
};

export default AddBtn;

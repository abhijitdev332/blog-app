import React, { useEffect, useState } from "react";
import { LuLoaderCircle } from "react-icons/lu";
const AddBtn = ({ sendData, err }) => {
  const [loader, setLoader] = useState(false);
  const loaderClick = () => {
    if (!err) {
      setLoader(true);
    }
  };
  useEffect(() => {
    if (err) {
      setLoader(false);
    }
  }, [err]);
  return (
    <button
      className="p-3  rounded w-full text-center flex justify-center gap-1 mt-8 text-lg font-semibold bg-indigo-400 robo"
      onClick={() => {
        loaderClick();
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

import React, { useEffect, useState } from "react";
import { LuLoaderCircle } from "react-icons/lu";
import { useUserStore } from "../../services/store/store";
const AddBtn = ({ title, updatePost, postUpdateAdmin, sendData, err }) => {
  const [loader, setLoader] = useState(false);
  const { user } = useUserStore();
  const [isAdmin, setAdmin] = useState(user?.roles?.includes("admin") || false);
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
    <div className="flex h-fit justify-center gap-2">
      {title !== "" ? (
        <div className="flex gap-3 ">
          <button
            disabled={loader}
            className="p-3  rounded w-full text-center flex justify-center gap-1 mt-8 font-semibold bg-indigo-400 robo"
            onClick={() => {
              loaderClick();
              updatePost();
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
            <span className="whitespace-nowrap">Update Post</span>
          </button>
          {isAdmin && (
            <button
              disabled={loader}
              className="p-3  rounded w-full text-center flex justify-center gap-1 mt-8 font-semibold bg-indigo-400 robo"
              onClick={() => {
                loaderClick();
                postUpdateAdmin();
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
              <span className="whitespace-nowrap">Update Post As Admin</span>
            </button>
          )}
        </div>
      ) : (
        <button
          disabled={loader}
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
      )}
    </div>
  );
};

export default AddBtn;

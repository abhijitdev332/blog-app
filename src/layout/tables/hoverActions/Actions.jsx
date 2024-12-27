import React from "react";
import { RiDeleteBin6Fill } from "react-icons/ri";
import cl from "classnames";
import style from "./action.module.scss";
import useLoaderStore from "../../../services/store/useLoaderStore";
import AxiosInt from "../../../services/api/api";
import { toast } from "react-toastify";

const Actions = ({ checkedArr, setFetch }) => {
  const { setLoading, removeLoading } = useLoaderStore();
  const handleDelete = async () => {
    try {
      // set loader
      setLoading();
      const res = await AxiosInt.delete("/admin/posts", {
        data: { deleteArr: checkedArr },
      });
      if (res.status == 200) {
        toast.success(res.data?.msg);
        setFetch(true);
      }
    } catch (err) {
      toast.error(err?.response?.data?.msg);
    } finally {
      // remove loader
      removeLoading();
    }
  };
  return (
    <div
      className={cl(
        "w-full sticky bottom-[12%]  justify-center mt-auto",
        style.action,
        checkedArr?.length > 0 ? "flex" : "hidden"
      )}
    >
      <div
        className={cl(
          "flex w-[20rem] py-3 px-3 rounded-md gap-3 items-center",
          style.action__wrapper
        )}
      >
        <p className={style.action__text}>{checkedArr?.length} Selected</p>
        <button
          className="flex gap-1 items-center cursor-pointer hover:text-red-600"
          //   onClick={() => handleDelete(ele?._id)}
        >
          <RiDeleteBin6Fill fontSize={"1rem"} />
          <span className="font-semibold">Delete</span>
        </button>
      </div>
    </div>
  );
};

export default Actions;

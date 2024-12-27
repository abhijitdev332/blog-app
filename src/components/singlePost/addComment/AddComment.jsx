import React, { useState } from "react";
import { useUserStore } from "../../../services/store/store";
import AxiosInt from "../../../services/api/api";
import { toast } from "react-toastify";
import { LuLoaderCircle } from "react-icons/lu";

const AddComment = ({ postId, setRefetch }) => {
  const { user } = useUserStore();
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddCommnet = async () => {
    if (input.trim() == "") {
      toast.info("Please enter valid comment");
      return;
    }
    if ("email" in user) {
      try {
        setLoading(true);
        let res = await AxiosInt.put(`/post/comment/${postId}`, {
          comments: {
            user: user?._id,
            text: input,
          },
        });
        if ((res.status = 200)) {
          toast.success(res.data?.msg);
          setInput("");
          setRefetch((prev) => !prev);
        }
      } catch (err) {
        toast.error(err?.response?.data?.msg);
      } finally {
        setLoading(false);
      }
      return;
    }
    toast.info("Please sign in!!");
  };
  return (
    <div className="flex py-3 gap-3">
      <input
        type="text"
        placeholder="Comment"
        className="border-2 p-1 rounded-md border-slate-900"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key == "Enter") {
            handleAddCommnet();
          }
        }}
      />
      <button
        className="p-2 bg-slate-900 text-white rounded-md font-semibold"
        onClick={handleAddCommnet}
      >
        {loading && (
          <span>
            <LuLoaderCircle
              fontSize={"1.4rem"}
              color="#fff"
              className="animate-spin"
            />
          </span>
        )}
        Comment
      </button>
    </div>
  );
};

export default AddComment;
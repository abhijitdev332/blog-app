import React, { useState } from "react";
import { useUserStore } from "../../../services/store/store";
import AxiosInt from "../../../services/api/api";
import { toast } from "react-toastify";
import { LuLoaderCircle } from "react-icons/lu";
import { z, ZodError } from "zod";

const AddComment = ({ postId, addComment }) => {
  const { user } = useUserStore();
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const schema = z.object({
    user: z.string(),
    text: z
      .string()
      .min(3, "Comment should be minimum 3 charcters long!!")
      .max(15, "Comment Should not be greater than 15 charchters"),
  });
  // handle comment add
  const handleAddCommnet = async () => {
    if (input.trim() == "") {
      toast.info("Please enter valid comment");
      return;
    }
    if ("email" in user) {
      try {
        setLoading(true);
        schema.parse({
          user: user?._id,
          text: input,
        });
        let res = await AxiosInt.put(`/post/comment/${postId}`, {
          comment: {
            user: user?._id,
            text: input,
          },
        });
        if (res.status == 200) {
          addComment({ user: user, text: input, createdAt: Date.now() });
          toast.success(res.data?.msg);
          setInput("");
        }
      } catch (err) {
        if (err instanceof ZodError) {
          toast.info(err.errors[0].message);
        } else {
          toast.error(err?.response?.data?.msg);
        }
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
        className="p-2 bg-slate-900 flex gap-1 text-white rounded-md font-semibold"
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

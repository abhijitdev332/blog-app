import React, { useRef, useState } from "react";
import ReactQuill from "react-quill";
import { string, z } from "zod";
import "react-quill/dist/quill.snow.css";
import TagsChip from "./TagsChip";
import { toast } from "react-toastify";
import AxiosInt from "../../services/api/api";
import { userStore } from "../../services/store/store";
import { useNavigate } from "react-router-dom";
const inital = { title: "", imageUrl: "", content: "", tags: [] };
const Editor = () => {
  const navigate = useNavigate();
  const [inputvalue, Setinputvalue] = useState(inital);
  const [tagInput, setTagInput] = useState("");
  const { user } = userStore();
  const tagsREf = useRef();
  const handleImageInput = (e) => {
    Setinputvalue((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleTagsInput = (e) => {
    if (
      e.key == "Enter" &&
      inputvalue.tags.length <= 2 &&
      tagsREf.current?.value.trim() !== ""
    ) {
      Setinputvalue((prev) => ({
        ...prev,
        tags: [...prev.tags, e.target.value],
      }));
      // do clean the ref
      setTagInput("");
      // to chip
    } else if (inputvalue.tags.length > 2) {
      // enterring
      // alert please enter correct tags
      toast.info("only 3 tags allowed");
    }
  };
  const handleTagDelete = (e) => {
    // let ele=inputvalue.tags?.find(ele=>ele==e)
    Setinputvalue((prev) => ({
      ...prev,
      tags: prev.tags.filter((ele) => ele !== e),
    }));
  };
  const handleContentInput = (e) => {
    Setinputvalue((prev) => ({
      ...prev,
      content: e,
    }));
  };
  const schema = z.object({
    title: string()
      .min(30, "Minimum 30 char allowed")
      .max(80, "Maximum 80 charcters allowed"),
    imageUrl: string()
      .url("Invalid URL format")
      .refine((url) => /\.(jpeg|jpg|png|gif|bmp|webp)$/i.test(url), {
        message: "URL must point to an image (e.g., .jpg, .png)",
      }),
    content: string(),
    tags: string().array().max(3, "Maximum 3 tags are allowed"),
  });

  const sendData = async () => {
    for (let ele in inputvalue) {
      if (inputvalue["tags"].length <= 0 && inputvalue[ele].trim() == "") {
        toast.error(`Please enter ${ele} field`);
        return;
      }
    }
    try {
      schema.parse(inputvalue);
      let res = await AxiosInt.post("/post/create", {
        author: user?._id,
        ...inputvalue,
      });
      if (res.status == 201) {
        toast.success("Post Created Successfully");
        Setinputvalue(inital);
        navigate("/admin");
      } else {
        toast.error("something went wrong");
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        toast.error(err.errors[0].message);
      }
    }
  };
  return (
    <>
      <div className="editor">
        <div className="editor__wrapper px-6 lg:container lg:mx-auto">
          <div className="flex flex-col gap-3 py-4 px-3">
            <div className="input__group flex flex-col gap-2">
              <span className="font-semibold text-lg font-serif">Title:</span>
              <input
                type="text"
                name="title"
                value={inputvalue.title}
                className="border-2 outline-none border-black py-2 px-1 rounded"
                onChange={(e) =>
                  Setinputvalue((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
              />
            </div>
            <div className="input__group flex flex-col gap-2">
              <span className="font-semibold text-lg font-serif">Tags:</span>
              <label
                htmlFor=""
                className=" flex gap-2 border-2 border-black p-1 rounded "
              >
                <span className="flex gap-1 w-fit px-3">
                  {inputvalue?.tags?.map((ele) => (
                    <TagsChip input={ele} handleDelete={handleTagDelete} />
                  ))}
                </span>

                <input
                  type="text"
                  name="tags"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  className="outline-none w-full"
                  onKeyDown={handleTagsInput}
                  ref={tagsREf}
                />
              </label>
            </div>
            <div className="input__group flex flex-col gap-2">
              <span className="font-semibold text-lg font-serif">Image:</span>
              <input
                type="text"
                name="imageUrl"
                className="w-full rounded p-2 border-2"
                value={inputvalue.imageUrl}
                onChange={handleImageInput}
              />
            </div>
            <div className="area">
              <ReactQuill
                theme="snow"
                name="content"
                value={inputvalue.content}
                className="h-[40vh]"
                onChange={handleContentInput}
              />
            </div>
            <button
              className="p-3 rounded w-full mt-8 text-lg font-semibold bg-indigo-400"
              onClick={sendData}
            >
              Add Post
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Editor;

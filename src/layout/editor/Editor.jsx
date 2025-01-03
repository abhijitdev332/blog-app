import React, { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import { string, z } from "zod";
import "react-quill/dist/quill.snow.css";
import TagsChip from "./TagsChip";
import { toast } from "react-toastify";
import AxiosInt from "../../services/api/api";
import { useUserStore } from "../../services/store/store";
import { useNavigate } from "react-router-dom";
import AddBtn from "./AddBtn";
import cl from "classnames";
import { IoClose } from "react-icons/io5";
const inital = { title: "", content: "", tags: [] };
const Editor = ({
  postId = "",
  title = "",
  content = "",
  tags = [],
  imageUrl = "",
}) => {
  const navigate = useNavigate();
  const [inputvalue, Setinputvalue] = useState({ title, content, tags });
  const [tagInput, setTagInput] = useState("");
  const [imageBlob, setImageBlob] = useState(null);
  const [modalState, setModalState] = useState(false);
  const [err, setErr] = useState(false);
  const { user } = useUserStore();
  const tagsREf = useRef();
  const handleImageInput = (e) => {
    if (e.target.files?.length > 0) {
      setImageBlob(e.target.files[0]);
      return;
    }
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
    } else if (inputvalue.tags.length > 2 && e.key == "Enter") {
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
      .min(20, "title minimum 20 charcters long")
      .max(100, "title maximum 100 charcters long allowed"),
    content: string(),
    tags: string().array().max(3, "Maximum 3 tags are allowed"),
  });
  const uploadImage = async () => {
    let imageData = new FormData();
    imageData.append("image", imageBlob);
    try {
      let uploadRes = await AxiosInt.post("/post/upload", imageData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (uploadRes.status == 200) {
        return uploadRes.data?.imageUrl;
      }
    } catch (err) {
      toast.error(err?.response?.data?.msg);
    }
  };

  const sendData = async () => {
    for (let ele in inputvalue) {
      if (inputvalue[ele] !== "tags" && ele.trim() == "") {
        setErr(true);
        toast.error(`Please enter ${ele} field`);
        return;
      } else if (inputvalue["tags"] <= 0) {
        setErr(true);
        toast.info("Please enter atleast one tag!!");
        return;
      }
    }
    if (!imageBlob) {
      setErr(true);
      toast("Please upload a image");
      return;
    }
    try {
      schema.parse(inputvalue);
      let imgUrl = await uploadImage();
      if (imgUrl !== "") {
        let res = await AxiosInt.post("/post/create", {
          author: user?._id,
          ...inputvalue,
          imageUrl: imgUrl,
        });
        if (res.status == 201) {
          toast.success(res.data?.msg);
          Setinputvalue(inital);
          setImageBlob(null);
          setErr(false);
          return navigate("/admin");
        }
      }
    } catch (err) {
      setErr(true);
      if (err instanceof z.ZodError) {
        return toast.info(err.errors[0].message);
      }
      toast.error(err?.response?.data?.msg);
    }
  };
  const updatePost = async () => {
    for (let ele in inputvalue) {
      if (inputvalue[ele] !== "tags" && ele.trim() == "") {
        setErr(true);
        toast.error(`Please enter ${ele} field`);
        return;
      } else if (inputvalue["tags"] <= 0) {
        setErr(true);
        toast.info("Please enter atleast one tag!!");
        return;
      }
    }
    if (imageUrl == "" || !imageBlob) {
      console.log(imageUrl);
      setErr(true);
      toast("Please upload a image");
      return;
    }
    try {
      schema.parse(inputvalue);
      if (imageBlob) {
        let imgUrl = await uploadImage();
        if (imgUrl !== "") {
          let res = await AxiosInt.put(`/post/${postId}`, {
            // author: user?._id,
            ...inputvalue,
            imageUrl: imgUrl,
          });
          if (res.status == 200) {
            toast.success(res.data?.msg);
            Setinputvalue(inital);
            setImageBlob(null);
            setErr(false);
            return navigate(`/admin/viewPost/${postId}`);
          }
        }
      } else {
        let res = await AxiosInt.put(`/post/${postId}`, {
          ...inputvalue,
        });
        if (res.status == 200) {
          toast.success(res.data?.msg);
          Setinputvalue(inital);
          setImageBlob(null);
          setErr(false);
          return navigate(`/admin/viewPost/${postId}`);
        }
      }
    } catch (err) {
      setErr(true);
      if (err instanceof z.ZodError) {
        return toast.info(err.errors[0].message);
      }
      toast.error(err?.response?.data?.msg);
    }
  };
  const postUpdateAdmin = async () => {
    for (let ele in inputvalue) {
      if (inputvalue[ele] !== "tags" && ele.trim() == "") {
        setErr(true);
        toast.error(`Please enter ${ele} field`);
        return;
      } else if (inputvalue["tags"] <= 0) {
        setErr(true);
        toast.info("Please enter atleast one tag!!");
        return;
      }
    }
    if (imageUrl == "" || !imageBlob) {
      setErr(true);
      toast("Please upload a image");
      return;
    }
    try {
      schema.parse(inputvalue);
      if (imageBlob) {
        let imgUrl = await uploadImage();
        if (imgUrl !== "") {
          let res = await AxiosInt.put(`/post/${postId}`, {
            author: user?._id,
            ...inputvalue,
            imageUrl: imgUrl,
          });
          if (res.status == 200) {
            toast.success(res.data?.msg);
            Setinputvalue(inital);
            setImageBlob(null);
            setErr(false);
            return navigate(`/admin/viewPost/${postId}`);
          }
        }
      } else {
        let res = await AxiosInt.put(`/post/${postId}`, {
          author: user?._id,
          ...inputvalue,
        });
        if (res.status == 200) {
          toast.success(res.data?.msg);
          Setinputvalue(inital);
          setImageBlob(null);
          setErr(false);
          return navigate(`/admin/viewPost/${postId}`);
        }
      }
    } catch (err) {
      setErr(true);
      if (err instanceof z.ZodError) {
        return toast.info(err.errors[0].message);
      }
      toast.error(err?.response?.data?.msg);
    }
  };
  useEffect(() => {
    if (!title || !content || !tags || !imageUrl) {
      return;
    } else {
      Setinputvalue({ title, content, tags, imageUrl });
    }
  }, [title, content, tags, imageUrl, postId]);
  return (
    <>
      <div className="editor relative">
        <div className="editor__wrapper  px-6 lg:container lg:mx-auto">
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
              <label
                htmlFor="imageInput"
                className=" flex gap-2 border-2 items-center border-black p-1 rounded"
              >
                {imageUrl !== "" && (
                  <button
                    className="whitespace-nowrap px-1 rounded border-2 border-black"
                    onClick={() => {
                      setModalState(!modalState);
                    }}
                  >
                    Old Image
                  </button>
                )}
                <span className="border-2 px-1 border-black rounded cursor-pointer">
                  Select Image
                </span>
                <input
                  type="file"
                  name="imageUrl"
                  id="imageInput"
                  className="rounded p-2 hidden"
                  onChange={handleImageInput}
                />
                <span className="flex gap-1 items-center cursor-pointer">
                  {imageBlob?.name || ""}
                  {imageBlob?.name && (
                    <IoClose
                      fontSize={"1.2rem"}
                      className="hover:scale-125"
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        setImageBlob(null);
                      }}
                    />
                  )}
                </span>
              </label>
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
            <AddBtn
              title={title}
              updatePost={updatePost}
              postUpdateAdmin={postUpdateAdmin}
              sendData={sendData}
              err={err}
            />
          </div>
        </div>
        <div
          className={cl(
            "absolute w-full top-0 h-full bg-transparent",
            modalState ? "block" : "hidden"
          )}
          onMouseLeave={() => {
            setModalState(false);
          }}
        >
          <div className="modal__wrapper bg-[#f8f8f895] flex  justify-center items-center h-full p-3">
            <img
              src={imageUrl}
              alt="post image"
              className="w-[25rem] h-[20rem]"
              onMouseLeave={() => {
                setModalState(false);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default Editor;

import React, { useEffect, useState } from "react";
import { Editor } from "../layouts";
import { useParams } from "react-router-dom";
import useFetchData from "../../hooks/useFetchData";
import useLoaderStore from "../../services/store/useLoaderStore";

const EditPost = () => {
  const { postId } = useParams();
  const { data } = useFetchData(`/post/${postId}`);
  const { setLoading, removeLoading } = useLoaderStore();
  const [postState, setPoststate] = useState({
    title: "",
    content: "",
    tags: [],
    imageUrl: "",
  });

  useEffect(() => {
    if (!data) {
      setLoading();
    } else {
      const { title, content, tags, imageUrl } = data;
      setPoststate({ title, content, tags, imageUrl });
      removeLoading();
    }
  }, [data]);

  return (
    <div className="editpost">
      <Editor
        postId={data?._id}
        title={postState?.title}
        content={postState?.content}
        imageUrl={postState?.imageUrl}
        tags={postState?.tags}
      />
    </div>
  );
};

export default EditPost;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetchData from "../../hooks/useFetchData";
import { PostList } from "../../components/components";
import useLoaderStore from "../../services/store/useLoaderStore";

const SearchPost = () => {
  const { query } = useParams();
  // const { setLoading, removeLoading } = useLoaderStore();
  const { data, loading } = useFetchData(`/post/search?search=${query}`);
  const [postData, setPostData] = useState([]);

  useEffect(() => {
    setPostData(data);
    return () => setPostData([]);
  }, [data]);
  return (
    <div>
      <PostList posts={postData} title={`Search result for: ${query}`} />
    </div>
  );
};

export default SearchPost;

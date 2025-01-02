import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import useFetchData from "../../hooks/useFetchData";
import { PostList } from "../../components/components";
import { useLoaderStore } from "../../services/store/store";

const SearchPost = () => {
  const { query } = useParams();
  const { setLoading, removeLoading } = useLoaderStore();
  const [searchParam, SetSearchParam] = useSearchParams();
  const { data } = useFetchData(`/post/search?search=${query}`);
  const [postData, setPostData] = useState([]);

  useEffect(() => {
    setPostData(data);
    return () => setPostData([]);
  }, [data]);
  useEffect(() => {
    if (!postData) {
      setLoading();
    } else {
      removeLoading();
    }
  }, [postData]);
  return (
    <div>
      <PostList posts={postData} title={`Search result for: ${query}`} />
    </div>
  );
};

export default SearchPost;

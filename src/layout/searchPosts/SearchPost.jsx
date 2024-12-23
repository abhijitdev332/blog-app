import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import useFetchData from "../../hooks/useFetchData";
import { PostList } from "../../components/components";

const SearchPost = () => {
  const { query } = useParams();
  const [searchParam, SetSearchParam] = useSearchParams();
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

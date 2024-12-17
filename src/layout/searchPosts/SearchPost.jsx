import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetchData from "../../hooks/useFetchData";
import { PostList } from "../../components/components";

const SearchPost = () => {
  const { query } = useParams();
  const { data } = useFetchData(`/post/search?search=${query}`);
  const [postData, setPostData] = useState([]);
  // const res = await AxiosInt.get(`/post/search?search=${searchInput}`);
  // if (res.status == 200) {
  //   setData(res.data?.data);
  // }
  useEffect(() => {
    setPostData(data);
  }, [data]);
  return (
    <div>
      <PostList posts={postData} title={`Search result for: ${query}`} />
    </div>
  );
};

export default SearchPost;

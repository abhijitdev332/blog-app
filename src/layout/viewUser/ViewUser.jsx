import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetchData from "../../hooks/useFetchData";
const ViewUser = () => {
  const { userId } = useParams();
  const { data, loading } = useFetchData(`/user/${userId}`);
  const [userState, setUserState] = useState(null);
  console.log(userState);
  useEffect(() => {
    setUserState(data);
  }, [data]);
  return <div>ViewUser</div>;
};

export default ViewUser;

import React, { useEffect } from "react";
import UseDataStore from "../services/store/useDataStore";
import AxiosInt from "../services/api/api";

const InitialData = () => {
  const { setData, status } = UseDataStore();
  const getData = async () => {
    try {
      const res = await AxiosInt.get("/post");
      if (res.status == 200) {
        setData(res.data?.data);
      } else {
        setData([]);
      }
    } catch (err) {
      setData([]);
    }
  };

  useEffect(() => {
    if (status) {
      getData();
    }
  }, [status]);
  return <></>;
};

export default InitialData;

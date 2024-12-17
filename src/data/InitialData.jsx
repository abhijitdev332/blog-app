import React, { useEffect } from "react";
import { useDataStore, useLoaderStore } from "../services/store/store";
import AxiosInt from "../services/api/api";

const InitialData = () => {
  const { setData, status } = useDataStore();
  const { setLoading, removeLoading } = useLoaderStore();
  const getData = async () => {
    try {
      setLoading();
      const res = await AxiosInt.get("/post");
      if (res.status == 200) {
        setData(res.data?.data);
      }
    } catch (err) {
      setData([]);
    } finally {
      removeLoading();
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

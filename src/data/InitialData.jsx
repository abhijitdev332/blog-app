import React, { useEffect } from "react";
import { useDataStore, useLoaderStore } from "../services/store/store";
import AxiosInt from "../services/api/api";

const InitialData = () => {
  const { setData, status } = useDataStore();
  const { setLoading, removeLoading } = useLoaderStore();
  const getData = async (sig) => {
    try {
      setLoading();
      const res = await AxiosInt.get("/post", { signal: sig });
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
    let abortCon = new AbortController();
    console.log(status);
    if (status) {
      getData(abortCon.signal);
    }

    return () => abortCon.abort();
  }, [status]);
  return <></>;
};

export default InitialData;

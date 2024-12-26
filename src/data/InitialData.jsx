import React, { useEffect } from "react";
import { useDataStore, useLoaderStore } from "../services/store/store";
import AxiosInt from "../services/api/api";
import { toast } from "react-toastify";

const InitialData = () => {
  const { setData, status } = useDataStore();
  const { setLoading, removeLoading } = useLoaderStore();
  // AxiosInt.interceptors.request.use((config) => {
  //   setLoading();
  //   return config;
  // });
  // AxiosInt.interceptors.response.use(
  //   (value) => {
  //     removeLoading();
  //     return value;
  //   },
  //   (error) => {
  //     removeLoading();
  //     return Promise.reject(error);
  //   }
  // );
  const getData = async (sig) => {
    try {
      setLoading();
      const res = await AxiosInt.get("/post", { signal: sig });
      if (res.status == 200) {
        setData(res.data?.data);
      }
    } catch (err) {
      toast.error(err?.response?.data?.msg || "Something went wrong!!");
      toast("Please try after some times!!");
    } finally {
      removeLoading();
    }
  };

  useEffect(() => {
    let abortCon = new AbortController();
    if (status) {
      getData(abortCon.signal);
    }

    return () => abortCon.abort();
  }, [status]);
  return <></>;
};

export default InitialData;

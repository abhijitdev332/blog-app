import React, { useEffect, useState } from "react";
import AxiosInt from "../services/api/api";
import useLoaderStore from "../services/store/useLoaderStore";

const useFetchData = (url = "") => {
  const [data, setData] = useState(null);
  const [loading, setLoader] = useState(false);
  const [err, setErr] = useState(null);
  const { setLoading, removeLoading } = useLoaderStore();

  AxiosInt.interceptors.request.use((config) => {
    setLoading();
    return config;
  });
  AxiosInt.interceptors.response.use(
    (value) => {
      removeLoading();
      return value;
    },
    (error) => {
      removeLoading();
      return Promise.reject(error);
    }
  );
  useEffect(() => {
    let abortCon = new AbortController();
    const fetchData = async () => {
      setErr(null);
      setLoader(false);
      try {
        setLoader(true);
        let res = await AxiosInt.get(url, { signal: abortCon.signal });
        if (res.status == 200 && res.data) {
          setData(res.data?.data);
        }
      } catch (errr) {
        setErr(errr?.cause);
      } finally {
        setLoader(false);
      }
    };
    fetchData();
    return () => abortCon.abort();
  }, [url]);

  return { data, loading, err };
};

export default useFetchData;

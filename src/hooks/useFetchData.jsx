import React, { useEffect, useState } from "react";
import AxiosInt from "../services/api/api";

const useFetchData = (url = "") => {
  const [data, setData] = useState(null);
  const [loading, setLoader] = useState(false);
  const [err, setErr] = useState(null);
  const fetchData = async (signal) => {
    setLoader(true);
    setErr(null);
    try {
      const res = await AxiosInt.get(url, { signal });
      if (res.status === 200 && res.data) {
        setData(res.data?.data || res.data || {});
      }
    } catch (errr) {
      if (errr.name !== "AbortError") {
        setErr(
          errr?.response?.data?.message || errr?.message || "An error occurred"
        );
      }
    } finally {
      setLoader(false);
    }
  };
  const refetch = () => fetchData();
  useEffect(() => {
    const abortCon = new AbortController();
    fetchData(abortCon.signal);
    return () => abortCon.abort();
  }, [url]);

  return { data, loading, err, refetch };
};

export default useFetchData;

import React, { useEffect, useState } from "react";
import AxiosInt from "../services/api/api";

const useFetchData = (url = "") => {
  const [data, setData] = useState(null);
  const [loading, setLoader] = useState(false);
  const [err, setErr] = useState(null);

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

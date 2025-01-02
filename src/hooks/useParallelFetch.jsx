import { useState, useEffect } from "react";

/**
 * Custom hook to fetch multiple data sources in parallel.
 * @param {Array<Function>} fetchFunctions - Array of fetch functions returning promises.
 * @returns {Object} - { data, isLoading, error }
 */
const useParallelFetch = (fetchFunctions) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; // To prevent state updates if the component unmounts.

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const results = await Promise.all(fetchFunctions.map((fn) => fn()));
        if (isMounted) {
          setData(results);
        }
      } catch (err) {
        if (isMounted) {
          setError(err);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [fetchFunctions]);

  return { data, isLoading, error };
};

export default useParallelFetch;

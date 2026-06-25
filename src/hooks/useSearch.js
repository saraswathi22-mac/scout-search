import { useState, useEffect } from "react";
import { API_KEY, CONTEXT_KEY } from "../config";

const searchCache = {};

export const useSearch = (term) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!term) return;

    const cacheKey = term.trim().toLowerCase();

    const fetchData = async () => {
      // check cache first
      if (searchCache[cacheKey]) {
        setData(searchCache[cacheKey]);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CONTEXT_KEY}&q=${encodeURIComponent(
            term
          )}`
        );
        if (!res.ok) {
          throw new Error(`Error: ${res.status} ${res.statusText}`);
        }
        const result = await res.json();
        searchCache[cacheKey] = result;
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [term]);

  return { data, loading, error };
};

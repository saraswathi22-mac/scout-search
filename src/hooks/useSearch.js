import { useState, useEffect } from "react";
import { API_KEY, CONTEXT_KEY } from "../config";

const searchCache = {};
const RESULTS_PER_PAGE = 10;

export const useSearch = (term) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1); // NEW: 1-indexed page number

  useEffect(() => {
    if (!term) return;

    const start = (page - 1) * RESULTS_PER_PAGE + 1; // NEW: compute Google's `start` param
    const cacheKey = `${term.trim().toLowerCase()}::${page}`; // NEW: page-aware cache key

    const fetchData = async () => {
      if (searchCache[cacheKey]) {
        setData(searchCache[cacheKey]);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CONTEXT_KEY}&q=${encodeURIComponent(
            term,
          )}&start=${start}`, // NEW: pass start to the API
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
  }, [term, page]); // NEW: re-run when page changes

  return { data, loading, error, page, setPage };
};

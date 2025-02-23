import { useState, useEffect } from "react";

const useAutocomplete = <T,>(
  data: T[],
  filterFn: (item: T, query: string) => boolean,
  limit: number = 4
) => {
  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState<T[]>([]);

  useEffect(() => {
    if (query.length > 0) {
      const results = data
        .filter((item) => filterFn(item, query))
        .slice(0, limit);

      setFilteredData(results);
    } else {
      setFilteredData([]);
    }
  }, [query, data, filterFn, limit]);

  return { query, filteredData, setQuery };
};

export default useAutocomplete;

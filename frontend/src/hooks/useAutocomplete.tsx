// EXTERNAL MODULES
import { useState, useEffect } from "react";

/******************************************************************************/

const useAutocomplete = <T,>(
  data: T[],
  filterFn: (item: T, query: string) => boolean,
  limit: number = 4
) => {
  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState<T[]>([]);

  useEffect(() => {
    setQuery(query);

    setFilteredData(
      query.length > 0
        ? data.filter((item) => filterFn(item, query)).slice(0, limit)
        : []
    );
  }, [query, data, filterFn, limit]);

  return { setQuery, filteredData };
};

export default useAutocomplete;

// EXTERNAL MODULES
import { useState } from "react";

// CUSTOM HOOKS
import useAutocomplete from "@hooks/useAutocomplete";

/******************************************************************************/
// TYPES
type AutocompleteProps<T> = {
  data: T[];
  filterFn: (item: T, query: string) => boolean;
  onSelect: (selectedItem: T) => void;
  placeholder?: string;
  renderItem?: (item: T) => string;
  className?: string;
};

/******************************************************************************/

const CAutocomplete = <T,>({
  data,
  filterFn,
  onSelect,
  placeholder = "Search...",
  renderItem = (item) => String(item),
  className,
}: AutocompleteProps<T>) => {
  const { query, filteredData, setQuery } = useAutocomplete(data, filterFn);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-full">
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        placeholder={placeholder}
        className={
          className ||
          "w-full px-3 py-1 border border-zip-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        }
      />

      {isOpen && filteredData.length > 0 && (
        <ul className="absolute left-0 w-full mt-1 bg-light border border-zip-gray-500 rounded-md shadow-xl max-h-40 overflow-auto">
          {filteredData.map((item, index) => (
            <li
              key={index}
              onClick={() => {
                setQuery(renderItem(item));
                setIsOpen(false);
                onSelect(item);
              }}
              className="p-2 cursor-pointer hover:bg-zip-gray-500"
            >
              {renderItem(item)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CAutocomplete;

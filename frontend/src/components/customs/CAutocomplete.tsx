// EXTERNAL MODULES
import { useState, useRef } from "react";

// CUSTOM HOOKS
import useAutocomplete from "@hooks/useAutocomplete";

// CUSTOM COMPONENTS
import { CInfo } from "@customs/.";

/******************************************************************************/
// TYPES
export type CAutocompleteStyType = {
  container?: string;
  label?: string;
  required?: string;
  input?: string;
  dropdown?: string;
  dropdownItem?: string;
};

type AutocompleteProps<T> = {
  dataSelector: T[];
  filterFn: (item: T, query: string) => boolean;
  onSelect: (selectedItem: T) => void;
  placeholder?: string;
  renderItem?: (item: T) => string;
  className?: string;
  name: string;
  label: string;
  required?: boolean;
  additionalInfo?: string;
  sty?: CAutocompleteStyType;
};

/******************************************************************************/

const CAutocomplete = <T,>({
  dataSelector,
  filterFn,
  onSelect,
  placeholder = "Search...",
  renderItem = (item) => String(item),
  name,
  label,
  required = false,
  additionalInfo,
  sty,
}: AutocompleteProps<T>) => {
  const { query, filteredData, setQuery } = useAutocomplete(
    dataSelector,
    filterFn
  );
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!dropdownRef.current?.contains(e.relatedTarget)) {
      setIsOpen(false);
    }
  };

  return (
    <div className={`relative ${sty?.container}`} onBlur={handleBlur}>
      {/* Label + Icon */}
      <div className="flex gap-2">
        {additionalInfo && <CInfo color="#309eb5" width="18" height="18" />}
        <label htmlFor={name} className={sty?.label}>
          {label}
          {required && <span className={sty?.required}> *</span>}
        </label>
      </div>

      {/* Input Field */}
      <input
        type="text"
        id={name}
        name={name}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        placeholder={placeholder}
        className={
          sty?.input ||
          "w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        }
      />

      {/* Dropdown */}
      {isOpen && filteredData.length > 0 && (
        <div
          ref={dropdownRef}
          className={`absolute top-7/8 left-0 w-full max-w-[250px] mt-2 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto z-50 ${sty?.dropdown}`}
        >
          <ul>
            {filteredData.map((item, index) => (
              <li
                key={index}
                onClick={() => {
                  console.log(item);
                  setQuery(renderItem(item));
                  setIsOpen(false);
                  onSelect(item);
                }}
                className={`p-2 cursor-pointer hover:bg-gray-100 ${sty?.dropdownItem}`}
              >
                {renderItem(item)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CAutocomplete;

// EXTERNAL MODULES
import { useState, useRef } from "react";

// CUSTOM COMPONENTS
import { CInput } from "@customs/.";

// CUSTOM HOOKS
import useAutocomplete from "@hooks/useAutocomplete";

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
  data: T[];
  filterFn: (item: T, query: string) => boolean;
  onSelect: (selectedItem: T) => void;
  placeholder?: string;
  renderItem?: (item: T) => string;
  name: string;
  label: string;
  required?: boolean;
  additionalInfo?: string;
  sty?: CAutocompleteStyType;
};

/******************************************************************************/

const CAutocomplete = <T,>({
  data,
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
  const { query, setQuery, filteredData } = useAutocomplete(data, filterFn);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close the dropdown if the user clicks outside
  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!dropdownRef.current?.contains(e.relatedTarget)) {
      setIsOpen(false);
    }
  };

  return (
    <div className={`relative w-full ${sty?.container}`} onBlur={handleBlur}>
      <CInput
        name={name}
        label={label}
        type="text"
        value={query}
        placeholder={placeholder}
        required={required}
        additionalInfo={additionalInfo}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setQuery(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        sty={sty}
      />

      {/* Dropdown */}
      {isOpen && filteredData.length > 0 && (
        <div ref={dropdownRef} className={sty?.dropdown}>
          <ul>
            {filteredData.map((item, index) => (
              <li
                key={index}
                onMouseDown={(e) => {
                  e.preventDefault();
                  const selectedValue = renderItem(item);
                  setQuery(selectedValue);
                  setIsOpen(false);
                  onSelect(item);
                }}
                className={sty?.dropdownItem}
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

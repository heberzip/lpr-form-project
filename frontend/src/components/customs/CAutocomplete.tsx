// EXTERNAL MODULES
import { useState, useRef, forwardRef, useEffect, JSX } from "react";
// CUSTOM HOOKS
import useAutocomplete from "@hooks/useAutocomplete";
// CUSTOM COMPONENTS
import { CLabel } from "@customs/.";

/******************************************************************************/
// TYPES
export type CAutocompleteStyType = {
  container?: string;
  label?: string;
  required?: string;
  error?: string;
  input?: { standard: string; withPre: string };
  dropdown?: string;
  dropdownItem?: string;
};

type AutocompleteProps<T> = {
  name: string;
  label: string;
  type: string;
  value?: string;
  placeholder?: string;
  required?: boolean;
  additionalInfo?: string;
  error?: string;
  data: T[];
  filterFn: (item: T, query: string) => boolean;
  renderItem?: (item: T) => string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelect?: (selectedItem: T) => void;
  sty?: CAutocompleteStyType;
};

/******************************************************************************/
const CAutocomplete = <T,>(
  {
    name,
    label,
    type,
    value = "",
    placeholder,
    required,
    additionalInfo,
    error,
    data,
    filterFn,
    renderItem = (item) => String(item),
    onSelect,
    onChange,
    sty,
    ...rest
  }: AutocompleteProps<T>,
  ref: React.Ref<HTMLInputElement>
) => {
  const { setQuery, filteredData } = useAutocomplete(data, filterFn);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setQuery(value);
  }, [value, setQuery]);

  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!dropdownRef.current?.contains(e.relatedTarget)) {
      setIsOpen(false);
    }
  };

  return (
    <div className={`relative w-full ${sty?.container}`} onBlur={handleBlur}>
      {/* Label custom component */}
      <CLabel
        id={name}
        label={label}
        additionalInfo={additionalInfo}
        error={error}
        required={required}
      />

      {/* Input Field */}
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        autoComplete="off"
        onChange={(e) => {
          setQuery(e.target.value);
          setIsOpen(true);
          onChange?.(e);
        }}
        onFocus={() => setIsOpen(true)}
        className={`${sty?.input?.standard} ${error ? sty?.error : ""}`}
        ref={ref}
        {...rest}
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
                  onSelect?.(item);
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

export default forwardRef(CAutocomplete) as <T>(
  props: AutocompleteProps<T> & { ref?: React.Ref<HTMLInputElement> }
) => JSX.Element;

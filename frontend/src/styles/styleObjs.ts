// STYLES
import style from "@styles/global.style";
// STYLES CONFIGURATION
export const cInputSty = {
  container: style.input.container,
  label: style.input.label,
  required: style.input.required,
  input: style.input.standard,
};

export const cInputStyDisabled = {
  ...cInputSty,
  input: style.input.disabled,
  label: "text-gray-400",
  required: "text-gray-400",
};

export const cGridSty = {
  ...cInputSty,
  gridContainer: style.grid.container,
};

export const cAutocompleteSty = {
  ...cInputSty,
  dropdown: style.autocomplete.dropdown,
  dropdownItem: style.autocomplete.dropdownItem,
};

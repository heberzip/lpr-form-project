// CUSTOM COMPONENTS
import { CInfo } from "@customs/.";

/******************************************************************************/
// TYPES
export type CInputStyType = {
  container?: string;
  label?: string;
  required?: string;
  error?: string;
  disabled?: string;
  input?: string;
};

type CInputProps = {
  name: string;
  label: string;
  type: string;
  value?: string;
  placeholder: string;
  required?: boolean;
  additionalInfo?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  sty?: CInputStyType;
};

/******************************************************************************/

const CInput = ({
  name,
  label,
  type,
  value,
  placeholder,
  required = false,
  additionalInfo,
  onChange,
  onFocus,
  sty,
}: CInputProps) => {
  return (
    <div className={`w-full ${sty?.container}`}>
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
        id={name}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onFocus={onFocus}
        required={required}
        className={sty?.input}
      />
    </div>
  );
};

export default CInput;

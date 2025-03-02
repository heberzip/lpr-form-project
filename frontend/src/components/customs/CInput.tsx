// EXTERNAL MODULES
import { forwardRef } from "react";
// CUSTOM COMPONENTS
import { CInfoBtn } from "@customs/.";

/******************************************************************************/
// TYPES
export type CInputStyType = {
  container?: string;
  label?: string;
  required?: string;
  error?: string;
  disabled?: string;
  input?: { standard: string; withPre: string };
  pre?: string;
};

type CInputProps = {
  name: string;
  label: string;
  type: string;
  value?: string;
  placeholder?: string;
  required?: boolean;
  additionalInfo?: string;
  error?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  disabled?: boolean;
  sty?: CInputStyType;
  children?: React.ReactNode;
};

/******************************************************************************/

const CInput = forwardRef<HTMLInputElement, CInputProps>(
  (
    {
      name,
      label,
      type,
      placeholder,
      required,
      additionalInfo,
      error,
      onChange,
      onFocus,
      disabled,
      sty,
      children,
      ...rest
    },
    ref
  ) => {
    return (
      <div className={`w-full ${sty?.container}`}>
        {/* Label + Icon */}
        <div className="flex gap-2">
          {additionalInfo && (
            <CInfoBtn
              color="#309eb5"
              width="18"
              height="18"
              label={label}
              additionalInfo={additionalInfo}
            />
          )}
          <label htmlFor={name} className={sty?.label}>
            {label}
            {required && <span className={sty?.required}> *</span>}
          </label>
        </div>

        {/* Input Field */}
        <div className="flex gap-0">
          {(type === "tel" || type === "email") && (
            <div className={sty?.pre}>{children}</div>
          )}
          <input
            id={name}
            name={name}
            type={type}
            placeholder={placeholder}
            onChange={onChange}
            onFocus={onFocus}
            required={required}
            disabled={disabled}
            className={`${
              type === "tel" || type === "email"
                ? sty?.input?.withPre ?? ""
                : sty?.input?.standard ?? ""
            } ${error ? sty?.error : ""}`}
            ref={ref}
            {...rest}
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    );
  }
);

export default CInput;

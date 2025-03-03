// EXTERNAL MODULES
import { forwardRef } from "react";
// CUSTOM COMPONENTS
import { CLabel } from "@customs/.";

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
  id: string;
  label: string;
  additionalInfo?: string;
  type: string;
  placeholder?: string;
  required?: boolean;
  sty: CInputStyType;
  disabled?: boolean;
  error?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  children?: React.ReactNode;
};

/******************************************************************************/

const CInput = forwardRef<HTMLInputElement, CInputProps>(
  (
    {
      id,
      label,
      additionalInfo,
      type,
      placeholder,
      required,
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
        {/* Label custom component*/}
        <CLabel
          id={id}
          label={label}
          additionalInfo={additionalInfo}
          error={error}
          required={required}
        />

        {/* Input Field */}
        <div className="flex gap-0">
          {(type === "tel" || type === "email") && (
            <div className={sty?.pre}>{children}</div>
          )}
          <input
            id={id}
            type={type}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            onChange={onChange}
            onFocus={onFocus}
            className={`${
              type === "tel" || type === "email"
                ? sty?.input?.withPre ?? ""
                : sty?.input?.standard ?? ""
            } ${error ? sty?.error : ""}`}
            ref={ref}
            {...rest}
          />
        </div>
      </div>
    );
  }
);

export default CInput;

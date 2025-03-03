// CUSTOM COMPONENTS
import { CInfoBtn } from "@customs/.";
// STYLES
import style from "@styles/global.style";

/******************************************************************************/
// TYPES
type CLabelProps = {
  id: string;
  label: string;
  additionalInfo?: string;
  error?: string;
  required?: boolean;
};
/******************************************************************************/

const CLabel = ({
  id,
  label,
  additionalInfo,
  error,
  required,
}: CLabelProps) => {
  return (
    <div className="flex justify-between">
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
        <label htmlFor={id} className={`${style.input.label} flex`}>
          {label}
          {required && (
            <span className={`${style.input.required} ml-1`}>*</span>
          )}
        </label>
      </div>
      {error && (
        <p className="text-red-400 text-xs italic mt-1.5 font-semibold">
          {error}
        </p>
      )}
    </div>
  );
};

export default CLabel;

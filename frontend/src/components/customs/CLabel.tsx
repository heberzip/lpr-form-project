// EXTERNAL MODULES
import { useSelector } from "react-redux";
// CUSTOM COMPONENTS
import { CInfoBtn } from "@customs/.";
// STORE
import { selectInfo } from "@store/slices/infoSlice";
// ANIMATIONS
import UnderlineEffect from "@components/animations/UnderlineEffect";
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
  // Selects the current state of the infoSlice
  const info = useSelector(selectInfo);

  return (
    <div className="flex justify-between">
      <div className="flex gap-2">
        {additionalInfo ? (
          <CInfoBtn
            color={error && error.length > 0 ? "#f56565" : "#309eb5"}
            width="18"
            height="18"
            label={label}
            additionalInfo={additionalInfo}
            error={error}
          />
        ) : error && error?.length > 0 ? (
          <CInfoBtn
            color={error && error.length > 0 ? "#f56565" : "#309eb5"}
            width="18"
            height="18"
            label={label}
            error={error}
          />
        ) : null}
        <label htmlFor={id} className={`${style.input.label} flex`}>
          {/* If the current state for the infoSlice shows the label */}
          {/* then it will be underlined */}
          {
            info.label === label ? (
              <UnderlineEffect error={error}>{label}</UnderlineEffect>
            ) : error && error?.length > 0 ? (
              <span className="text-red-600 font-semibold">{label}</span>
            ) : (
              label
            ) // Otherwise, it will be the label
          }
          {required && (
            <span className={`${style.input.required} ml-1`}>*</span>
          )}
        </label>
      </div>
      {/* {error && (
        <p className="text-red-400 text-xs italic mt-1.5 font-semibold">
          {error}
        </p>
      )} */}
    </div>
  );
};

export default CLabel;

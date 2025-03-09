// STORE
import { useAppDispatch } from "@store/store";
import { setInfo } from "@store/slices/infoSlice";
// STYLES
import style from "@styles/global.style";

/******************************************************************************/
// TYPES
type CInfoBtnProps = {
  color?: string;
  width?: string;
  height?: string;
  label: string;
  additionalInfo?: string;
  error?: string;
};
/******************************************************************************/

const CInfoBtn = ({
  color,
  width,
  height,
  label,
  additionalInfo,
  error,
}: CInfoBtnProps) => {
  const dispatch = useAppDispatch();

  // Handles the click event and dispatches the infoSlice
  const handleShowInfo = () => {
    dispatch(
      setInfo({
        label,
        additionalInfo: error ? error : additionalInfo,
      })
    );
  };

  return (
    <button
      type="button"
      className={error && error.length > 0 ? style.cinfoError : style.cinfo}
      onClick={handleShowInfo}
      tabIndex={-1} // Prevents the button from being focusable with the keyboard
    >
      {error && error.length > 0 ? (
        <svg
          width={width || "24"}
          height={height || "24"}
          viewBox={`0 0 24 24`}
        >
          <path
            fill="currentColor"
            d="m6 18l-2.3 2.3q-.475.475-1.088.213T2 19.575V4q0-.825.588-1.412T4 2h16q.825 0 1.413.588T22 4v12q0 .825-.587 1.413T20 18zm6-6.6l1.9 1.9q.275.275.7.275t.7-.275t.275-.7t-.275-.7L13.4 10l1.9-1.9q.275-.275.275-.7t-.275-.7t-.7-.275t-.7.275L12 8.6l-1.9-1.9q-.275-.275-.7-.275t-.7.275t-.275.7t.275.7l1.9 1.9l-1.9 1.9q-.275.275-.275.7t.275.7t.7.275t.7-.275z"
          />
        </svg>
      ) : (
        <svg
          width={width || "24"}
          height={height || "24"}
          viewBox={`0 0 24 24`}
        >
          <path
            fill={color || "currentColor"}
            fillRule="evenodd"
            d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11s11-4.925 11-11S18.075 1 12 1m-.5 5a1 1 0 1 0 0 2h.5a1 1 0 1 0 0-2zM10 10a1 1 0 1 0 0 2h1v3h-1a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-1v-4a1 1 0 0 0-1-1z"
            clipRule="evenodd"
          />
        </svg>
      )}
    </button>
  );
};

export default CInfoBtn;

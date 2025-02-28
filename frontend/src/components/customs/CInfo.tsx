// EXTERNAL MODULES
import { useSelector } from "react-redux";
import { useEffect } from "react";
// STORE
import { useAppDispatch } from "@store/store";
import { setInfo, selectInfo } from "@store/slices/infoSlice";
// STYLES
import style from "@styles/global.style";

/******************************************************************************/
// TYPES
type CInfoProps = {
  color?: string;
  width?: string;
  height?: string;
  label: string;
  additionalInfo: string;
};
/******************************************************************************/

const CInfo = ({ color, width, height, label, additionalInfo }: CInfoProps) => {
  const dispatch = useAppDispatch();
  const info = useSelector(selectInfo);

  useEffect(() => {
    if (info.label) {
      console.log(info);
    }
  }, [dispatch]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleShowInfo = () => {
    dispatch(
      setInfo({
        label,
        additionalInfo,
      })
    );
    console.log(info);
  };

  return (
    <button type="button" className={style.cinfo} onClick={handleShowInfo}>
      <svg width={width || "24"} height={height || "24"} viewBox={`0 0 24 24`}>
        <path
          fill={color || "currentColor"}
          fillRule="evenodd"
          d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11s11-4.925 11-11S18.075 1 12 1m-.5 5a1 1 0 1 0 0 2h.5a1 1 0 1 0 0-2zM10 10a1 1 0 1 0 0 2h1v3h-1a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-1v-4a1 1 0 0 0-1-1z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  );
};

export default CInfo;

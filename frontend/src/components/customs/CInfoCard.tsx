// EXTERNAL MODULES
import { useSelector } from "react-redux";
import { useAppDispatch } from "@store/store";
import { selectInfo, clearInfo } from "@store/slices/infoSlice";
// STYLES
import style from "@styles/global.style";

/******************************************************************************/
// COMPONENT
const CInfoCard = () => {
  const dispatch = useAppDispatch();
  const info = useSelector(selectInfo);

  if (!info.label) return null; // No renderizar si no hay información

  return (
    <div className={style.cinfoCard.container}>
      {/* Header */}
      <div className={style.cinfoCard.infoCardHeader}>
        <h4 className={style.cinfoCard.infoCardTitle}>{info.label}</h4>
        <button
          className={style.cinfoCard.infoCardClose}
          onClick={() => dispatch(clearInfo())}
        >
          ✖
        </button>
      </div>

      {/* Information */}
      <p className={style.cinfoCard.infoCardContent}>{info.additionalInfo}</p>
    </div>
  );
};

export default CInfoCard;

// EXTERNAL MODULES
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// STORE
import { useAppDispatch } from "@store/store";
import { RootState } from "@store/store";
import { clearInfo } from "@store/slices/infoSlice";
// STYLES
import style from "@styles/global.style";

/******************************************************************************/
// TYPES
type CNavigationProps = {
  formState?: any; // eslint-disable-line
  isSectionFilled?: (state: RootState) => boolean | undefined;
};
/******************************************************************************/

const CNavigation = ({ formState, isSectionFilled }: CNavigationProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isFilled = useSelector(isSectionFilled!);
  const sections = [
    "/",
    "/company",
    "/contact",
    "/communication",
    "/bank",
    "/fleet",
    "/extras",
    "/meeting-point",
  ];

  const currentIndex = sections.indexOf(location.pathname);

  const goPrevious = () => {
    if (currentIndex > 0) {
      dispatch(clearInfo());
      navigate(sections[currentIndex - 1]);
    }
  };

  const goNext = () => {
    const isValid = formState.isValid && isFilled;
    if (isValid) {
      dispatch(clearInfo());
      navigate(sections[currentIndex + 1]);
    }
  };

  return (
    <>
      <div className={style.button.panel}>
        <button
          type="button"
          onClick={goPrevious}
          className={style.button.previous}
        >
          Previous
        </button>
        <button
          type="submit"
          onClick={goNext}
          disabled={currentIndex === sections.length - 1 || !isFilled}
          className={`${style.button.next} ${
            !isFilled ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default CNavigation;

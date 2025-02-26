// EXTERNAL MODULES
import { useLocation, useNavigate } from "react-router-dom";

// STYLES
import style from "@styles/global.style";

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
const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const currentIndex = sections.indexOf(location.pathname);

  const goPrevious = () => {
    if (currentIndex > 0) {
      navigate(sections[currentIndex - 1]);
    }
  };

  const goNext = () => {
    if (currentIndex < sections.length - 1) {
      navigate(sections[currentIndex + 1]);
    }
  };

  return (
    <div>
      {currentIndex === 0 ? (
        <button onClick={goNext} className={style.button.start}>
          Start
        </button>
      ) : (
        <div className={style.button.panel}>
          <button onClick={goPrevious} className={style.button.previous}>
            Previous
          </button>
          <button
            onClick={goNext}
            disabled={currentIndex === sections.length - 1}
            className={style.button.next}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Navigation;

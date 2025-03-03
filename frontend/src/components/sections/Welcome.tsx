// EXTERNAL MODULES
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
// STORE
import { initializeLoaded } from "@store/middlewares/loadedThunks";
import { selectLoaded } from "@store/slices/loadedSlice";
import { useAppDispatch } from "@store/store";
// STYLES
import style from "@styles/global.style";

/******************************************************************************/

const Welcome = () => {
  const dispatch = useAppDispatch();
  const { search } = useLocation();
  const { supplier, airports } = useSelector(selectLoaded);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(initializeLoaded(search));
  }, [dispatch, search]);

  return (
    <section
      id="welcome"
      className="flex flex-col items-center justify-center m-10 gap-4"
    >
      <h1>Welcome to our Local Partner Registration Form!</h1>
      <p>
        By completing this form, you'll provide us with the information we need
        for daily operations such as reservation management, billing, etc.{" "}
      </p>
      <p>
        Please ensure that you fill out all required fields marked with an
        asterisk (*). If you have any questions, feel free to reach out to us
        at:
      </p>
      <p>
        <span>( partners@ziptransfers.com )</span>
      </p>
      {supplier && airports.length > 0 && (
        <>
          <p>{supplier}</p>
          <p>{airports.join(", ")}</p>
        </>
      )}

      <button
        onClick={() => navigate("/company")}
        className={style.button.next}
      >
        Start
      </button>
    </section>
  );
};

export default Welcome;

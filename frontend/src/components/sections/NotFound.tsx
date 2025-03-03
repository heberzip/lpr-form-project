// EXTERNAL MODULES
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
// STORE
import { selectLoaded } from "@store/slices/loadedSlice";
import zipy_404 from "@assets/images/Zipy_404.svg";
// import homeIcon from "@assets/images/homeIcon.svg";
// STYLES
import style from "@styles/global.style";

/******************************************************************************/

const NotFound = () => {
  const { supplier, airports } = useSelector(selectLoaded);
  return (
    <section
      id="not-found"
      className="flex flex-col items-center justify-center text-center space-y-4 p-6"
    >
      <img
        src={zipy_404}
        alt="404"
        className="min-w-2xs w-xs md:w-md opacity-90"
      />
      <h2 className="text-2xl font-bold text-zip-blue2-500">Are you lost?</h2>
      <p className="text-gray-700 max-w-md px-6 text-lg leading-relaxed">
        It looks like the page you're looking for doesn't exist or has been
        moved. But don't worry!{" "}
        <span className="text-zip-yellow-500 font-semibold">
          We're here to guide you back on track.
        </span>
      </p>
      <p className="text-gray-500 max-w-md px-4 italic">
        Click the button below to return to the home page and continue your
        journey with us.
      </p>
      <Link to={`/?supplier=${supplier}&airports=${airports.join(",")}`}>
        <button className={style.button.next}>Home</button>
      </Link>
    </section>
  );
};

export default NotFound;

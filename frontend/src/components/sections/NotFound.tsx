// EXTERNAL MODULES
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

// STORE
import { selectLoaded } from "@store/slices/loadedSlice";
import zipy_404 from "@assets/images/Zipy_404.svg";

/******************************************************************************/

const NotFound = () => {
  const { supplier, airports } = useSelector(selectLoaded);
  return (
    <section
      id="not-found"
      className="flex flex-col items-center justify-center"
    >
      <img src={zipy_404} alt="404" className="min-w-sm w-md opacity-90" />
      <Link to={`/?supplier=${supplier}&airports=${airports.join(",")}`}>
        <button className="bg-zip-blue2-500 text-white px-6 py-1 min-w-[150px] rounded-md shadow-xl hover:bg-zip-blue2-600 active:bg-zip-blue2-800 active:size-0.95 transition disabled:opacity-50">
          home
        </button>
      </Link>
    </section>
  );
};

export default NotFound;

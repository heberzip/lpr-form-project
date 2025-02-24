// EXTERNAL MODULES
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

// STORE
import { selectLoaded } from "@store/slices/loadedSlice";

/******************************************************************************/

const NotFound = () => {
  const { supplier, airports } = useSelector(selectLoaded);
  return (
    <section id="not-found">
      <h1>404</h1>
      <p>Page not found</p>
      <p>The page you are looking for does not exist.</p>
      <p>Please check the URL or contact the website administrator.</p>
      <p>Thank you for using our website.</p>
      <Link to={`/?supplier=${supplier}&airports=${airports.join(",")}`}>
        <button>home</button>
      </Link>
    </section>
  );
};

export default NotFound;

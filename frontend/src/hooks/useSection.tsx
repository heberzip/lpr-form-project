// EXTERNAL MODULES
import { useLocation } from "react-router-dom";

// DATA
import formData from "@data/sectionsData.json";

/******************************************************************************/

const useSection = () => {
  const location = useLocation();

  const section = formData.find(
    (section) => section.link === location.pathname
  );

  return section;
};

export default useSection;

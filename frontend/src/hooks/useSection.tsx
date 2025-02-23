import { useLocation } from "react-router-dom";

import formData from "../assets/sectionsData.json";

const useSection = () => {
  const location = useLocation();

  const section = formData.find(
    (section) => section.link === location.pathname
  );

  return section;
};

export default useSection;

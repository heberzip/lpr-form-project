import { NavLink, useLocation } from "react-router-dom";
//import { FaUserCircle } from "react-icons/fa";
import UserIcon from "@components/icons/UserIcon";
import ArrowIcon from "@components/icons/ArrowIcon";
import { motion } from "framer-motion";

import { useFormStatus } from "@hooks/useFormStatus";

const sections = [
  { path: "/company", label: "Company details" },
  { path: "/contact", label: "Contact person" },
  { path: "/communication", label: "Communication" },
  { path: "/bank", label: "Bank deuails" },
  { path: "/fleet", label: "Fleet info" },
  { path: "/extras", label: "Extras info" },
  { path: "/meeting-point", label: "Meeting Point" },
];

type SidebarProps = {
  userName: string;
  formStatus: boolean[];
};

const Sidebar = ({ userName }: { userName: string }) => {
  const formStatus = useFormStatus();

  return <SidebarUI userName={userName} formStatus={formStatus} />;
};

export default Sidebar;

const SidebarUI = ({ userName, formStatus }: SidebarProps) => {
  const location = useLocation();
  return (
    <aside className="w-64 text-white flex flex-col">
      {/* Usuario */}
      <div className="flex items-center mb-4 gap-4">
        <UserIcon width={25} height={25} />
        <div className="flex items-center text-center text-xl font-bold">
          {userName}
        </div>
      </div>

      <hr className="border-1 border-gray-300 mb-4 w-full rounded-2xl" />

      {/* Navegación */}
      <nav className="flex flex-col gap-2">
        {sections.map((section, index) => (
          <NavLink
            key={section.path}
            to={formStatus[index] ? section.path : "#"}
            className={`rounded p-1 ${
              formStatus[index] && !(sections[index].path === location.pathname)
                ? "text-gray-200 hover:text-zip-yellow-200"
                : sections[index].path === location.pathname
                ? "flex pl-0 gap-0 text-zip-yellow-400"
                : "text-gray-400 opacity-50 cursor-not-allowed"
            }`}
          >
            <motion.span
              className={"flex"}
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              whileHover={formStatus[index] ? { scale: 1.02 } : {}}
            >
              {sections[index].path === location.pathname && (
                <motion.div
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <ArrowIcon />
                </motion.div>
              )}
              <motion.span
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                {section.label}
              </motion.span>
            </motion.span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

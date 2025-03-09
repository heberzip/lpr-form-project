// EXTERNAL MODULES
import { motion } from "framer-motion";

/******************************************************************************/

const UnderlineEffect = ({
  children,
  error,
}: {
  children: React.ReactNode;
  error?: string;
}) => {
  return (
    <div
      className={`relative inline-block ${
        error && error.length > 0 ? "text-red-600" : "text-zip-blue2-600"
      } font-bold`}
    >
      {children}
      <motion.div
        className={`absolute bottom-0 left-0 w-full h-[2px] ${
          error && error.length > 0 ? "bg-red-400" : "bg-[#309eb5]"
        } rounded-lg`}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        exit={{ scaleX: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />
    </div>
  );
};

export default UnderlineEffect;

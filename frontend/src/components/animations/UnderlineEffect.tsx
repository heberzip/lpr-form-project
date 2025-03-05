// EXTERNAL MODULES
import { motion } from "framer-motion";

/******************************************************************************/

const UnderlineEffect = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative inline-block text-zip-blue2-600 font-bold">
      {children}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-[2px] bg-[#309eb5] rounded-lg"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        exit={{ scaleX: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />
    </div>
  );
};

export default UnderlineEffect;

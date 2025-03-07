// EXTERNAL MODULES
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";

/******************************************************************************/

const pageVariants = {
  initial: { opacity: 0, x: -10 },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
};

type SectionTransitionProps = {
  children: React.ReactNode;
};

const SectionTransition = ({ children }: SectionTransitionProps) => {
  const location = useLocation();
  return (
    <motion.div
      key={location.pathname}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      className="w-full"
    >
      {children}
    </motion.div>
  );
};

export default SectionTransition;

import { AnimatePresence, motion } from "framer-motion";
export const PageAnimation = ({
    children,
  initial = { opacity: 0 },
  animate = { opacity: 1 },
  transition = { duration: 1 },
  className,
  key_value,
}) => {
  return (
    <AnimatePresence>
      <motion.div
        key={key_value}
        initial={initial}
        animate={animate}
        transition={transition}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

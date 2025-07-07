import { motion } from "framer-motion";
import { ReactNode } from "react";

export function AnimatedCard({
  children,
  hoverEffect = "none",
}: {
  children: ReactNode;
  className?: string;
  hoverEffect?: "float" | "scale" | "none";
}) {
  const effects = {
    float: { y: -5 },
    scale: { scale: 1.02 },
  };

  const hoverProps =
    hoverEffect !== "none" ? { whileHover: effects[hoverEffect] } : {};

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { delay: 1 * 0.1, duration: 0.5, ease: "backOut" },
      }}
      whileHover={{
        y: -5,
        scale: 1.02,
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
        transition: { type: "spring", stiffness: 300 },
      }}
      {...hoverProps}
    >
      {children}
    </motion.div>
  );
}

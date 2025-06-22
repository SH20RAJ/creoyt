"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ParallaxFloatingProps {
  children: ReactNode;
  intensity?: number;
  className?: string;
}

export function ParallaxFloating({
  children,
  intensity = 0.01,
  className,
}: ParallaxFloatingProps) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -10, 0],
        rotate: [0, 1, 0],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      style={{
        transform: `translate3d(0, ${intensity * 100}px, 0)`,
      }}
    >
      {children}
    </motion.div>
  );
}
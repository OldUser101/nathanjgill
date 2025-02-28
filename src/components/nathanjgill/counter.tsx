"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";

interface CounterProps {
  target: number;
  duration?: number; // in seconds
}

const Counter: React.FC<CounterProps> = ({ target, duration = 2 }) => {
  const count = useMotionValue(0);
  useTransform(count, (latest) => Math.floor(latest)); // Keeps whole numbers
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const controls = animate(count, target, {
      duration,
      ease: "easeOut",
      onUpdate: (latest) => setDisplay(Math.floor(latest)), // Ensures re-render
    });

    return () => controls.stop(); // Cleanup animation on unmount
  }, [count, target, duration]);

  return (
    <motion.span className="text-3xl font-bold">
      {display}
    </motion.span>
  );
};

export default Counter;

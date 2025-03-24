"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";

interface CounterProps {
  target: number;
  duration?: number;
  className?: string;
}

const Counter: React.FC<CounterProps> = ({ target, duration = 2, className = "text-3xl font-bold"}) => {
  const count = useMotionValue(0);
  useTransform(count, (latest) => Math.floor(latest));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const controls = animate(count, target, {
      duration,
      ease: "easeOut",
      onUpdate: (latest) => setDisplay(Math.floor(latest)),
    });

    return () => controls.stop();
  }, [count, target, duration]);

  return (
    <motion.span className={className}>
      {display}
    </motion.span>
  );
};

export default Counter;

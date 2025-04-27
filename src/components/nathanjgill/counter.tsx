"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState, useRef } from "react";

interface CounterProps {
    target: number;
    duration?: number;
    className?: string;
}

export default function Counter({ target, duration = 2, className = "text-3xl font-bold"}: CounterProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const [width, setWidth] = useState<number>(0);
    const count = useMotionValue(0);
    useTransform(count, (latest) => Math.floor(latest));
    const [display, setDisplay] = useState(0);

    useEffect(() => {
        if (ref.current) {
            setWidth(ref.current.offsetWidth);
        }

        const controls = animate(count, target, {
            duration,
            ease: "easeOut",
            onUpdate: (latest) => setDisplay(Math.floor(latest)),
        });

        return () => controls.stop();
    }, [count, target, duration]);

    return (
        <span style={{ position: "relative", display: "inline-block", width: width ? `${width}px` : undefined, textAlign: "center" }}>
            <motion.span className={className}>
                {display}
            </motion.span>
            <span ref={ref} style={{ position: "absolute", visibility: "hidden", whiteSpace: "nowrap", pointerEvents: "none", userSelect: "none" }} className={className}>
                {target}
            </span>
        </span>
    );
};

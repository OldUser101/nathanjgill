"use client"

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function Hero() {
    return (
        <motion.div animate={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 20 }} transition={{ duration: 0.5 }} className="border-b border-b-neutral-700 p-6">
            <h1 className="text-4xl font-bold pb-3">Engineering the Future</h1>
            <h1 className="text-lg font-light">Explore a collection of innovative projects, tutorials, and resources built to inspire and empower.</h1>
            <h1 className="text-lg font-light pb-3">From cross-platform apps to in-depth guides, see how technology is shaping the future.</h1>
            <div className="grid grid-cols-2 gap-4 max-w-max content-start">
                <Button>Explore Projects</Button>
                <Button variant="ghost">Explore Tutorials</Button>
            </div>
        </motion.div>
    );
}
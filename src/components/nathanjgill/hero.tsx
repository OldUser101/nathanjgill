"use client"

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function Hero() {
    return (
        <motion.div animate={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 20 }} transition={{ duration: 0.5 }} className="border-b border-b-neutral-700 p-6">
            <h1 className="text-4xl font-bold pb-3">Code Beyond Boundaries</h1>
            <h1 className="text-lg font-light">Explore projects and tutorials to unlock new skills and push the limits of your development potential.</h1>
            <h1 className="text-lg font-light pb-3">Discover powerful tools and techniques that help you elevate your skills to the next level.</h1>
            <div className="grid grid-cols-2 gap-4 max-w-max content-start">
                <Button>Explore Projects</Button>
                <a href="/tutorials"><Button variant="ghost">Explore Tutorials</Button></a>
            </div>
        </motion.div>
    );
}
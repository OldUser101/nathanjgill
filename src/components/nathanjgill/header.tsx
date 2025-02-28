"use client"

import { ModeToggle } from "@/components/nathanjgill/mode-toggle";
import { Navbar } from "@/components/nathanjgill/navbar";
import { IconText } from "@/components/nathanjgill/icon-text";
import { motion } from "framer-motion";

export function HeaderPanel() {
  return (
    <motion.header initial={{ opacity: 0, y: -20}} animate={{opacity: 1, y: 0}} transition={{duration: 0.5}} className="border-b border-b-neutral-700 h-14 justify-between flex items-center select-none forecolor p-3 backdrop-blur-lg fixed top-0 left-0 w-full z-50 dark:backdrop-brightness-[0.55] ">
        <div className="h-16 flex items-center space-x-3 forecolor hidden md:flex">
            <IconText/>
            <Navbar/>
        </div>

        <div className="md:hidden">
          <IconText/>
        </div>

        <div className="md:hidden">
          <Navbar/>
        </div>

        <div className="hidden md:flex">
          <ModeToggle/>
        </div>
    </motion.header>
  );
}
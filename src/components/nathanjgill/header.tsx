"use client"

import { ModeToggle } from "@/components/nathanjgill/mode-toggle";
import { Navbar } from "@/components/nathanjgill/navbar";
import { IconText } from "@/components/nathanjgill/icon-text";
import { motion } from "framer-motion";
import { Tutorial } from "@/lib/tutorial";

interface HeaderPanelProps {
  fixed?: boolean,
  useChapter?: boolean,
  tutorial?: Tutorial,
  slug?: string,
  completedChapters?: boolean[]
}

export function HeaderPanel({ fixed, useChapter, tutorial, slug, completedChapters }: HeaderPanelProps) {
  const actuallyFixed = fixed !== undefined;
  return (
    <motion.header initial={{ opacity: 0, y: -20}} animate={{opacity: 1, y: 0}} transition={{duration: 0.5}} className={`border-b border-b-neutral-700 h-14 justify-between flex items-center select-none forecolor p-3 backdrop-blur-lg ${actuallyFixed ? `fixed` : `fixed md:relative`} top-0 left-0 w-full z-50 dark:backdrop-brightness-[0.55]`}>
        <div className="h-16 flex items-center space-x-3 forecolor hidden md:flex">
            <IconText/>
            <Navbar />
        </div>

        <div className="md:hidden">
          <IconText/>
        </div>

        <div className="md:hidden">
          <Navbar useChapter={useChapter} tutorial={tutorial} slug={slug} completedChapters={completedChapters}/>
        </div>

        <div className="hidden md:flex items-center gap-2">
          <p className="preview font-bold border-dashed border-2 text-neutral-700 text-sm dark:text-neutral-400 border-neutral-700 dark:border-neutral-400 rounded-md px-1">
            Preview
          </p>
          <ModeToggle/>
        </div>
    </motion.header>
  );
}
"use client"

import { Project } from "@/lib/project";
import { HeaderPanel } from "./header";
import { FooterPanel } from "./footer";
import MarkdownRenderer from "./markdownRenderer";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { Button } from "../ui/button";
import { SquareArrowOutUpRight, Code } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";

interface ProjectPageProps {
    project: Project,
}

export function ProjectPage({ project } : ProjectPageProps) {
    const { theme } = useTheme();

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);
    }, []);
  
    if (!mounted) return null;

    return (
        <div className="font-sans">
            <HeaderPanel fixed/>
            <div className="h-14"/>

            <main className="p-6">
                <motion.div animate={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 20 }} transition={{ duration: 0.5 }} className="mx-4">
                    <div className="flex justify-center">
                        <div className="w-full lg:w-3/5">
                            { theme === "light" ? 
                                <Image src={project.banner_light} className="rounded-lg" alt="Banner Image" width={project.banner_light_width} height={project.banner_light_height}/>
                                :<Image src={project.banner_dark} className="rounded-lg" alt="Banner Image" width={project.banner_dark_width} height={project.banner_dark_height}/>
                            }                   
                        </div>
                    </div>

                    <div className="text-center pt-10 pb-4">
                        <h1 className="text-4xl font-bold mb-3">{project.title}</h1>
                        <h2 className="text-3xl font-light mb-3">{project.description}</h2>
                    </div>

                    <div className="flex justify-center pb-8 gap-4">
                        <p className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-400 justify-self-end">
                            <Code size={16} />
                            <span>Language: {project.language}</span>
                        </p>
                        <a href={project.url} target="_blank" rel="noopener noreferrer">
                            <Button variant="outline" className="w-full">
                                <SquareArrowOutUpRight />
                                Project Page
                            </Button>
                        </a>
                     </div>

                    <div className="flex justify-center">
                        <div className="w-full lg:w-3/5">
                            <MarkdownRenderer markdownUrl={project.content} />
                        </div>
                    </div>
                </motion.div>
            </main>
            <div className="w-full border-b border-neutral-700"/>
            <FooterPanel/>
        </div>
    );
} 
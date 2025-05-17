"use client"

import { Project } from "@/lib/project";
import { motion } from "framer-motion";
import { ProjectCard } from "./project_card";

interface ProjectGridProps {
    projects: Project[]
}

export function ProjectGrid({ projects }: ProjectGridProps) {
    return (                
        <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{duration: 0.5}} className="group border-b border-b-neutral-700 flex  pb-6 flex-col">
            <div className="border-b border-neutral-700 p-6">
                <h1 className="text-4xl font-semibold pb-3">Projects</h1>
                <h1 className="text-lg font-light">Explore my portfolio of applications, tools, and experiments in software development.</h1>
                <h1 className="text-lg font-light">Each project reflects my approach to coding, problem-solving, and innovation.</h1>
            </div>
            <div className="grid lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-2 gap-4 w-full px-4 pt-6 items-stretch">
                {projects.map((p, i) => {
                    return (<ProjectCard project={p} key={i}/>);
                })}
            </div>
        </motion.div>
    );
}
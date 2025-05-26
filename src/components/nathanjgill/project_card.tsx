"use client"

import { Project } from "@/lib/project";
import { Card } from "../ui/card";
import { useTheme } from "next-themes";
import { Code, SquareArrowOutUpRight } from "lucide-react";
import { Button } from "../ui/button";
import { useState, useEffect } from "react";
import Image from "next/image";

interface ProjectCardProps {
    project: Project
};

export function ProjectCard({ project }: ProjectCardProps) {
    const { theme } = useTheme();

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);
    }, []);
  
    if (!mounted) return null;

    return (
        <Card className="flex flex-col h-full overflow-y-hidden overflow-x-hidden">
            { theme === "light" ? 
                <img src={project.banner_light} alt="Banner Image" width={project.banner_light_width} height={project.banner_light_height}/>
                :<img src={project.banner_dark} alt="Banner Image" width={project.banner_dark_width} height={project.banner_dark_height}/>
            }
            <div className="p-4 h-full flex flex-col select-none">
                <a href={`/projects/${project.slug}`} className="font-semibold text-xl pb-2 hover:underline">{project.title}</a>
                <p className="text-lg font-light">{project.description}</p>
                <div className="mt-auto">
                    <p className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-400 mt-2 justify-self-end">
                        <Code size={16} />
                        <span>Language: {project.language}</span>
                    </p>
                    <div className="grid grid-cols-2 gap-4 pt-4">
                        <a href={project.url} target="_blank" rel="noopener noreferrer">
                            <Button variant="outline" className="w-full">
                                <SquareArrowOutUpRight />
                                Project Page
                            </Button>
                        </a>
                        <a href={`/projects/${project.slug}`}>
                            <Button className="w-full">
                                Read More
                            </Button>
                        </a>
                    </div>
                </div>
            </div>
        </Card>
    );
}
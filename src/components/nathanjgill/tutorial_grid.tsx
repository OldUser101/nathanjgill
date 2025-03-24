"use client"

import { motion } from "framer-motion";
import { TutorialCard } from "./tutorial_card";
import { Tutorial } from "@/lib/tutorial";

interface TutorialGridProps {
    tutorials: Tutorial[]
}

export function TutorialGrid({ tutorials }: TutorialGridProps) {
    return (                
        <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{duration: 0.5}} className="group border-b border-b-neutral-700 flex  pb-6 flex-col">
            <div className="border-b border-neutral-700 p-6">
                <h1 className="text-4xl font-semibold pb-3">Tutorials</h1>
                <h1 className="text-lg font-light">Step-by-step guides and insights to help you master programming, from fundamentals to advanced techniques.</h1>
                <h1 className="text-lg font-light">Explore practical examples and hands-on projects to sharpen your skills.</h1>
            </div>
            <div className="grid lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-2 gap-4 w-full px-4 pt-6">
                {tutorials.map((t, i) => {
                    return (<TutorialCard tutorial={t} key={i}/>);
                })}
            </div>
        </motion.div>
    );
}
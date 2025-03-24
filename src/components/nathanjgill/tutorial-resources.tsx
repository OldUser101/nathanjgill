import { Tutorial, Chapter } from "@/lib/tutorial";
import { useState, useEffect } from "react";

interface TutorialResourcesProps {
    tutorial: Tutorial
}

export function TutorialResources({ tutorial }: TutorialResourcesProps) {
    const [chapters, setChapters] = useState<Chapter[]>([]);

    useEffect(() => {
        const newChapters: Chapter[] = [];
        tutorial.chapters.map((c) => {
            if (c.resources !== undefined) {
                if (c.resources.length > 0) {
                    newChapters.push(c);
                }
            }
        })
        setChapters(newChapters);
    },[tutorial.chapters]);

    return (
        <div className="w-full border-b border-neutral-700 p-6">
            <h1 className="text-3xl font-semibold text-center">Resources</h1>
            <div className="flex justify-center gap-4 mt-4 pb-2">
                {chapters.map((c, i) => {
                    return (
                        <div key={i}>
                            <h3 className="font-semibold text-lg p-1">Chapter {i + 2}: {c.title}</h3>
                            <ul className="text-sm text-gray-700 dark:text-gray-400 space-y-2 ml-2">
                                {c.resources?.map((r, j) => {
                                    return (
                                        <li key={j}><a href={r.path} target="_blank" rel="noopener noreferrer" className="hover:text-black dark:hover:text-white transition-colors">{r.title}</a></li>
                                    );
                                })}
                            </ul>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
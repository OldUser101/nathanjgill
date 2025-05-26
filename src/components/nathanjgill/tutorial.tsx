"use client"

import { useState, useEffect } from "react";
import { Chapter, Tutorial } from "@/lib/tutorial";
import { HeaderPanel } from "./header";
import { FooterPanel } from "./footer";
import MarkdownRenderer from "./markdownRenderer";
import { TutorialHeaderPanel } from "./tutorial_header";
import { TutorialNav } from "./tutorial_nav";
import { motion } from "framer-motion";
import { TutorialResources } from "./tutorial-resources";

export interface TutorialPageProps {
    slug: string,
    chapterNumber: number,
    tutorial: Tutorial,
    completedChapters: boolean[],
}

const toBoolean = (value: string): boolean => value.toLowerCase() === 'true';

export default function TutorialPage({ slug, chapterNumber, tutorial }: TutorialPageProps) {
    const chapter: Chapter = tutorial.chapters[chapterNumber];
    const [completedChapters, setCompletedChapters] = useState<boolean[]>([]);

    useEffect(() => {
        const storedProgress = tutorial.chapters.map((_, c) =>
            toBoolean(localStorage.getItem(`${slug}_${c}_complete`) ?? "")
        );
        setCompletedChapters(storedProgress);
    }, [slug, tutorial.chapters.length, tutorial.chapters]);

    const markChapterComplete = (index: number) => {
        const updatedChapters = [...completedChapters];
        updatedChapters[index] = true;

        setCompletedChapters(updatedChapters);
        localStorage.setItem(`${slug}_${index}_complete`, "true");
    };

    const markChapterIncomplete = (index: number) => {
        const updatedChapters = [...completedChapters];
        updatedChapters[index] = false;

        setCompletedChapters(updatedChapters);
        localStorage.setItem(`${slug}_${index}_complete`, "false");
    };

    return (
        <div>

            <div className="md:hidden">
                <HeaderPanel useChapter={true} tutorial={tutorial} slug={slug} completedChapters={completedChapters}/>
            </div>

            <div className="hidden md:block">
                <HeaderPanel />
            </div>

            <div className="hidden md:block h-4"/>
            <TutorialHeaderPanel slug={slug} chapterNumber={chapterNumber} tutorial={tutorial} completedChapters={completedChapters}/>
            <div className="h-14 md:h-2"/>
            <main>
                <motion.div animate={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 20 }} transition={{ duration: 0.5 }} className="mx-4">
                    <div className="text-center py-10">
                        <h1 className="text-4xl font-bold mb-3">{tutorial.title}</h1>
                        <h1 className="text-4xl font-light mb-3">Chapter {chapterNumber + 1}: {chapter.title}</h1>
                    </div>

                    <div className="flex justify-center">
                    <div className="w-full lg:w-3/5">
                        <MarkdownRenderer markdownUrl={chapter.path} />
                    </div>
                    </div>
                </motion.div>
            </main>
            <TutorialNav slug={slug} chapterNumber={chapterNumber} tutorial={tutorial} completedChapters={completedChapters} markComplete={markChapterComplete} markIncomplete={markChapterIncomplete}/>
            <div className="w-full border-b border-neutral-700"/>
            <TutorialResources tutorial={tutorial}/>
            <FooterPanel/>
        </div>
    );
}
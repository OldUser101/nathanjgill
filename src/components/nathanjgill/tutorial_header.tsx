import { Chapter } from "@/lib/tutorial";
import { TutorialPageProps } from "./tutorial";
import { Progress } from "@/components/ui/progress"
import { Button } from "../ui/button";
import { TableOfContents } from "lucide-react";
import { TutorialContents } from "./tutorial_contents";

export function TutorialHeaderPanel({ slug, chapterNumber, tutorial, completedChapters }: TutorialPageProps) {
    const chapter: Chapter = tutorial.chapters[chapterNumber];
    return (
        <div className="hidden sticky top-4 left-0 w-full md:flex justify-center px-4">
            <div className="border border-neutral-700 h-18 items-center py-2 px-8 select-none hidden md:flex md:w-full lg:w-2/3 max-w-full z-50 rounded-full backdrop-blur-lg forecolor dark:backdrop-brightness-[0.55]">
                    <TutorialContents slug={slug} chapterNumber={chapterNumber} tutorial={tutorial} completedChapters={completedChapters} /> 
                    <div className="ml-4 flex flex-start flex-col">
                        <p className="text-lg font-semibold">{tutorial.title}</p>
                        <p className="text-base">{chapter.title}</p>
                    </div>
                    <div className="flex items-center gap-4 ml-auto">
                        <p className="text-base justify-self-end">Chapter {chapterNumber + 1} of {tutorial.chapters.length}</p>
                        <Progress className="w-20 justify-self-end" value={((chapterNumber + (completedChapters[chapterNumber] ? 1 : 0)) / tutorial.chapters.length) * 100} />
                    </div>
            </div>
        </div>
    );
}
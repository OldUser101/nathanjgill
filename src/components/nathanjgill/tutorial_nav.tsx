import { Tutorial } from "@/lib/tutorial"
import { Button } from "../ui/button";
import Link from "next/link";

export interface TutorialNavProps {
    slug: string,
    chapterNumber: number,
    tutorial: Tutorial,
    completedChapters: boolean[],
    markComplete: (index: number) => void,
    markIncomplete: (index: number) => void,
}

export function TutorialNav({ slug, chapterNumber, tutorial, completedChapters, markComplete, markIncomplete}: TutorialNavProps) {
    return (
        <div className="flex justify-center mt-4 mb-8">
            <div className="grid grid-rows-3 md:grid-cols-3 md:grid-rows-1 gap-4">
                {chapterNumber == 0 ? 
                    <Link className="min-w-[max-content]" href="/tutorials">
                        <Button className="w-full px-6">
                            View All Tutorials
                        </Button>
                    </Link>
                    :<a className="min-w-[max-content]" href={`/tutorials/${slug}?chapter=${chapterNumber}`}>
                        <Button className="w-full px-6">
                            Previous Chapter
                        </Button>
                    </a>}

                {completedChapters[chapterNumber] == true ? 
                    <Button className="min-w-[max-content] px-6" onClick={() => markIncomplete(chapterNumber)}>
                        Mark as Incomplete
                    </Button>
                    :<Button className="min-w-[max-content] px-6" onClick={() => markComplete(chapterNumber)}>
                        Mark as Complete
                    </Button>}

                {chapterNumber == tutorial.chapters.length - 1 ? 
                    <Link className="min-w-[max-content]" href="/tutorials">
                        <Button className="w-full px-6">
                            View All Tutorials
                        </Button>
                    </Link>
                    :<a className="min-w-[max-content]" href={`/tutorials/${slug}?chapter=${chapterNumber + 2}`}>
                        <Button className="w-full px-6">
                            Next Chapter
                        </Button>
                    </a>}
            </div>
        </div>
    );
}
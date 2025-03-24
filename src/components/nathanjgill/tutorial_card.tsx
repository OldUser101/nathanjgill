"use client"

import { Tutorial } from "@/lib/tutorial";
import { Card } from "../ui/card";
import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { Button } from "../ui/button";

interface TutorialCardProps {
    tutorial: Tutorial
}

const toBoolean = (value: string): boolean => value.toLowerCase() === 'true';

export function TutorialCard({ tutorial }: TutorialCardProps) {
    const [completedChapters, setCompletedChapters] = useState<boolean[]>([]);
    const [notContinueTutorial, setNotContinueTutorial] = useState<boolean>(false);
    const [nextChapter, setNextChapter] = useState<number>(0);

    useEffect(() => {
        let allOff: boolean = true;
        const storedProgress = tutorial.chapters.map((_, c) =>
            toBoolean(localStorage.getItem(`${tutorial.slug}_${c}_complete`) ?? "")
        );
        setCompletedChapters(storedProgress);

        storedProgress.forEach((b, i) => {
            if (b == true) {
                allOff = false;
                setNextChapter(i + 1);
            }
        });
        setNotContinueTutorial(allOff);
    }, [tutorial.slug, tutorial.chapters.length, tutorial.chapters]);

    const clearProgress = (slug: string) => {
        let allOff: boolean = true;
        const newChapters: boolean[] = []
        Array.from({length: tutorial.chapters.length}, (c, i) => {
            localStorage.setItem(`${slug}_${i}_complete`, "false")
            newChapters.push(false);
        })
        setCompletedChapters(newChapters)

        newChapters.forEach((b, i) => {
            if (b == true) {
                allOff = false;
                setNextChapter(i + 1);
            }
        });
        setNotContinueTutorial(allOff);
        setNextChapter(1);
    };

    return (
        <Card className="p-4 flex-1">
            <div className="h-full flex flex-col select-none">
                <p className="font-semibold text-xl pb-2">{tutorial.title}</p>
                <div className="pb-2">
                    {tutorial.chapters.map((c, i) => {
                        return (
                            <a href={`/tutorials/${tutorial.slug}?chapter=${i + 1}`} key={i} className="flex justify-between hover:underline">
                                <p className="font-light text-lg">
                                    Chapter {i + 1}: {c.title}
                                </p>
                                {completedChapters[i] ? <Check/> : undefined}
                            </a>
                        );
                    })}
                </div>
                <div className="grid grid-cols-2 gap-4 pt-2">
                    <div>
                        <Button variant="outline" onClick={() => clearProgress(tutorial.slug)} className="w-full">
                            Clear Progress
                        </Button>
                    </div>
                    {notContinueTutorial ? 
                        <a href={`/tutorials/${tutorial.slug}?chapter=1`}><Button className="w-full">
                            Start Tutorial
                        </Button></a>
                        :(nextChapter < tutorial.chapters.length ? 
                        <a href={`/tutorials/${tutorial.slug}?chapter=${nextChapter + 1}`}><Button className="w-full">
                            Continue Tutorial
                        </Button></a>
                        :<a href={`/tutorials/${tutorial.slug}?chapter=1`}><Button onClick={() => clearProgress(tutorial.slug)} className="w-full">
                            Restart Tutorial
                        </Button></a>)}
                </div>
            </div>
        </Card>
    );
}
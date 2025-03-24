"use client"

import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Check, TableOfContents} from "lucide-react";
import { Tutorial } from "@/lib/tutorial";
import { Button } from "../ui/button";

export interface TutorialContentsProps {
    slug: string,
    chapterNumber: number,
    tutorial: Tutorial,
    completedChapters: boolean[],
}

export function TutorialContents({slug, chapterNumber, tutorial, completedChapters}: TutorialContentsProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                    <TableOfContents />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                {tutorial.chapters.map((chapter, index) => (
                    <DropdownMenuItem key={index} className="flex items-center justify-between">
                        <a href={`/tutorials/${slug}?chapter=${index + 1}`} className="flex items-center justify-between w-full">
                            <span>{chapter.title}</span>
                            {completedChapters[index] ? (
                                <Check />
                            ) : null}
                        </a>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
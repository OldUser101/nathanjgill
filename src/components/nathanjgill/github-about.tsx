import { Card } from "../ui/card";
import MarkdownRenderer from "./markdownRenderer";
import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

export function GitHubAbout() {
    return (
        <Card className="p-4 max-h-60 overflow-hidden relative flex flex-1">
            <div>
                <h1 className="text-2xl font-semibold">About</h1>
                <MarkdownRenderer markdownUrl="https://raw.githubusercontent.com/OldUser101/OldUser101/refs/heads/master/README.md"/>
            </div>
            <div className="absolute bottom-0 left-0 w-full">
                <div className="bg-gradient-to-t from-white/100 to-white/0 dark:from-black/100 dark:to-black/0 h-10">

                </div>
                <div className="bg-white dark:bg-black px-2 pb-2 w-full">
                    <Link href="/about" className="w-full">
                        <Button variant="ghost" className="w-full lg:w-auto">
                            <ArrowRight />
                            Read More
                        </Button>
                    </Link>
                </div>
            </div>
        </Card>
    );
}
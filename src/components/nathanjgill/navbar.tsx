"use client"

import Link from "next/link";
import { useState } from "react";

import {
    NavigationMenu,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"

import { Sheet, SheetTrigger, SheetContent, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { ModeToggle } from "@/components/nathanjgill/mode-toggle";
import { Tutorial } from "@/lib/tutorial";
import { Check } from "lucide-react";

function NavItem({children, href}: {children: React.ReactNode, href: string}) {
    return (
        <div>
            <Link href={href} legacyBehavior passHref>
                <div className="items-center justify-center p-2 text-sm font-medium transition-colors text-gray-700 hover:text-black dark:text-gray-400 dark:hover:text-white cursor-pointer">
                    {children}
                </div>
            </Link>
        </div>
    );
}

function MobileNavItem({children, href}: {children: React.ReactNode, href: string}) {
    return (
        <div>
            <Link href={href} legacyBehavior passHref>
                <div className="items-center justify-center p-2 text-xl font-semibold transition-colors text-gray-700 hover:text-black dark:text-gray-400 dark:hover:text-white cursor-pointer">
                    {children}
                </div>
            </Link>
        </div>
    );
}

interface NavbarProps {
    useChapter?: boolean,
    tutorial?: Tutorial,
    completedChapters?: boolean[],
    slug?: string
};

export function Navbar({ useChapter, tutorial, completedChapters, slug }: NavbarProps) {
    const [open, setOpen] = useState(false);

    const showChapterView = useChapter && tutorial !== undefined && completedChapters !== undefined && slug !== undefined;

    return (
        <nav>
            <NavigationMenu className="hidden md:flex">
                <NavigationMenuList>
                    <NavItem href="/projects">Projects</NavItem>
                    <NavItem href="/tutorials">Tutorials</NavItem>
                    <NavItem href="/about">About</NavItem>
                </NavigationMenuList>
            </NavigationMenu>

            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTitle></SheetTitle>
                <SheetDescription></SheetDescription>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="md:hidden">
                        <Menu/>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-full h-full">
                    <div className="flex flex-col mt-6 w-full h-full overflow-y-auto">
                        <MobileNavItem href="/projects">Projects</MobileNavItem>
                        <MobileNavItem href="/tutorials">Tutorials</MobileNavItem>
                        <MobileNavItem href="/about">About</MobileNavItem>

                        <div className="flex-grow"/>

                        {showChapterView ?
                        <div>
                            {tutorial.chapters.map((chapter, index) => (
                                <div key={index} className="flex items-center justify-between">
                                    <a href={`/tutorials/${slug}?chapter=${index + 1}`} className="flex w-full items-center justify-between p-2 text-xl font-semibold transition-colors text-gray-700 hover:text-black dark:text-gray-400 dark:hover:text-white cursor-pointer">
                                        <span>{chapter.title}</span>
                                        {completedChapters[index] ? (
                                            <Check />
                                        ) : null}
                                    </a>
                                </div>
                            ))}
                        </div>
                        :undefined}

                        <div className="flex-grow"/>

                        <div className="mb-6 flex items-center gap-2">
                            <ModeToggle/>
                            <p className="preview flex-none inline-block border-dashed border-2 text-neutral-700 text-sm dark:text-neutral-400 border-neutral-700 dark:border-neutral-400 rounded-md px-1">
                                Preview
                            </p>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </nav>
    );
}
"use client"

import Link from "next/link";
import { useState } from "react";

import {
    NavigationMenu,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"

import { Sheet, SheetTrigger, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { ModeToggle } from "@/components/nathanjgill/mode-toggle";

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
                <div className="items-center justify-center p-2 text-lg font-semibold transition-colors text-gray-700 hover:text-black dark:text-gray-400 dark:hover:text-white cursor-pointer">
                    {children}
                </div>
            </Link>
        </div>
    );
}

export function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <nav>
            <NavigationMenu className="hidden md:flex">
                <NavigationMenuList>
                    <div>
                        <Link href="/" legacyBehavior passHref>
                            <div className="items-center justify-center p-2 text-sm font-medium transition-colors text-gray-700 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 cursor-pointer">
                                Tetra Software
                            </div>
                        </Link>
                    </div>

                    <NavItem href="/">Projects</NavItem>
                    <NavItem href="/">Guides</NavItem>
                    <NavItem href="/">About</NavItem>
                </NavigationMenuList>
            </NavigationMenu>

            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTitle></SheetTitle>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="md:hidden">
                        <Menu/>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-full h-full">
                    <div className="flex flex-col mt-6 w-full h-full">
                        <div>
                            <Link href="/" legacyBehavior passHref>
                                <div className="items-center justify-center p-2 text-lg font-semibold transition-colors text-gray-700 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 cursor-pointer">
                                    Tetra Software
                                </div>
                            </Link>
                        </div>

                        <MobileNavItem href="/">Projects</MobileNavItem>
                        <MobileNavItem href="/">Guides</MobileNavItem>
                        <MobileNavItem href="/">About</MobileNavItem>

                        <div className="flex-grow"/>

                        <div className="mb-6">
                            <ModeToggle/>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </nav>
    );
}
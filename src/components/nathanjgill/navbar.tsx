import Link from "next/link";

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"

export function Navbar() {
  return (
    <NavigationMenu>
        <NavigationMenuList>
            <NavigationMenuItem>
                <Link href="" legacyBehavior passHref>
                    <NavigationMenuLink className="items-center justify-center p-2 text-sm font-medium transition-colors text-gray-700 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400">
                        Tetra Software
                    </NavigationMenuLink>
                </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
                <Link href="" legacyBehavior passHref>
                    <NavigationMenuLink className="items-center justify-center p-2 text-sm font-medium transition-colors text-gray-700 hover:text-black dark:text-gray-400 dark:hover:text-white">
                        Projects
                    </NavigationMenuLink>
                </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
                <Link href="" legacyBehavior passHref>
                    <NavigationMenuLink className="items-center justify-center p-2 text-sm font-medium transition-colors text-gray-700 hover:text-black dark:text-gray-400 dark:hover:text-white">
                        Guides
                    </NavigationMenuLink>
                </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
                <Link href="" legacyBehavior passHref>
                    <NavigationMenuLink className="items-center justify-center p-2 text-sm font-medium transition-colors text-gray-700 hover:text-black dark:text-gray-400 dark:hover:text-white">
                        About
                    </NavigationMenuLink>
                </Link>
            </NavigationMenuItem>
        </NavigationMenuList>
    </NavigationMenu>
  );
}
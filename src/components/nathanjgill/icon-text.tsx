import Link from "next/link";
import Image from "next/image";

export function IconText() {
    return (            
        <Link href="/">
            <div className="h-16 flex items-center forecolor cursor-pointer">
                <Image src="/favicon-light.svg"
                        width={32}
                        height={32}
                        alt="Website Logo"
                        className="block dark:hidden mr-3"/>
                <Image src="/favicon-dark.svg"
                        width={32}
                        height={32}
                        alt="Website Logo"
                        className="hidden dark:block mr-3"/>
                <h1 className="text-l font-semibold text-black dark:text-white">Nathan Gill</h1>
            </div>
        </Link>
    );
}
import { ModeToggle } from "@/components/nathanjgill/mode-toggle";
import { Navbar } from "@/components/nathanjgill/navbar";
import { IconText } from "@/components/nathanjgill/icon-text";

export function HeaderPanel() {
  return (
    <header className="border-b border-b-neutral-700 h-14 justify-between flex items-center select-none forecolor p-3 backdrop-blur fixed top-0 left-0 w-full z-50">
        <div className="h-16 flex items-center space-x-3 forecolor">
            <IconText/>
            <Navbar/>
        </div>
        <ModeToggle/>
    </header>
  );
}
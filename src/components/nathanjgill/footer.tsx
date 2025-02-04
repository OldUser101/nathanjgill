import { IconText } from "@/components/nathanjgill/icon-text";
import { GitHubSocial, EmailSocial, GitLabSocial } from "./social-links";

export function FooterPanel() {
  return (
    <footer className="border-t border-t-neutral-700 h-14 flex forecolor p-3 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 mx-auto pt-6">
            <div className="h-16 flex items-center space-x-3 forecolor">
                <IconText/>
            </div>

            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 px-6">
                <div>
                    <h3 className="font-semibold text-lg">Projects</h3>
                    <div className="ml-2">
                        <ul className="text-sm text-gray-700 dark:text-gray-400 space-y-2">
                            <li><a href="#" className="hover:text-black dark:hover:text-white transition-colors">Project 1</a></li>
                            <li><a href="#" className="hover:text-black dark:hover:text-white transition-colors">Project 2</a></li>
                        </ul>
                    </div>
                </div>

                <div>
                    <h3 className="font-semibold text-lg">Contact</h3>
                    <div className="ml-2">
                        <EmailSocial/>
                        <GitHubSocial/>
                        <GitLabSocial/>
                    </div>
                </div>
            </div>
            
            <p className="col-span-1 md:col-span-2 text-center text-sm text-gray-700 dark:text-gray-400 mt-4 pb-6">
                Copyright © 2025 Nathan Gill
            </p>
        </div>
    </footer>
  );
}
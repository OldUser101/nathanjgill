import { Github, Mail, Gitlab } from "lucide-react";

export function GitHubSocial() {
    return (
        <a 
            href="https://github.com/OldUser101" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center space-x-2 text-sm text-gray-700 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors">
        <Github size={16} />
        <span className="font-medium">OldUser101</span>
      </a>
    );
}

export function GitLabSocial() {
    return (
        <a 
            href="https://gitlab.com/OldUser101" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center space-x-2 text-sm text-gray-700 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors">
        <Gitlab size={16} />
        <span className="font-medium">OldUser101</span>
      </a>
    );
}

export function EmailSocial() {
    return (
        <a 
            href="mailto:nathan@nathanjgill.uk" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center space-x-2 text-sm text-gray-700 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors">
        <Mail size={16} />
        <span className="font-medium">nathan@nathanjgill.uk</span>
      </a>
    );
}
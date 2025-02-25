"use client"

import {
    Card
} from "@/components/ui/card"
import { Button } from '@/components/ui/button';
import { GitFork, Star, Code, AlertTriangle } from "lucide-react";
import { Repository } from "@/lib/repository";

interface GitHubRepoCardProps {
  repo: Repository;
}

export function GitHubRepoCard({ repo }: GitHubRepoCardProps) {
    if (!repo) {
        return (
            <Card className="flex justify-center p-4 max-w-xs mx-auto">
                <div className="flex items-center text-red-500">
                    <AlertTriangle className="mr-2" />
                    <span>An error occurred.</span>
                </div>
            </Card>
        );
    }

    return (
        <Card className="p-4 flex-1">
            <div className="h-full flex flex-col">
                <div>
                    <a href={repo.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-xl hover:underline">{repo.login}/{repo.name}</a>
                    <p className="font-light text-base mt-2">{repo.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-auto">
                    <div>
                        <p className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-400 mt-2">
                            <Code size={16} />
                            <span>Language: {repo.languageName}</span>
                        </p>
                        <p className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-400 mt-2">
                            <Star size={16} />
                            <span>Stars: {repo.stargazerCount}</span>
                        </p>
                        <p className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-400 mt-2">
                            <GitFork size={16} />
                            <span>Forks: {repo.forkCount}</span>
                        </p>
                    </div>
                    <div className="flex justify-end flex-col">
                        <Button>
                            <a href={repo.url} target="_blank" rel="noopener noreferrer">
                                View on GitHub
                            </a>
                        </Button>
                    </div>
                </div>
            </div>
        </Card>
    );
}
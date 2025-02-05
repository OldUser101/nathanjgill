"use client"

import React, { useEffect, useState } from "react";
import axios from 'axios';
import {
    Card
} from "@/components/ui/card"
import { Button } from '@/components/ui/button';
import { GitFork, Star, Code, AlertTriangle } from "lucide-react";

interface GitHubRepoCardProps {
  repo: string;
}

export function GitHubRepoCard({ repo }: GitHubRepoCardProps) {
    const [repoData, setRepoData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchRepoData = async () => {
            try {
            const response = await axios.get(`https://api.github.com/repos/OldUser101/${repo}`);
            setRepoData(response.data);
            setLoading(false);
            } catch (error) {
            console.error("Error fetching repo data", error);
            setLoading(false);
            }
        };

        fetchRepoData();
    }, [repo]);

    if (loading) {
        return (
            <Card className="p-4 max-w-xs mx-auto animate-pulse">
                <div className="h-10 bg-gray-200 rounded-md mb-4"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
            </Card>
        );
    }

    if (!repoData) {
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
        <Card className="p-4 max-w-xs mx-auto">
            <div className="">
                <a href={repoData.html_url} target="_blank" rel="noopener noreferrer" className="font-semibold text-xl hover:underline">{repoData.full_name}</a>
                <p className="font-light text-base mt-2">{repoData.description}</p>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-400 mt-2">
                            <Code size={16} />
                            <span>Language: {repoData.language}</span>
                        </p>
                        <p className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-400 mt-2">
                            <Star size={16} />
                            <span>Stars: {repoData.stargazers_count}</span>
                        </p>
                        <p className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-400 mt-2">
                            <GitFork size={16} />
                            <span>Forks: {repoData.forks_count}</span>
                        </p>
                    </div>
                    <div className="flex justify-end flex-col">
                        <Button>
                            <a href={repoData.html_url} target="_blank" rel="noopener noreferrer">
                                View on GitHub
                            </a>
                        </Button>
                    </div>
                </div>
            </div>
        </Card>
    );
}
"use client"

import React, { useState, useEffect } from 'react';
import { GitHubRepoCard } from "@/components/nathanjgill/github-repo";
import { AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import { Repository, GetRepoListFromGraphQlQuery } from '@/lib/repository';
import { Button } from '../ui/button';

export function RepoGrid() {
    const [repoList, setRepoList] = useState<Repository[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [loadMoreIndex, setLoadMoreIndex] = useState<number>(1);

    useEffect(() => {
        const fetchRepoList = async () => {
            try {
                const response = await fetch("/api/github/repo");

                if (!response.ok) {
                    throw Error("Failed to make API request.");
                }

                setRepoList(GetRepoListFromGraphQlQuery(await response.json()));
                setLoading(false);
            } catch (error) {
                console.error("Error fetching repo list", error);
                setLoading(false);
            }
        };

        fetchRepoList();
    }, []);

    if (loading) {
        return (
            <div className="border-b border-b-neutral-700 p-6 w-full relative select-none"/>
        );
    }

    if (!repoList) {
        return (
            <div className="border-b border-b-neutral-700 p-6 w-full relative select-none flex justify-center">
                <div className="flex items-center text-red-500">
                    <AlertTriangle className="mr-2" />
                    <span>An error occurred.</span>
                </div>
            </div>
        );
    }

    const handleLoadMore = () => {
        setLoadMoreIndex(loadMoreIndex + 1);
    };

    return (
        <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{duration: 0.5}} className="group border-b border-b-neutral-700 flex pt-6 pb-6 flex-col">
            <h1 className="ml-4 pb-6 text-3xl font-semibold">Recent Contributions</h1>
            <div className="hidden md:block">
                <div className="grid lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-2 gap-4 w-full px-4">
                    {Array.from(Array(4), (_, i) => (
                        loadMoreIndex > i ? (
                            repoList.slice(i * 6, (i + 1) * 6).map((repo, index) => (
                                <GitHubRepoCard repo={repo} key={index}/>
                            ))) : null
                    ))}
                </div>
            </div>
            <div className="block md:hidden">
                <div className="grid lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-2 gap-4 w-full px-4">
                    {Array.from(Array(5), (_, i) => (
                        loadMoreIndex > i ? (
                            repoList.slice(i * 3, (i + 1) * 3).map((repo, index) => (
                                <GitHubRepoCard repo={repo} key={index}/>
                        ))) : null
                    ))}
                </div>
            </div>
            {loadMoreIndex * 6 < repoList.length ? 
                <Button className="mx-auto mt-6 hidden md:block" onClick={handleLoadMore}>Load More</Button> : null}
            {loadMoreIndex * 3 < repoList.length ? 
                <Button className="mx-auto mt-6 block md:hidden" onClick={handleLoadMore}>Load More</Button> : null}
        </motion.div>
    );
}
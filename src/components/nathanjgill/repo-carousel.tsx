"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GitHubRepoCard } from "@/components/nathanjgill/github-repo";
import { AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

export interface Repo {
    html_url: string,
    description: string,
    language: string,
    stargazers_count: number,
    forks_count: number,
    full_name: string,
}

export function RepoCarousel() {
    const [repoList, setRepoList] = useState<Repo[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchRepoList = async () => {
            try {
                const response = await axios.get(`https://api.github.com/users/OldUser101/repos?sort=updated`);
                setRepoList(response.data.slice(0, 5));
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

    return (
        <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{duration: 0.5}} className="group border-b border-b-neutral-700 overflow-x-hidden relative flex pt-6 pb-6">
            <div className="select-none flex animate-marquee group-hover:paused">
                {repoList.map((repo, index) => (
                    <div key={index} className="flex flex-shrink-0 items-stretch md:basis-1/2 lg:basis-1/3">
                        <GitHubRepoCard repo={repo}/>
                    </div>
                ))}
            </div>

            <div className="select-none flex animate-marquee2 absolute group-hover:paused">
                {repoList.map((repo, index) => (
                    <div key={index} className="flex flex-shrink-0 items-stretch md:basis-1/2 lg:basis-1/3">
                        <GitHubRepoCard repo={repo}/>
                    </div>
                ))}
            </div>

            <div className="absolute inset-y-0 left-0 w-64 bg-gradient-to-r from-white dark:from-black to-transparent pointer-events-none"/>
            <div className="absolute inset-y-0 right-0 w-64 bg-gradient-to-l from-white dark:from-black to-transparent pointer-events-none"/>
        </motion.div>
    );
}
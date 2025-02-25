"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GitHubRepoCard } from "@/components/nathanjgill/github-repo";
import { AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import { Repository, GetRepoListFromGraphQlQuery } from '@/lib/repository';

export function RepoGrid() {
    const [repoList, setRepoList] = useState<Repository[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchRepoList = async () => {
            try {
                const response = await axios.get("/api/github");   
                setRepoList(GetRepoListFromGraphQlQuery(response.data));
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
            <div className="grid lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-2 gap-4 w-full px-4">
                {repoList.slice(0, 6).map((repo, index) => (
                    <GitHubRepoCard repo={repo} key={index}/>
                ))}
            </div>
        </motion.div>
    );
}
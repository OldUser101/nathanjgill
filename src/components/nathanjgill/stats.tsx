"use client"

import React, { useState, useEffect } from 'react';
import axios, {AxiosResponse} from 'axios';
import { AlertTriangle } from "lucide-react";
import { GetStatsFromGraphQlRestQuery, Stats } from "@/lib/stats";
import { motion } from 'framer-motion';
import { GitHubStatsCard } from './github-stats';
import { GitHubAbout } from './github-about';

interface AxiosCache {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any,
    timestamp: number
}

let axiosCache: AxiosCache = {
    data: null,
    timestamp: 0
}

const CACHE_DURATION = 10 * 60 * 1000;

export function GitHubStats() {
    const [stats, setState] = useState<Stats | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response_stat = await axios.get("/api/github/stat");
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                let response_user: AxiosResponse<any, any> | null = null;

                const now = Date.now();
                if (axiosCache.data && now - axiosCache.timestamp < CACHE_DURATION) {
                    response_user = axiosCache.data;
                } else {
                    response_user = await axios.get("https://api.github.com/users/OldUser101");
                    axiosCache = { data: response_user, timestamp: now };
                }

                if (!response_user) {
                    throw Error("Failed to access cache or make API request.");
                }

                setState(GetStatsFromGraphQlRestQuery(response_stat.data, response_user.data));
                setLoading(false);
            } catch (error) {
                console.error("Error fetching stats", error);
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) {
        return (
            <div className="border-b border-b-neutral-700 p-6 w-full relative select-none"/>
        );
    }

    if (!stats) {
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
        <motion.div className="border-b border-b-neutral-700 pt-6 pb-6 px-4 flex lg:flex-row flex-col gap-4" initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 1}}>
            <GitHubStatsCard stats={stats}/>
            <GitHubAbout />
        </motion.div>
    );
}
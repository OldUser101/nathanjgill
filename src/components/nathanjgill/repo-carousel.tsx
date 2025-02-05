"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GitHubRepoCard } from "@/components/nathanjgill/github-repo";
import { AlertTriangle } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

export function RepoCarousel() {
    const [repoList, setRepoList] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchRepoList = async () => {
            try {
                const response = await axios.get(`https://api.github.com/users/OldUser101/repos?sort=updated`);
                setRepoList(response.data.slice(0, 10));
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
            <div className="border-b border-b-neutral-700 p-6 w-full relative select-none animate-pulse">
                <div className="h-10 bg-gray-200 rounded-md"></div>
            </div>
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
        <div className="border-b border-b-neutral-700 p-6 w-full relative select-none">
            <Carousel className="w-full">
                <CarouselContent>
                    {repoList.map((repo) => (
                        <CarouselItem key={repo.full_name} className="flex items-stretch md:basis-1/2 lg:basis-1/3">
                            <GitHubRepoCard repo={repo}/>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="left-0" />
                <CarouselNext className="right-0" />
            </Carousel>      
        </div>
    );
}
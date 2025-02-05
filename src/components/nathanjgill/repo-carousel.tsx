"use client"

import * as React from "react"
import { GitHubRepoCard } from "@/components/nathanjgill/github-repo";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

export function RepoCarousel() {
    return (
        <div className="border-b border-b-neutral-700 p-6 w-full relative">
            <Carousel className="w-full">
                <CarouselContent>
                    <CarouselItem className="pl-1 md:basis-1/2 lg:basis-1/3">
                        <GitHubRepoCard repo="HybridApp"/>
                    </CarouselItem>
                    <CarouselItem className="pl-1 md:basis-1/2 lg:basis-1/3">
                        <GitHubRepoCard repo="IELaunch"/>
                    </CarouselItem>
                    <CarouselItem className="pl-1 md:basis-1/2 lg:basis-1/3">
                        <GitHubRepoCard repo="PowerToys"/>
                    </CarouselItem>
                </CarouselContent>
                <CarouselPrevious className="left-0" />
                <CarouselNext className="right-0" />
            </Carousel>      
        </div>
    );
}
"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '../ui/button';
import axios from 'axios';
import {useState, useEffect} from 'react';
import { GitBranch, Globe, Check } from 'lucide-react';

interface DeployData {
    status: number,
    branches: Array<{
        url: string,
        branch: string,
        created: number,
        current: boolean
    }>
}

export function BranchSwitch() {
    const [branches, setState] = useState<DeployData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchBranches = async () => {
            try {
                const response = await axios.get("/api/vercel/deploy");
                setState(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching branches", error);
                setLoading(false);
            }
        };

        fetchBranches();
    }, []);

    if (!branches || loading || branches.status != 200) {
        return (
            <></>
        );
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                    <GitBranch className="h-[1.2rem] w-[1.2rem]"/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {branches.branches.map((branch, index) => (
                    <DropdownMenuItem className="flex items-center justify-between" key={index}>
                            <a href={branch.url} className="flex items-center w-full justify-between gap-2">
                                <div className="flex items-center gap-2">
                                    {branch.branch === "master" || branch.branch === "main" ? <Globe /> : <GitBranch />}
                                    <p className="font-mono">{branch.branch}</p>
                                </div>
                                {branch.current ? <Check/> : <div className="w-[1.2rem]" />}
                            </a>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
"use client";

import { Button } from '../ui/button';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { GitBranch, Globe, Check } from 'lucide-react';
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from '../ui/drawer';
import { Dialog, DialogHeader } from '../ui/dialog';
import { DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '../ui/dialog';

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

    for (let i: number = 0; i < branches.branches.length; i++) {
        if (branches.branches[i].branch === "master" || branches.branches[i].branch === "main") {
            const old: { url: string, branch: string, created: number, current: boolean } = branches.branches[0];
            branches.branches[0] = branches.branches[i];
            branches.branches[i] = old;
        }
    }

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="ghost" size="icon" className="hidden lg:flex">
                        <GitBranch className="h-[1.2rem] w-[1.2rem]"/>
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            Switch Branch
                        </DialogTitle>
                        <DialogDescription>
                            Switch to a different branch of this website.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col gap-4">
                        {branches.branches.map((branch, index) => (
                            <Button variant="ghost" className="flex items-center justify-between" key={index}>
                                    <a href={branch.url} className="flex items-center w-full justify-between gap-2">
                                        <div className="flex items-center gap-2">
                                            {branch.branch === "master" || branch.branch === "main" ? <Globe /> : <GitBranch />}
                                            <p className="font-mono">{branch.branch}</p>
                                        </div>
                                        {branch.current || branch.branch === "master"? <Check/> : <div className="w-[1.2rem]" />}
                                    </a>
                            </Button>
                        ))}   
                    </div>
                </DialogContent>
            </Dialog>
            <Drawer>
                <DrawerTrigger asChild>
                    <Button variant="ghost" size="icon" className="lg:hidden">
                        <GitBranch className="h-[1.2rem] w-[1.2rem]"/>
                    </Button>
                </DrawerTrigger>
                <DrawerContent className="p-4 flex flex-col gap-4">
                    <DrawerHeader>
                        <DrawerTitle>
                            Switch Branch
                        </DrawerTitle>
                        <DrawerDescription>
                            Switch to different branch of this website.
                        </DrawerDescription>
                    </DrawerHeader>
                    <div className="flex flex-col gap-4">
                        {branches.branches.map((branch, index) => (
                            <Button variant="ghost" className="flex items-center justify-between" key={index}>
                                    <a href={branch.url} className="flex items-center w-full justify-between gap-2">
                                        <div className="flex items-center gap-2">
                                            {branch.branch === "master" || branch.branch === "main" ? <Globe /> : <GitBranch />}
                                            <p className="font-mono">{branch.branch}</p>
                                        </div>
                                        {branch.current || branch.branch === "master"? <Check/> : <div className="w-[1.2rem]" />}
                                    </a>
                            </Button>
                        ))}   
                    </div>               
                </DrawerContent>
            </Drawer>
        </div>
    );
}
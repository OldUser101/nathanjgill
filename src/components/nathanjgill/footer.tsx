"use client";

import { IconText } from "@/components/nathanjgill/icon-text";
import { GitHubSocial, EmailSocial, LinkedinSocial } from "./social-links";
import { motion } from "framer-motion";
import Link from "next/link";
import { BranchSwitch } from "./branch-switch";

export function FooterPanel() {
  return (
    <motion.footer initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }} className="forecolor w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-6 w-full">
            <div className="flex justify-center items-center space-x-3 forecolor">
                <IconText/>
            </div>

            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 px-6">
                <div>
                    <h3 className="font-semibold text-lg p-1">Sitemap</h3>
                        <ul className="text-sm text-gray-700 dark:text-gray-400 space-y-2 ml-2">
                            <li><Link href="/projects" className="hover:text-black dark:hover:text-white transition-colors">Projects</Link></li>
                            <li><Link href="/tutorials" className="hover:text-black dark:hover:text-white transition-colors">Tutorials</Link></li>
                            <li><Link href="/about" className="hover:text-black dark:hover:text-white transition-colors">About</Link></li>
                            <li><Link href="http://archive.nathanjgill.uk" className="hover:text-black dark:hover:text-white transition-colors">Archive</Link></li>
                        </ul>
                </div>

                <div>
                    <h3 className="font-semibold text-lg p-1">Contact</h3>
                    <ul className="ml-2 space-y-2">
                        <LinkedinSocial/>
                        <EmailSocial/>
                        <GitHubSocial/>
                    </ul>
                </div>
            </div>
            
            <div className="col-span-1 md:col-span-2 relative">
                <div className="absolute h-full flex items-center mx-3">
                    <BranchSwitch />
                </div>
                <p className="text-center text-sm text-gray-700 dark:text-gray-400 mt-4 pb-6">
                    Copyright © 2024-2025, Nathan Gill
                </p>
            </div>
        </div>
    </motion.footer>
  );
}
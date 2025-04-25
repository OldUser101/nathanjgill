"use client"

import { HeaderPanel } from "@/components/nathanjgill/header";
import { FooterPanel } from "@/components/nathanjgill/footer";
import { motion } from "framer-motion";
import MarkdownRenderer from "@/components/nathanjgill/markdownRenderer";

export default function About() {
  return (
    <div className="font-sans">
        <HeaderPanel fixed/>
        <div className="h-14"/>
        <motion.div animate={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 20 }} transition={{ duration: 0.5 }}>
          <div className="border-b border-neutral-700 p-6">
            <h1 className="text-4xl font-semibold pb-3">About Me</h1>
            <MarkdownRenderer markdownUrl="https://raw.githubusercontent.com/OldUser101/OldUser101/refs/heads/master/README.md"/>
          </div>
        </motion.div>
        <FooterPanel/>
    </div>
  );
}

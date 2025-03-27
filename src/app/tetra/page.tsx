"use client"

import { HeaderPanel } from "@/components/nathanjgill/header";
import { FooterPanel } from "@/components/nathanjgill/footer";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="font-sans">
        <HeaderPanel fixed/>
        <div className="h-14"/>
        <motion.div animate={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 20 }} transition={{ duration: 0.5 }}>
          <div className="border-b border-neutral-700 w-full p-6">
            <h1 className="text-4xl font-semibold pb-3">Tetra Software</h1>
            <p className="text-xl font-light">Tetra Software is a now defunct brand under which I previously published software.</p>
            <p className="text-xl font-light">It was shut down on Wednesday 20th November 2024. All the software which was published will (at some point)</p>
            <p className="text-xl font-light">be available on this website. In the mean time, a updated archive of the site can be found here.</p>
            <p className="text-xl font-light">It contains all the software and content published through the site. The archive is occasionally updated for the purpose of software support.</p>
          </div>
          <div className="border-b border-neutral-700 w-full p-6 text-center">
            <h1 className="text-4xl font-semibold">As of 26 March 2025</h1>
            <h1 className="text-4xl font-semibold">this page is being updated</h1>
            <h1 className="text-4xl font-semibold">and is currently unavailable</h1>
          </div>
        </motion.div>
        <FooterPanel />
    </div>
  );
}
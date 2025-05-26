"use client"

import { IconText } from "@/components/nathanjgill/icon-text";
import { ModeToggle } from "@/components/nathanjgill/mode-toggle";
import { EmailSocial, GitHubSocial, LinkedinSocial } from "@/components/nathanjgill/social-links";
import { motion } from "framer-motion";
import { useEffect } from "react";

export default function Card() {
  useEffect(() => {
    document.title = "Nathan Gill | Contact Card";
  }, []);

  return (
      <motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }} transition={{ duration: 0.5 }} className="flex flex-col items-center justify-center h-screen overflow-x-hidden overflow-y-hidden">
        <div className="fixed top-4 right-4">
          <ModeToggle />
        </div>
        <IconText />
        <div className="flex flex-col items-center justify-center gap-4">
          <LinkedinSocial />
          <EmailSocial />
          <GitHubSocial />
        </div>
      </motion.div>
  );
}

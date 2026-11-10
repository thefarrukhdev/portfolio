"use client";

import { AnimatePresence, motion } from "motion/react";
import { Mail, MessageSquare } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { useContact } from "./contact-context";
import { StarBorder } from "@/components/ui/star-border";

const EASE = [0.22, 1, 0.36, 1] as const;

export function ContactButton(): ReactNode {
  const [open, setOpen] = useState(false);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { openContact } = useContact();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setOpen(true);
  };

  const handleMouseLeave = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    closeTimeoutRef.current = setTimeout(() => {
      setOpen(false);
    }, 200);
  };

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  return (
    <StarBorder
      as={motion.button}
      onClick={openContact}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={() => {
        if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
        setOpen(true);
      }}
      onBlur={() => setOpen(false)}
      aria-label="Open contact form"
      layout
      transition={{ layout: { duration: 0.35, ease: EASE } }}
      radius={12}
      thickness={1.2}
      duration={4}
      glow={0.55}
      stars={1}
      hover="lap"
      clickPulse={true}
      color={isDark ? "#ffffff" : "#0a0a0a"}
      trailColor={isDark ? "rgba(255, 255, 255, 0.7)" : "rgba(10, 10, 10, 0.7)"}
      backgroundColor={isDark ? "#09090b" : "#ffffff"}
      borderColor={isDark ? "rgba(255, 255, 255, 0.12)" : "rgba(10, 10, 10, 0.1)"}
      textColor={isDark ? "#fafafa" : "#09090b"}
      className="focus-ring relative inline-flex h-11 items-center justify-center px-4 sm:px-5 text-sm font-medium select-none shadow-sm transition-opacity hover:opacity-95"
    >
      <motion.span
        layout="position"
        className="relative inline-flex items-center overflow-hidden"
      >
        <AnimatePresence initial={false} mode="popLayout">
          {open ? (
            <motion.span
              key="send"
              layout="position"
              initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -14, filter: "blur(4px)" }}
              transition={{ duration: 0.28, ease: EASE }}
              className="inline-flex items-center gap-2 whitespace-nowrap"
            >
              <MessageSquare className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>Leave a message</span>
            </motion.span>
          ) : (
            <motion.span
              key="contact"
              layout="position"
              initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -14, filter: "blur(4px)" }}
              transition={{ duration: 0.28, ease: EASE }}
              className="inline-flex items-center gap-2 whitespace-nowrap"
            >
              <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>Contact</span>
            </motion.span>
          )}
        </AnimatePresence>
      </motion.span>
    </StarBorder>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Command, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./theme-toggle";
import { site } from "@/content/site";
import { cn } from "@/lib/accent";

export const sections = [
  { id: "projects", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "journey", label: "Journey" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export const openPalette = () => window.dispatchEvent(new Event("open-command-palette"));

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [isMac, setIsMac] = useState(true);

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  useEffect(() => {
    setIsMac(/Mac|iPhone|iPad/.test(navigator.platform));
  }, []);

  // Active-section indicator
  useEffect(() => {
    if (!isHome) return setActive(null);
    const els = sections.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    els.forEach((el) => io.observe(el));
    const onTop = () => window.scrollY < 200 && setActive(null);
    window.addEventListener("scroll", onTop, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onTop);
    };
  }, [isHome]);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4">
      <motion.nav
        animate={{
          marginTop: scrolled ? 12 : 20,
          paddingTop: scrolled ? 8 : 12,
          paddingBottom: scrolled ? 8 : 12,
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "flex w-full max-w-6xl items-center justify-between rounded-full px-3 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500 md:px-4",
          scrolled
            ? "border border-line/80 bg-surface/70 shadow-soft backdrop-blur-xl"
            : "border border-transparent bg-transparent"
        )}
      >
        <Link href="/" className="group flex items-center gap-2.5 pl-2" aria-label="Home">
          <span className="grid size-9 place-items-center rounded-full bg-ink font-display text-lg text-bg transition-transform duration-500 group-hover:rotate-[-8deg]">
            {site.name[0]}
          </span>
          <span className="hidden font-display text-lg tracking-tight sm:block">{site.name}</span>
        </Link>

        <ul className="relative hidden items-center gap-1 md:flex">
          {sections.map((s) => (
            <li key={s.id} className="relative">
              <Link
                href={isHome ? `#${s.id}` : `/#${s.id}`}
                className={cn(
                  "relative z-10 block rounded-full px-4 py-2 text-sm transition-colors",
                  active === s.id ? "text-ink" : "text-muted hover:text-ink"
                )}
              >
                {s.label}
              </Link>
              {active === s.id && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full bg-lavender/50"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openPalette}
            className="hidden items-center gap-2 rounded-full border border-line bg-surface/70 px-3 py-2 text-xs text-muted transition-colors hover:border-gold/60 hover:text-ink sm:flex"
            aria-label="Open command palette"
          >
            <Command className="size-3.5" />
            <kbd className="font-mono">{isMac ? "⌘" : "Ctrl"} K</kbd>
          </button>
          <ThemeToggle />
          <button
            type="button"
            className="grid size-10 place-items-center rounded-full border border-line bg-surface/70 md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-x-4 top-24 rounded-3xl border border-line bg-surface/95 p-3 shadow-lifted backdrop-blur-xl md:hidden"
          >
            {sections.map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.04 * i }}
              >
                <Link
                  href={isHome ? `#${s.id}` : `/#${s.id}`}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-2xl px-4 py-3.5 font-display text-2xl font-light hover:bg-surface-2"
                >
                  {s.label}
                  <span className="font-mono text-xs text-muted">0{i + 1}</span>
                </Link>
              </motion.div>
            ))}
            <button
              onClick={() => {
                setOpen(false);
                openPalette();
              }}
              className="mt-2 w-full rounded-2xl bg-surface-2 px-4 py-3 text-left text-sm text-muted"
            >
              Search & quick actions…
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

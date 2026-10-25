"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ImageIcon, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import type { Accent } from "@/content/projects";
import { accentBg, cn } from "@/lib/accent";

type Shot = { src?: string; alt: string };

function Frame({ shot, accent }: { shot: Shot; accent: Accent }) {
  if (shot.src) {
    return <Image src={shot.src} alt={shot.alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />;
  }
  return (
    <div className={cn("absolute inset-0 grid place-items-center", accentBg[accent])}>
      <div className="flex flex-col items-center gap-2 text-ink/60">
        <ImageIcon className="size-6" />
        <span className="text-sm">{shot.alt}</span>
        <span className="font-mono text-[10px]">add screenshot in public/projects/</span>
      </div>
    </div>
  );
}

export function Gallery({ shots, accent }: { shots: Shot[]; accent: Accent }) {
  const [open, setOpen] = useState<number | null>(null);
  const prev = useCallback(() => setOpen((i) => (i === null ? i : (i - 1 + shots.length) % shots.length)), [shots.length]);
  const next = useCallback(() => setOpen((i) => (i === null ? i : (i + 1) % shots.length)), [shots.length]);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, prev, next]);

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        {shots.map((s, i) => (
          <motion.button
            key={i}
            layoutId={`shot-${i}`}
            onClick={() => setOpen(i)}
            whileHover={{ y: -4 }}
            className={cn(
              "relative overflow-hidden rounded-2xl border border-line shadow-soft",
              i === 0 && shots.length % 2 === 1 ? "aspect-[16/8] sm:col-span-2" : "aspect-[16/10]"
            )}
            aria-label={`Open screenshot: ${s.alt}`}
          >
            <Frame shot={s} accent={accent} />
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center p-4 md:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={shots[open].alt}
          >
            <div className="absolute inset-0 bg-ink/70 backdrop-blur-md" onClick={() => setOpen(null)} />
            <motion.div
              layoutId={`shot-${open}`}
              className="relative aspect-[16/10] w-full max-w-5xl overflow-hidden rounded-3xl border border-line shadow-lifted"
            >
              <Frame shot={shots[open]} accent={accent} />
            </motion.div>
            <button onClick={() => setOpen(null)} aria-label="Close" className="absolute right-5 top-5 grid size-11 place-items-center rounded-full bg-surface text-ink shadow-soft">
              <X className="size-5" />
            </button>
            {shots.length > 1 && (
              <>
                <button onClick={prev} aria-label="Previous" className="absolute left-3 grid size-11 place-items-center rounded-full bg-surface text-ink shadow-soft md:left-6">
                  <ChevronLeft className="size-5" />
                </button>
                <button onClick={next} aria-label="Next" className="absolute right-3 grid size-11 place-items-center rounded-full bg-surface text-ink shadow-soft md:right-6">
                  <ChevronRight className="size-5" />
                </button>
              </>
            )}
            <p className="absolute bottom-6 rounded-full bg-surface px-4 py-1.5 text-sm text-ink shadow-soft">
              {shots[open].alt} · {open + 1}/{shots.length}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

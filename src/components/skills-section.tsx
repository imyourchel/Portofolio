"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { skillGroups } from "@/content/skills";
import { projects } from "@/content/projects";
import { accentBg, accentSoft, cn } from "@/lib/accent";
import { SectionHeading, Stagger, StaggerItem } from "./motion";
import { useHighlight } from "./providers";

export function SkillsSection() {
  const { skill, slugs, setHighlight } = useHighlight();
  const related = projects.filter((p) => slugs.includes(p.slug));

  return (
    <section id="skills" className="relative px-6 py-24 md:py-36">
      <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-full bg-surface-2/60" />
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Toolkit"
          title={
            <>
              Two disciplines, <em className="font-normal text-gold-ink">one way of thinking</em>
            </>
          }
          sub="Hover or focus a skill to see where I've used it."
        />

        <Stagger className="grid gap-5 md:grid-cols-3">
          {skillGroups.map((g) => (
            <StaggerItem key={g.group}>
              <div className="group h-full rounded-[1.75rem] border border-line bg-surface p-7 shadow-soft transition-shadow duration-500 hover:shadow-lifted">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="font-display text-3xl font-light">{g.group}</h3>
                  <span className={cn("size-3 rounded-full", accentBg[g.accent])} />
                </div>
                <p className="mb-6 text-sm text-muted">{g.blurb}</p>
                <ul className="flex flex-wrap gap-2" onMouseLeave={() => setHighlight(null)}>
                  {g.skills.map((s) => {
                    const active = skill === s.name;
                    return (
                      <li key={s.name}>
                        <button
                          type="button"
                          onMouseEnter={() => setHighlight(s.name, s.projects)}
                          onFocus={() => setHighlight(s.name, s.projects)}
                          onBlur={() => setHighlight(null)}
                          className={cn(
                            "rounded-full border px-3.5 py-1.5 text-sm transition-all duration-300",
                            active
                              ? cn("border-transparent", accentSoft[g.accent], "-translate-y-0.5 shadow-soft")
                              : "border-line text-ink/80 hover:border-gold/50"
                          )}
                        >
                          {s.name}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        {/* Related projects preview */}
        <div className="mt-8 min-h-[4.5rem]" aria-live="polite">
          <AnimatePresence mode="wait">
            {skill ? (
              <motion.div
                key={skill}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
                className="flex flex-wrap items-center gap-3"
              >
                <span className="text-sm text-muted">
                  <span className="font-medium text-ink">{skill}</span>{" "}
                  {related.length ? "shows up in" : "— coursework & practice"}
                </span>
                {related.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/projects/${p.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-4 py-2 text-sm shadow-soft transition-colors hover:border-gold/60"
                  >
                    <span className={cn("size-2 rounded-full", accentBg[p.accent])} />
                    {p.title}
                    <ArrowUpRight className="size-3.5 text-muted" />
                  </Link>
                ))}
              </motion.div>
            ) : (
              <motion.p
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-sm text-muted"
              >
                ↑ Pick a skill to trace it back to real work.
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

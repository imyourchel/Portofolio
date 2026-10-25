"use client";

import Link from "next/link";
import { AnimatePresence, LayoutGroup, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { projects, type Project } from "@/content/projects";
import { accentSoft, cn } from "@/lib/accent";
import { ProjectCover } from "./project-cover";
import { SectionHeading } from "./motion";
import { useHighlight } from "./providers";

const filters = [
  { id: "all", label: "All" },
  { id: "web", label: "Web" },
  { id: "data", label: "Data" },
] as const;
type FilterId = (typeof filters)[number]["id"];

function TiltCard({ project, index, dimmed, lit }: { project: Project; index: number; dimmed: boolean; lit: boolean }) {
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 200, damping: 20 });
  const sry = useSpring(ry, { stiffness: 200, damping: 20 });
  const glareX = useTransform(sry, [-6, 6], ["20%", "80%"]);

  return (
    <motion.div
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 1000 }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        ry.set(px * 10);
        rx.set(-py * 8);
      }}
      onPointerLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
      animate={{ opacity: dimmed ? 0.35 : 1, scale: lit ? 1.015 : 1 }}
      transition={{ duration: 0.35 }}
      className="h-full"
    >
      <Link
        href={`/projects/${project.slug}`}
        className={cn(
          "group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border bg-surface shadow-soft transition-[box-shadow,border-color] duration-500 hover:shadow-lifted",
          lit ? "border-gold/70" : "border-line"
        )}
      >
        <div className="overflow-hidden">
          <div className="transition-transform duration-700 ease-out group-hover:scale-[1.04]">
            <ProjectCover project={project} index={index} />
          </div>
        </div>
        <motion.div
          aria-hidden
          style={{ left: glareX }}
          className="pointer-events-none absolute top-0 h-40 w-40 -translate-x-1/2 rounded-full bg-white/30 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100 dark:bg-white/5"
        />
        <div className="flex flex-1 flex-col p-6 md:p-7">
          <div className="mb-3 flex items-center gap-2">
            <span className={cn("rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em]", accentSoft[project.accent])}>
              {project.category}
            </span>
            <span className="font-mono text-xs text-muted">{project.year}</span>
          </div>
          <h3 className="flex items-start justify-between gap-4 font-display text-2xl font-normal leading-tight tracking-tight md:text-[1.7rem]">
            {project.title}
            <ArrowUpRight className="mt-1 size-5 shrink-0 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold-ink" />
          </h3>
          <p className="mt-3 flex-1 text-[15px] leading-relaxed text-muted">{project.summary}</p>
          <ul className="mt-5 flex flex-wrap gap-1.5">
            {project.stack.slice(0, 4).map((s) => (
              <li key={s} className="rounded-full border border-line px-2.5 py-1 text-xs text-muted">
                {s}
              </li>
            ))}
          </ul>
        </div>
      </Link>
    </motion.div>
  );
}

export function ProjectsSection() {
  const [filter, setFilter] = useState<FilterId>("all");
  const { skill, slugs } = useHighlight();
  const shown = projects.filter((p) => filter === "all" || p.category === filter);

  return (
    <section id="projects" className="px-6 py-24 md:py-36">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Selected work"
            title={
              <>
                Projects, written up <em className="font-normal text-gold-ink">as case studies</em>
              </>
            }
            sub="Each one starts with the problem. Open a card for the full story — features and architecture for web, method and interactive charts for data."
          />
          <LayoutGroup id="filters">
            <div role="tablist" aria-label="Filter projects" className="mb-12 flex shrink-0 gap-1 self-start rounded-full border border-line bg-surface p-1 md:mb-16 md:self-auto">
              {filters.map((f) => {
                const count = f.id === "all" ? projects.length : projects.filter((p) => p.category === f.id).length;
                return (
                  <button
                    key={f.id}
                    role="tab"
                    aria-selected={filter === f.id}
                    onClick={() => setFilter(f.id)}
                    className={cn(
                      "relative rounded-full px-5 py-2 text-sm transition-colors",
                      filter === f.id ? "text-ink" : "text-muted hover:text-ink"
                    )}
                  >
                    {filter === f.id && (
                      <motion.span
                        layoutId="filter-pill"
                        className="absolute inset-0 rounded-full bg-lavender/55"
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      />
                    )}
                    <span className="relative">
                      {f.label} <span className="font-mono text-[11px] text-muted">{count}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </LayoutGroup>
        </div>

        <AnimatePresence>
          {skill && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 text-sm text-muted"
            >
              Highlighting projects that use <span className="font-medium text-ink">{skill}</span>
            </motion.p>
          )}
        </AnimatePresence>

        <motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {shown.map((p) => (
              <motion.div
                key={p.slug}
                layout
                initial={{ opacity: 0, scale: 0.94, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <TiltCard
                  project={p}
                  index={projects.indexOf(p)}
                  dimmed={!!skill && !slugs.includes(p.slug)}
                  lit={!!skill && slugs.includes(p.slug)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

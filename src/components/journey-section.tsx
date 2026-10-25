"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { Briefcase, GraduationCap, BookOpen } from "lucide-react";
import { useRef } from "react";
import { journey } from "@/content/experience";
import { Reveal, SectionHeading } from "./motion";

const icons = { work: Briefcase, education: GraduationCap, course: BookOpen };

export function JourneySection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });

  return (
    <section id="journey" className="px-6 py-24 md:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Journey"
          title={
            <>
              Where I&apos;ve <em className="font-normal text-gold-ink">been learning</em>
            </>
          }
        />
        <div ref={ref} className="relative">
          <div className="absolute bottom-0 left-[15px] top-0 w-px bg-line md:left-1/3" />
          <motion.div style={{ scaleY }} className="absolute bottom-0 left-[15px] top-0 w-px origin-top bg-gold md:left-1/3" />
          <ol className="space-y-14">
            {journey.map((m, i) => {
              const Icon = icons[m.kind];
              return (
                <li key={i} className="relative pl-12 md:grid md:grid-cols-[1fr_2fr] md:pl-0">
                  <span className="absolute left-0 top-0.5 grid size-[30px] place-items-center rounded-full border border-line bg-surface text-muted shadow-soft md:left-[calc(33.333%-15px)]">
                    <Icon className="size-3.5" />
                  </span>
                  <Reveal className="md:pr-12 md:pt-1.5 md:text-right">
                    <p className="font-mono text-xs uppercase tracking-[0.14em] text-gold-ink">{m.period}</p>
                  </Reveal>
                  <Reveal delay={0.05} className="md:pl-14">
                    <h3 className="mt-2 font-display text-2xl font-normal md:mt-0 md:text-3xl">{m.title}</h3>
                    <p className="mt-1 text-muted">{m.org}</p>
                    <ul className="mt-4 space-y-2">
                      {m.points.map((pt) => (
                        <li key={pt} className="flex gap-3 text-[15px] leading-relaxed text-ink/80">
                          <span className="mt-2.5 size-1 shrink-0 rounded-full bg-gold" />
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

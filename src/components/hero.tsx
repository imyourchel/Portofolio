"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowDown, ArrowRight, FileDown, Mail } from "lucide-react";
import { useEffect } from "react";
import { site } from "@/content/site";
import { projects } from "@/content/projects";
import { Button } from "./buttons";
import { Magnetic } from "./motion";

const ease = [0.22, 1, 0.36, 1] as const;

function Blobs() {
  // Normalised cursor position (-0.5 … 0.5), smoothed with springs
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 30, damping: 20 });
  const sy = useSpring(my, { stiffness: 30, damping: 20 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my]);

  const x1 = useTransform(sx, (v) => v * 120);
  const y1 = useTransform(sy, (v) => v * 80);
  const x2 = useTransform(sx, (v) => v * -90);
  const y2 = useTransform(sy, (v) => v * -110);
  const x3 = useTransform(sx, (v) => v * 60);
  const y3 = useTransform(sy, (v) => v * -60);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <motion.div
        style={{ x: x1, y: y1 }}
        className="absolute -left-24 top-10 size-[28rem] rounded-full bg-lavender opacity-60 blur-3xl md:size-[36rem] dark:opacity-30"
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        style={{ x: x2, y: y2 }}
        className="absolute -right-20 top-32 size-[24rem] rounded-full bg-rose opacity-55 blur-3xl md:size-[32rem] dark:opacity-25"
        animate={{ scale: [1.05, 0.95, 1.05] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        style={{ x: x3, y: y3 }}
        className="absolute bottom-0 left-1/3 size-[22rem] rounded-full bg-sage opacity-55 blur-3xl md:size-[28rem] dark:opacity-25"
        animate={{ scale: [0.95, 1.06, 0.95] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* fine grid */}
      <div
        className="absolute inset-0 opacity-[0.35] dark:opacity-[0.15]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--line) 1px, transparent 1px), linear-gradient(to bottom, var(--line) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />
    </div>
  );
}

export function Hero() {
  const words = site.role.split(" ");
  const webCount = projects.filter((p) => p.category === "web").length;
  const dataCount = projects.length - webCount;

  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden px-6 pb-20 pt-36">
      <Blobs />
      <div className="mx-auto w-full max-w-6xl">
        {site.available && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/70 px-4 py-1.5 text-xs text-muted backdrop-blur"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-sage opacity-80" />
              <span className="relative inline-flex size-2 rounded-full bg-[#7f9f7a]" />
            </span>
            Open to new opportunities · {site.location}
          </motion.div>
        )}

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.8 }}
          className="eyebrow mb-5"
        >
          Hello, I&apos;m {site.name}
        </motion.p>

        <h1 className="font-display text-[clamp(2.9rem,8.5vw,7.5rem)] font-light leading-[0.95] tracking-[-0.03em] text-ink">
          {words.map((w, i) => (
            <span key={i} className="inline-block overflow-hidden pb-2 align-bottom">
              <motion.span
                className={`inline-block ${w === "&" ? "font-normal italic text-gold-ink" : ""}`}
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, ease, delay: 0.15 + i * 0.08 }}
              >
                {w}
                {i < words.length - 1 && " "}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.55 }}
          className="mt-8 max-w-xl text-lg leading-relaxed text-muted md:text-xl"
        >
          {site.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.7 }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <Magnetic>
            <Button href="#projects">
              View projects
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Magnetic>
          <Magnetic>
            <Button href={site.cvPath} variant="ghost" download>
              <FileDown className="size-4" /> Download CV
            </Button>
          </Magnetic>
          <Magnetic>
            <Button href="#contact" variant="ghost">
              <Mail className="size-4" /> Contact
            </Button>
          </Magnetic>
        </motion.div>

        <motion.dl
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-20 grid max-w-lg grid-cols-3 gap-6 border-t border-line pt-6"
        >
          {[
            { k: "Web systems", v: webCount },
            { k: "Data projects", v: dataCount },
            { k: "Disciplines", v: 2 },
          ].map((s) => (
            <div key={s.k}>
              <dt className="text-xs text-muted">{s.k}</dt>
              <dd className="mt-1 font-display text-3xl font-light">{String(s.v).padStart(2, "0")}</dd>
            </div>
          ))}
        </motion.dl>
      </div>

      <motion.a
        href="#projects"
        aria-label="Scroll to projects"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ opacity: { delay: 1.4 }, y: { duration: 2.4, repeat: Infinity, ease: "easeInOut" } }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-xs text-muted md:flex"
      >
        <ArrowDown className="size-4" /> Scroll
      </motion.a>
    </section>
  );
}

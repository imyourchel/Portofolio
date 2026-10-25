"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { ArrowRight, BarChart3, Code2, Copy, FileDown, Hash, Mail, Moon, Search } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { sections } from "./navbar";
import { useToast } from "./providers";
import { cn } from "@/lib/accent";

type Item = {
  id: string;
  group: string;
  label: string;
  hint?: string;
  icon: React.ReactNode;
  run: () => void;
};

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const { toast } = useToast();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setIndex(0);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") close();
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-command-palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-command-palette", onOpen);
    };
  }, [close]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 30);
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const items: Item[] = useMemo(
    () => [
      ...sections.map((s) => ({
        id: `s-${s.id}`,
        group: "Navigate",
        label: s.label,
        hint: "Section",
        icon: <Hash className="size-4" />,
        run: () => router.push(`/#${s.id}`),
      })),
      ...projects.map((p) => ({
        id: `p-${p.slug}`,
        group: "Projects",
        label: p.title,
        hint: p.category === "web" ? "Web" : "Data",
        icon: p.category === "web" ? <Code2 className="size-4" /> : <BarChart3 className="size-4" />,
        run: () => router.push(`/projects/${p.slug}`),
      })),
      {
        id: "a-theme",
        group: "Actions",
        label: `Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`,
        icon: <Moon className="size-4" />,
        run: () => setTheme(resolvedTheme === "dark" ? "light" : "dark"),
      },
      {
        id: "a-copy",
        group: "Actions",
        label: "Copy email address",
        hint: site.email,
        icon: <Copy className="size-4" />,
        run: () => {
          navigator.clipboard?.writeText(site.email);
          toast("Email copied to clipboard");
        },
      },
      {
        id: "a-mail",
        group: "Actions",
        label: "Send me an email",
        icon: <Mail className="size-4" />,
        run: () => (window.location.href = `mailto:${site.email}`),
      },
      {
        id: "a-cv",
        group: "Actions",
        label: "Download CV",
        icon: <FileDown className="size-4" />,
        run: () => window.open(site.cvPath, "_blank"),
      },
    ],
    [router, resolvedTheme, setTheme, toast]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((i) => `${i.label} ${i.group} ${i.hint ?? ""}`.toLowerCase().includes(q));
  }, [items, query]);

  useEffect(() => setIndex(0), [query]);

  useEffect(() => {
    listRef.current?.querySelector(`[data-index="${index}"]`)?.scrollIntoView({ block: "nearest" });
  }, [index]);

  const runItem = (item?: Item) => {
    if (!item) return;
    close();
    item.run();
  };

  let lastGroup = "";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-start justify-center px-4 pt-[14vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-ink/25 backdrop-blur-sm" onClick={close} />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-line bg-surface shadow-lifted"
          >
            <div className="flex items-center gap-3 border-b border-line px-5">
              <Search className="size-4 text-muted" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") {
                    e.preventDefault();
                    setIndex((i) => Math.min(i + 1, filtered.length - 1));
                  } else if (e.key === "ArrowUp") {
                    e.preventDefault();
                    setIndex((i) => Math.max(i - 1, 0));
                  } else if (e.key === "Enter") {
                    e.preventDefault();
                    runItem(filtered[index]);
                  }
                }}
                placeholder="Search sections, projects, actions…"
                className="h-14 w-full bg-transparent text-[15px] text-ink outline-none placeholder:text-muted focus-visible:outline-none"
                aria-label="Search"
              />
              <kbd className="rounded-md border border-line px-1.5 py-0.5 font-mono text-[10px] text-muted">ESC</kbd>
            </div>
            <div ref={listRef} className="max-h-[50vh] overflow-y-auto p-2">
              {filtered.length === 0 && (
                <p className="px-4 py-10 text-center text-sm text-muted">Nothing matches “{query}”.</p>
              )}
              {filtered.map((item, i) => {
                const showGroup = item.group !== lastGroup;
                lastGroup = item.group;
                return (
                  <div key={item.id}>
                    {showGroup && (
                      <p className="px-3 pb-1.5 pt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                        {item.group}
                      </p>
                    )}
                    <button
                      data-index={i}
                      onMouseMove={() => setIndex(i)}
                      onClick={() => runItem(item)}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors",
                        i === index ? "bg-lavender/40 text-ink" : "text-ink/80"
                      )}
                    >
                      <span className="grid size-8 place-items-center rounded-lg border border-line bg-bg text-muted">
                        {item.icon}
                      </span>
                      <span className="flex-1">{item.label}</span>
                      {item.hint && <span className="font-mono text-[11px] text-muted">{item.hint}</span>}
                      {i === index && <ArrowRight className="size-3.5 text-muted" />}
                    </button>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

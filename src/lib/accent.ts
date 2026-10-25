import type { Accent } from "@/content/projects";

/** Tailwind classes per accent (written out in full so Tailwind can detect them). */
export const accentBg: Record<Accent, string> = {
  sage: "bg-sage",
  rose: "bg-rose",
  lavender: "bg-lavender",
  powder: "bg-powder",
};

export const accentSoft: Record<Accent, string> = {
  sage: "bg-sage/35 text-ink",
  rose: "bg-rose/40 text-ink",
  lavender: "bg-lavender/45 text-ink",
  powder: "bg-powder/45 text-ink",
};

/** Mid-tone chart colours: readable on both ivory and plum-charcoal. */
export const chartColor: Record<Accent, string> = {
  sage: "#8fae8a",
  rose: "#d49a9a",
  lavender: "#a99bd6",
  powder: "#8fb2d6",
};

export const cn = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(" ");

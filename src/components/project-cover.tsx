import { BarChart3, Code2 } from "lucide-react";
import type { Project } from "@/content/projects";
import { accentBg, cn } from "@/lib/accent";

/**
 * Generated cover art so the site looks finished before you have screenshots.
 * Set `cover: "/projects/xxx.png"` logic here later if you want real images.
 */
export function ProjectCover({ project, index, large }: { project: Project; index: number; large?: boolean }) {
  const Icon = project.category === "web" ? Code2 : BarChart3;
  return (
    <div className={cn("relative overflow-hidden", accentBg[project.accent], large ? "aspect-[21/9]" : "aspect-[16/10]")}>
      {/* soft light */}
      <div className="absolute -right-10 -top-10 size-2/3 rounded-full bg-white/40 blur-2xl dark:bg-white/10" />
      {/* line pattern */}
      <svg className="absolute inset-0 h-full w-full text-ink/[0.07]" aria-hidden>
        <defs>
          <pattern id={`p-${project.slug}`} width="22" height="22" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
            <line x1="0" y1="0" x2="0" y2="22" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#p-${project.slug})`} />
      </svg>

      {/* abstract UI / chart motif */}
      <div className="absolute inset-x-[12%] bottom-0 top-[22%] rounded-t-2xl border border-white/60 bg-white/55 p-4 shadow-soft backdrop-blur-sm dark:border-white/10 dark:bg-black/20">
        <div className="mb-3 flex gap-1.5">
          <span className="size-2 rounded-full bg-ink/20" />
          <span className="size-2 rounded-full bg-ink/15" />
          <span className="size-2 rounded-full bg-ink/10" />
        </div>
        {project.category === "data" ? (
          <div className="flex h-[60%] items-end gap-[6%]">
            {[45, 70, 55, 88, 64, 78, 50].map((h, i) => (
              <span key={i} className="flex-1 rounded-t-md bg-ink/15" style={{ height: `${h}%` }} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-2">
            <span className="col-span-2 h-3 rounded-full bg-ink/15" />
            <span className="h-3 rounded-full bg-ink/10" />
            <span className="col-span-3 h-12 rounded-lg bg-ink/[0.08]" />
            <span className="h-8 rounded-lg bg-ink/10" />
            <span className="h-8 rounded-lg bg-ink/[0.08]" />
            <span className="h-8 rounded-lg bg-ink/10" />
          </div>
        )}
      </div>

      <span className="absolute left-5 top-4 font-mono text-xs text-ink/60">
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className="absolute right-4 top-4 grid size-8 place-items-center rounded-full bg-white/60 text-ink/70 dark:bg-black/20">
        <Icon className="size-4" />
      </span>
    </div>
  );
}

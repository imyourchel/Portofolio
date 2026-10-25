import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, FolderGit2, LayoutDashboard, Lightbulb } from "lucide-react";
import { getProject, projects } from "@/content/projects";
import { accentBg, accentSoft, cn } from "@/lib/accent";
import { Button } from "@/components/buttons";
import { Gallery } from "@/components/gallery";
import { InteractiveChart } from "@/components/interactive-chart";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { ProjectCover } from "@/components/project-cover";
import { ScrollProgress } from "@/components/scroll-progress";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.summary,
    openGraph: { title: p.title, description: p.summary },
  };
}

function Block({ label, title, children }: { label: string; title: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-6 border-t border-line py-14 md:grid-cols-[1fr_2.2fr] md:gap-12 md:py-20">
      <Reveal>
        <p className="eyebrow mb-3">{label}</p>
        <h2 className="font-display text-3xl font-light leading-tight md:text-4xl">{title}</h2>
      </Reveal>
      <div>{children}</div>
    </section>
  );
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.indexOf(project);
  const nextProject = projects[(index + 1) % projects.length];
  const isWeb = project.category === "web";

  return (
    <article className="px-6 pb-24 pt-32 md:pt-40">
      <ScrollProgress />
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <Link href="/#projects" className="group mb-10 inline-flex items-center gap-2 text-sm text-muted hover:text-ink">
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" /> All projects
          </Link>
        </Reveal>

        {/* Header */}
        <header className="mb-12 grid gap-10 md:grid-cols-[1.4fr_1fr] md:items-end">
          <div>
            <Reveal delay={0.05} className="mb-5 flex items-center gap-3">
              <span className={cn("rounded-full px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em]", accentSoft[project.accent])}>
                {isWeb ? "Web project" : "Data project"}
              </span>
              <span className="font-mono text-xs text-muted">{project.year}</span>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="font-display text-[clamp(2.6rem,7vw,5.5rem)] font-light leading-[0.98] tracking-[-0.02em]">
                {project.title}
              </h1>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{project.summary}</p>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <dl className="space-y-4 rounded-3xl border border-line bg-surface p-6 shadow-soft">
              <div>
                <dt className="text-xs text-muted">Role</dt>
                <dd className="mt-1 font-medium">{project.role}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted">Stack</dt>
                <dd className="mt-2 flex flex-wrap gap-1.5">
                  {project.stack.map((s) => (
                    <span key={s} className="rounded-full border border-line px-2.5 py-1 font-mono text-[11px] text-ink/80">
                      {s}
                    </span>
                  ))}
                </dd>
              </div>
              {project.links && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.links.demo && (
                    <Button href={project.links.demo} external className="px-4 py-2">
                      Live demo <ArrowUpRight className="size-4" />
                    </Button>
                  )}
                  {project.links.repo && (
                    <Button href={project.links.repo} external variant="ghost" className="px-4 py-2">
                      <FolderGit2 className="size-4" /> Repository
                    </Button>
                  )}
                  {project.links.dashboard && (
                    <Button href={project.links.dashboard} external variant="ghost" className="px-4 py-2">
                      <LayoutDashboard className="size-4" /> Dashboard
                    </Button>
                  )}
                </div>
              )}
            </dl>
          </Reveal>
        </header>

        <Reveal delay={0.1} y={40}>
          <div className="overflow-hidden rounded-[2rem] border border-line shadow-lifted">
            <ProjectCover project={project} index={index} large />
          </div>
        </Reveal>

        {project.metrics && (
          <Stagger className="mt-8 flex flex-wrap gap-px overflow-hidden rounded-3xl border border-line bg-line">
            {project.metrics.map((m) => (
              <StaggerItem key={m.label} className="min-w-[45%] flex-1 bg-surface px-6 py-6 md:min-w-0">
                <p className="font-display text-4xl font-light">{m.value}</p>
                <p className="mt-1 text-sm text-muted">{m.label}</p>
              </StaggerItem>
            ))}
          </Stagger>
        )}

        <div className="mt-16">
          <Block label="01 — Context" title="The problem">
            <Reveal>
              <p className="text-xl leading-relaxed text-ink/85">{project.problem}</p>
            </Reveal>
            {project.question && (
              <Reveal delay={0.1}>
                <blockquote className={cn("mt-8 rounded-3xl p-6 md:p-8", accentSoft[project.accent])}>
                  <p className="eyebrow mb-2 !text-ink/60">Business question</p>
                  <p className="font-display text-2xl font-light italic leading-snug md:text-3xl">“{project.question}”</p>
                </blockquote>
              </Reveal>
            )}
            {project.dataset && (
              <Reveal delay={0.15}>
                <p className="mt-6 text-sm text-muted">
                  <span className="font-medium text-ink">Dataset — </span>
                  {project.dataset}
                </p>
              </Reveal>
            )}
          </Block>

          {/* ----- WEB ----- */}
          {project.features && (
            <Block label="02 — Solution" title="Key features">
              <Stagger className="grid gap-4 sm:grid-cols-2">
                {project.features.map((f, i) => (
                  <StaggerItem key={f.title}>
                    <div className="group h-full rounded-2xl border border-line bg-surface p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-lifted">
                      <span className="font-mono text-xs text-gold-ink">0{i + 1}</span>
                      <h3 className="mt-3 font-display text-xl font-normal">{f.title}</h3>
                      <p className="mt-2 text-[15px] leading-relaxed text-muted">{f.desc}</p>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </Block>
          )}

          {project.architecture && (
            <Block label="03 — Architecture" title="How it fits together">
              <Stagger className="flex flex-col gap-2" gap={0.1}>
                {project.architecture.map((a, i) => (
                  <StaggerItem key={a.layer}>
                    <div className="flex items-center gap-4 rounded-2xl border border-line bg-surface px-5 py-4">
                      <span className={cn("size-3 shrink-0 rounded-full", accentBg[project.accent])} />
                      <span className="font-medium">{a.layer}</span>
                      <span className="ml-auto text-right text-sm text-muted">{a.detail}</span>
                    </div>
                    {i < project.architecture!.length - 1 && (
                      <div className="ml-[25px] h-4 w-px bg-gradient-to-b from-gold to-line" />
                    )}
                  </StaggerItem>
                ))}
              </Stagger>
            </Block>
          )}

          {project.gallery && (
            <Block label="04 — Screens" title="A closer look">
              <Gallery shots={project.gallery} accent={project.accent} />
            </Block>
          )}

          {/* ----- DATA ----- */}
          {project.method && (
            <Block label="02 — Method" title="How I approached it">
              <Stagger className="space-y-3">
                {project.method.map((m, i) => (
                  <StaggerItem key={m.step}>
                    <div className="flex gap-5 rounded-2xl border border-line bg-surface p-5">
                      <span className="grid size-9 shrink-0 place-items-center rounded-full bg-surface-2 font-mono text-xs">{i + 1}</span>
                      <div>
                        <h3 className="font-medium">{m.step}</h3>
                        <p className="mt-1 text-[15px] leading-relaxed text-muted">{m.detail}</p>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </Block>
          )}

          {project.chart && (
            <section className="border-t border-line py-14 md:py-20">
              <Reveal className="mb-8">
                <p className="eyebrow mb-3">03 — Explore the data</p>
                <h2 className="font-display text-3xl font-light md:text-4xl">Interactive view</h2>
                <p className="mt-2 text-sm text-muted">Hover for values, toggle series, and filter by segment.</p>
              </Reveal>
              <Reveal delay={0.1}>
                <InteractiveChart spec={project.chart} />
              </Reveal>
            </section>
          )}

          {project.insights && (
            <Block label="04 — Findings" title="Key insights">
              <Stagger className="space-y-4">
                {project.insights.map((ins, i) => (
                  <StaggerItem key={i}>
                    <div className="flex gap-5">
                      <span className="font-display text-5xl font-light leading-none text-gold-ink">{i + 1}</span>
                      <p className="pt-1 text-lg leading-relaxed text-ink/85">{ins}</p>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
              {project.recommendation && (
                <Reveal delay={0.1}>
                  <div className="mt-10 flex gap-4 rounded-3xl border border-gold/40 bg-surface p-6 shadow-soft">
                    <Lightbulb className="mt-1 size-5 shrink-0 text-gold-ink" />
                    <div>
                      <p className="eyebrow mb-1">Recommendation</p>
                      <p className="text-lg leading-relaxed">{project.recommendation}</p>
                    </div>
                  </div>
                </Reveal>
              )}
            </Block>
          )}
        </div>

        {/* Next project */}
        <Reveal>
          <Link
            href={`/projects/${nextProject.slug}`}
            className="group mt-8 flex items-center justify-between gap-6 rounded-[2rem] border border-line bg-surface p-8 shadow-soft transition-all duration-500 hover:shadow-lifted md:p-12"
          >
            <div>
              <p className="eyebrow mb-3">Next project</p>
              <p className="font-display text-3xl font-light md:text-5xl">{nextProject.title}</p>
            </div>
            <span className={cn("grid size-14 shrink-0 place-items-center rounded-full transition-transform duration-500 group-hover:translate-x-1 group-hover:-rotate-45", accentBg[nextProject.accent])}>
              <ArrowRight className="size-5 text-ink" />
            </span>
          </Link>
        </Reveal>
      </div>
    </article>
  );
}

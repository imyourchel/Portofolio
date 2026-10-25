import { site } from "@/content/site";
import { Reveal, SectionHeading } from "./motion";

export function AboutSection() {
  return (
    <section id="about" className="relative px-6 py-24 md:py-36">
      <div aria-hidden className="absolute inset-0 -z-10 bg-surface-2/60" />
      <div className="mx-auto grid max-w-6xl gap-14 md:grid-cols-[0.9fr_1.1fr] md:gap-20">
        <Reveal>
          {/* Ganti dengan foto: <Image src="/me.jpg" alt={site.name} fill className="object-cover" /> */}
          <div className="relative mx-auto aspect-[4/5] max-w-sm overflow-hidden rounded-[2rem] border border-line bg-gradient-to-br from-lavender via-rose/70 to-sage shadow-lifted">
            <div className="absolute inset-0 grid place-items-center">
              <span className="font-display text-[9rem] font-light italic text-ink/80">{site.name[0]}</span>
            </div>
            <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/50 bg-white/60 px-4 py-3 text-sm text-ink backdrop-blur dark:border-white/10 dark:bg-black/30">
              <p className="font-medium">{site.fullName}</p>
              <p className="text-xs text-ink/70">{site.role}</p>
            </div>
          </div>
        </Reveal>
        <div>
          <SectionHeading
            eyebrow="About"
            title={
              <>
                Calm systems, <em className="font-normal text-gold-ink">clear numbers</em>
              </>
            }
          />
          <div className="space-y-5 text-lg leading-relaxed text-ink/80">
            {site.about.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line">
              {site.facts.map((f) => (
                <div key={f.label} className="bg-surface px-5 py-4">
                  <dt className="text-xs text-muted">{f.label}</dt>
                  <dd className="mt-1 text-sm font-medium">{f.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

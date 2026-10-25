import { Button } from "@/components/buttons";

export default function NotFound() {
  return (
    <section className="grid min-h-[80vh] place-items-center px-6 pt-24 text-center">
      <div>
        <p className="eyebrow mb-4">404</p>
        <h1 className="font-display text-5xl font-light md:text-7xl">
          This page <em className="text-gold-ink">wandered off</em>
        </h1>
        <p className="mx-auto mt-5 max-w-md text-muted">The link may be outdated. Let&apos;s get you back to the work.</p>
        <div className="mt-8 flex justify-center">
          <Button href="/">Back home</Button>
        </div>
      </div>
    </section>
  );
}

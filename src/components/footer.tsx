import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-line px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-muted md:flex-row">
        <p>
          © {new Date().getFullYear()} {site.fullName}. Designed & built with care.
        </p>
        <p className="font-mono text-xs">
          Press <kbd className="rounded border border-line px-1.5 py-0.5">Ctrl</kbd> +{" "}
          <kbd className="rounded border border-line px-1.5 py-0.5">K</kbd> to explore
        </p>
      </div>
    </footer>
  );
}

import Link from "next/link";
import { cn } from "@/lib/accent";

type Variant = "primary" | "ghost" | "soft";

const styles: Record<Variant, string> = {
  primary:
    "bg-ink text-bg hover:shadow-lifted hover:-translate-y-0.5",
  ghost:
    "border border-line bg-surface/60 text-ink backdrop-blur hover:border-gold/60 hover:bg-surface",
  soft: "bg-lavender/50 text-ink hover:bg-lavender/80",
};

export function Button({
  href,
  children,
  variant = "primary",
  className,
  external,
  download,
  ...rest
}: {
  href?: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  external?: boolean;
  download?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const cls = cn(
    "group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-300",
    styles[variant],
    className
  );
  if (href) {
    if (external || download || href.startsWith("mailto:") || href.endsWith(".pdf")) {
      return (
        <a
          href={href}
          className={cls}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          {...(download ? { download: "" } : {})}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}

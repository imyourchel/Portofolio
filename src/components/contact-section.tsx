"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, Copy, Send } from "lucide-react";
import { useState } from "react";
import { site } from "@/content/site";
import { cn } from "@/lib/accent";
import { Magnetic, Reveal, SectionHeading } from "./motion";
import { useToast } from "./providers";

type Errors = Partial<Record<"name" | "email" | "message", string>>;

function validate(v: { name: string; email: string; message: string }): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = "Please enter a valid email.";
  if (v.message.trim().length < 10) e.message = "A few more words, please (10+ characters).";
  return e;
}

function Field({
  id,
  label,
  error,
  textarea,
  ...rest
}: {
  id: string;
  label: string;
  error?: string;
  textarea?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement> &
  React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const cls = cn(
    "peer w-full rounded-2xl border bg-bg px-4 pb-3 pt-6 text-[15px] text-ink outline-none transition-colors placeholder:text-transparent focus:border-gold",
    error ? "border-[#c47a7a]" : "border-line"
  );
  return (
    <div className="relative">
      {textarea ? (
        <textarea id={id} rows={5} placeholder={label} className={cn(cls, "resize-none")} aria-invalid={!!error} aria-describedby={error ? `${id}-err` : undefined} {...rest} />
      ) : (
        <input id={id} placeholder={label} className={cls} aria-invalid={!!error} aria-describedby={error ? `${id}-err` : undefined} {...rest} />
      )}
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-4 top-2 text-xs text-muted transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-[15px] peer-focus:top-2 peer-focus:text-xs"
      >
        {label}
      </label>
      <AnimatePresence>
        {error && (
          <motion.p
            id={`${id}-err`}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-1.5 pl-1 text-xs text-[#a85d5d] dark:text-[#e0a0a0]"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export function ContactSection() {
  const { toast } = useToast();
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);

  const update = (k: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement & HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const er = validate(values);
    setErrors(er);
    if (Object.keys(er).length) return;
    // Tanpa backend: buka aplikasi email dengan isi yang sudah terisi.
    // Ganti dengan Formspree / Resend / API route jika ingin terkirim langsung.
    const subject = encodeURIComponent(`Portfolio inquiry from ${values.name}`);
    const body = encodeURIComponent(`${values.message}\n\n— ${values.name} (${values.email})`);
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  const copyEmail = async () => {
    await navigator.clipboard?.writeText(site.email);
    setCopied(true);
    toast("Email copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="px-6 py-24 md:py-36">
      <div className="mx-auto grid max-w-6xl gap-14 md:grid-cols-2 md:gap-20">
        <div>
          <SectionHeading
            eyebrow="Contact"
            title={
              <>
                Let&apos;s build something <em className="font-normal text-gold-ink">useful</em>
              </>
            }
            sub="Hiring for a web or data role, or have a project in mind? I usually reply within a day."
          />
          <Reveal className="space-y-3">
            <button
              onClick={copyEmail}
              className="group flex w-full items-center justify-between rounded-2xl border border-line bg-surface px-5 py-4 text-left shadow-soft transition-colors hover:border-gold/60"
            >
              <span>
                <span className="block text-xs text-muted">Email</span>
                <span className="font-medium">{site.email}</span>
              </span>
              <span className="grid size-9 place-items-center rounded-full bg-surface-2 text-muted transition-colors group-hover:text-ink">
                {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
              </span>
            </button>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "LinkedIn", href: site.socials.linkedin },
                { label: "GitHub", href: site.socials.github },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between rounded-2xl border border-line bg-surface px-5 py-4 shadow-soft transition-colors hover:border-gold/60"
                >
                  <span className="font-medium">{s.label}</span>
                  <ArrowUpRight className="size-4 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="relative overflow-hidden rounded-[2rem] border border-line bg-surface p-6 shadow-lifted md:p-8">
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="ok"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex min-h-[26rem] flex-col items-center justify-center text-center"
                >
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.1 }}
                    className="mb-6 grid size-16 place-items-center rounded-full bg-sage"
                  >
                    <Check className="size-7 text-ink" />
                  </motion.span>
                  <h3 className="font-display text-3xl font-light">Thank you, {values.name.split(" ")[0]}.</h3>
                  <p className="mt-3 max-w-xs text-muted">Your email app should have opened with the message ready to send.</p>
                  <button
                    onClick={() => {
                      setSent(false);
                      setValues({ name: "", email: "", message: "" });
                    }}
                    className="mt-8 text-sm text-gold-ink underline-offset-4 hover:underline"
                  >
                    Write another message
                  </button>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={submit} noValidate exit={{ opacity: 0 }} className="space-y-4">
                  <Field id="name" label="Your name" value={values.name} onChange={update("name")} error={errors.name} autoComplete="name" />
                  <Field id="email" label="Email address" type="email" value={values.email} onChange={update("email")} error={errors.email} autoComplete="email" />
                  <Field id="message" label="What would you like to talk about?" textarea value={values.message} onChange={update("message")} error={errors.message} />
                  <div className="flex items-center justify-between pt-2">
                    <p className="text-xs text-muted">No spam. Just a reply.</p>
                    <Magnetic>
                      <button
                        type="submit"
                        className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-bg transition-shadow hover:shadow-lifted"
                      >
                        Send message
                        <Send className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </button>
                    </Magnetic>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

"use client";

import { ThemeProvider } from "next-themes";
import { MotionConfig } from "framer-motion";
import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";

/* ---------------- Toast ---------------- */
type ToastCtx = { toast: (msg: string) => void };
const ToastContext = createContext<ToastCtx>({ toast: () => {} });
export const useToast = () => useContext(ToastContext);

/* ------------- Skill → project highlight ------------- */
type HighlightCtx = {
  skill: string | null;
  slugs: string[];
  setHighlight: (skill: string | null, slugs?: string[]) => void;
};
const HighlightContext = createContext<HighlightCtx>({
  skill: null,
  slugs: [],
  setHighlight: () => {},
});
export const useHighlight = () => useContext(HighlightContext);

export function Providers({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<{ id: number; msg: string }[]>([]);
  const toast = useCallback((msg: string) => {
    const id = Date.now();
    setToasts((t) => [...t, { id, msg }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2400);
  }, []);

  const [hl, setHl] = useState<{ skill: string | null; slugs: string[] }>({ skill: null, slugs: [] });
  const setHighlight = useCallback(
    (skill: string | null, slugs: string[] = []) => setHl({ skill, slugs }),
    []
  );

  const toastValue = useMemo(() => ({ toast }), [toast]);
  const hlValue = useMemo(() => ({ ...hl, setHighlight }), [hl, setHighlight]);

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange={false}>
      <MotionConfig reducedMotion="user">
        <ToastContext.Provider value={toastValue}>
          <HighlightContext.Provider value={hlValue}>
            {children}
            <div
              aria-live="polite"
              className="pointer-events-none fixed inset-x-0 bottom-6 z-[70] flex flex-col items-center gap-2 px-4"
            >
              <AnimatePresence>
                {toasts.map((t) => (
                  <motion.div
                    key={t.id}
                    initial={{ opacity: 0, y: 16, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    className="flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2.5 text-sm shadow-lifted"
                  >
                    <span className="grid size-5 place-items-center rounded-full bg-sage">
                      <Check className="size-3 text-ink" />
                    </span>
                    {t.msg}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </HighlightContext.Provider>
        </ToastContext.Provider>
      </MotionConfig>
    </ThemeProvider>
  );
}

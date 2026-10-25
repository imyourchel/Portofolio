"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { ChartSpec } from "@/content/projects";
import { chartColor, cn } from "@/lib/accent";

type TipProps = {
  active?: boolean;
  label?: string | number;
  payload?: { dataKey?: string | number; value?: number | string; color?: string; name?: string }[];
  unit?: string;
};

function ChartTooltip({ active, payload, label, unit }: TipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-line bg-surface px-3.5 py-2.5 text-sm shadow-lifted">
      <p className="mb-1.5 font-medium text-ink">{label}</p>
      {payload.map((p) => (
        <p key={String(p.dataKey)} className="flex items-center gap-2 text-muted">
          <span className="size-2 rounded-full" style={{ background: p.color }} />
          {p.name}
          <span className="ml-auto pl-4 font-mono text-ink">
            {p.value}
            {unit}
          </span>
        </p>
      ))}
    </div>
  );
}

export function InteractiveChart({ spec }: { spec: ChartSpec }) {
  const [hidden, setHidden] = useState<string[]>([]);
  const [filter, setFilter] = useState<string>("All");

  const data = useMemo(
    () => (spec.filter && filter !== "All" ? spec.data.filter((d) => d[spec.filter!.key] === filter) : spec.data),
    [spec, filter]
  );
  const visible = spec.series.filter((s) => !hidden.includes(s.key));

  const axis = {
    tick: { fill: "var(--muted)", fontSize: 12, fontFamily: "var(--font-mono)" },
    axisLine: false,
    tickLine: false,
  } as const;

  const common = (
    <>
      <CartesianGrid vertical={false} stroke="var(--line)" strokeDasharray="3 6" />
      <XAxis
        dataKey={spec.xKey}
        {...axis}
        interval={0}
        angle={data.length > 7 ? -35 : 0}
        textAnchor={data.length > 7 ? "end" : "middle"}
        height={data.length > 7 ? 70 : 30}
      />
      <YAxis {...axis} width={40} unit={spec.unit === "%" ? "%" : ""} />
      <Tooltip
        cursor={{ fill: "var(--surface-2)", stroke: "var(--line)" }}
        content={<ChartTooltip unit={spec.unit} />}
      />
    </>
  );

  const chart =
    spec.type === "bar" ? (
      <BarChart data={data} barGap={6} barCategoryGap="22%">
        {common}
        {visible.map((s) => (
          <Bar key={s.key} dataKey={s.key} name={s.label} fill={chartColor[s.color]} radius={[8, 8, 2, 2]} animationDuration={700} />
        ))}
      </BarChart>
    ) : spec.type === "line" ? (
      <LineChart data={data}>
        {common}
        {visible.map((s) => (
          <Line key={s.key} type="monotone" dataKey={s.key} name={s.label} stroke={chartColor[s.color]} strokeWidth={2.5} dot={false} activeDot={{ r: 5 }} />
        ))}
      </LineChart>
    ) : (
      <AreaChart data={data}>
        <defs>
          {spec.series.map((s) => (
            <linearGradient key={s.key} id={`g-${s.key}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={chartColor[s.color]} stopOpacity={0.45} />
              <stop offset="100%" stopColor={chartColor[s.color]} stopOpacity={0.02} />
            </linearGradient>
          ))}
        </defs>
        {common}
        {visible.map((s) => (
          <Area
            key={s.key}
            type="monotone"
            dataKey={s.key}
            name={s.label}
            stroke={chartColor[s.color]}
            strokeWidth={2.5}
            fill={`url(#g-${s.key})`}
            activeDot={{ r: 5 }}
          />
        ))}
      </AreaChart>
    );

  return (
    <div className="rounded-[1.75rem] border border-line bg-surface p-5 shadow-soft md:p-8">
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-start">
        <div>
          <h3 className="font-display text-2xl font-normal">{spec.title}</h3>
          {spec.caption && <p className="mt-1 text-xs text-muted">{spec.caption}</p>}
        </div>
        {/* Series toggles */}
        <div className="flex flex-wrap gap-2">
          {spec.series.map((s) => {
            const off = hidden.includes(s.key);
            return (
              <button
                key={s.key}
                onClick={() =>
                  setHidden((h) =>
                    off ? h.filter((k) => k !== s.key) : visible.length > 1 ? [...h, s.key] : h
                  )
                }
                aria-pressed={!off}
                className={cn(
                  "flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs transition-all",
                  off ? "border-line text-muted line-through opacity-60" : "border-line bg-surface-2 text-ink"
                )}
              >
                <span className="size-2.5 rounded-full" style={{ background: chartColor[s.color] }} />
                {s.label}
              </button>
            );
          })}
        </div>
      </div>

      {spec.filter && (
        <div className="mb-5 flex flex-wrap items-center gap-1.5" role="tablist" aria-label={spec.filter.label}>
          <span className="mr-2 text-xs text-muted">{spec.filter.label}</span>
          {["All", ...spec.filter.options].map((o) => (
            <button
              key={o}
              role="tab"
              aria-selected={filter === o}
              onClick={() => setFilter(o)}
              className={cn(
                "relative rounded-full px-3.5 py-1.5 text-xs transition-colors",
                filter === o ? "text-ink" : "text-muted hover:text-ink"
              )}
            >
              {filter === o && (
                <motion.span layoutId={`chart-filter-${spec.title}`} className="absolute inset-0 rounded-full bg-rose/45" />
              )}
              <span className="relative">{o}</span>
            </button>
          ))}
        </div>
      )}

      <div className="h-[340px] w-full md:h-[380px]">
        <ResponsiveContainer width="100%" height="100%">
          {chart}
        </ResponsiveContainer>
      </div>
    </div>
  );
}

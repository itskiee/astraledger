"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { formatINR } from "@/lib/format";

type Phase = "broken" | "pending" | "verified";

/**
 * The three states the last connector moves through.
 * This is the whole AstraLedger story in one picture:
 * money looks lost -> we recognise the pattern -> a human confirms it.
 */
const PHASES: Record<
  Phase,
  {
    line: string;
    dashed: boolean;
    badge: string;
    badgeClass: string;
    caption: string;
    marker: string | null;
  }
> = {
  broken: {
    line: "border-broken",
    dashed: true,
    badge: "Not found",
    badgeClass: "border-broken/40 bg-broken/10 text-broken",
    caption: "The bank credit has not arrived. The trail is broken.",
    marker: "✕",
  },
  pending: {
    line: "border-pending",
    dashed: true,
    badge: "Expected Pending · T+3",
    badgeClass: "border-pending/40 bg-pending/10 text-pending",
    caption: "History says WalletFlow usually pays on day 3. Still open — never closed.",
    marker: null,
  },
  verified: {
    line: "border-matched",
    dashed: false,
    badge: "Verified",
    badgeClass: "border-matched/40 bg-matched/10 text-matched",
    caption: "A human reviewed the evidence and confirmed the credit.",
    marker: null,
  },
};

const STEPS: Phase[] = ["broken", "pending", "verified"];

export function MoneyTrailAnimation() {
  const reduceMotion = useReducedMotion();
  const [phase, setPhase] = useState<Phase>(reduceMotion ? "verified" : "broken");

  useEffect(() => {
    // Accessibility: if the visitor turned off animations in their
    // computer settings, show the finished state and never move.
    if (reduceMotion) {
      setPhase("verified");
      return;
    }

    let i = 0;
    const timer = setInterval(() => {
      i = (i + 1) % STEPS.length;
      setPhase(STEPS[i]);
    }, 2800);

    return () => clearInterval(timer);
  }, [reduceMotion]);

  const state = PHASES[phase];

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: reduceMotion ? 0 : 0.12 } },
  };

  const item = {
    hidden: { opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="rounded-2xl border border-line bg-surface/60 p-5 sm:p-7">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex flex-col md:flex-row md:items-stretch"
      >
        <Node
          variants={item}
          label="Order"
          id="ORD-2025-001234"
          amount={formatINR(130000)}
        />
        <Connector tone="border-line" />

        <Node
          variants={item}
          label="Payment"
          id="PAY-8844221"
          amount={formatINR(130000)}
        />
        <Connector tone="border-line" />

        <Node
          variants={item}
          label="Settlement"
          id="SET-8842"
          amount={formatINR(124500)}
        />
        <Connector
          tone={state.line}
          dashed={state.dashed}
          marker={state.marker}
        />

        <Node
          variants={item}
          label="Bank credit"
          id="UTR — UTREF123456"
          amount={formatINR(124500)}
          badge={state.badge}
          badgeClass={state.badgeClass}
        />
      </motion.div>

      <p
        className="mt-5 min-h-10 text-sm text-fg-muted"
        aria-live="polite"
      >
        {state.caption}
      </p>
    </div>
  );
}

/* ---------- small pieces ---------- */

function Node({
  variants,
  label,
  id,
  amount,
  badge,
  badgeClass,
}: {
  variants: Record<string, unknown>;
  label: string;
  id: string;
  amount: string;
  badge?: string;
  badgeClass?: string;
}) {
  return (
    <motion.div
      variants={variants}
      className="rounded-xl border border-line bg-surface p-4 md:flex-1"
    >
      <p className="text-[11px] uppercase tracking-widest text-fg-muted">
        {label}
      </p>
      <p className="mt-1 truncate font-mono text-xs text-fg-muted">{id}</p>
      <p className="mt-2 font-mono text-lg tabular-nums text-fg">{amount}</p>

      {badge && (
        <span
          className={`mt-3 inline-block rounded-md border px-2 py-1 text-[11px] font-medium ${badgeClass}`}
        >
          {badge}
        </span>
      )}
    </motion.div>
  );
}

function Connector({
  tone,
  dashed = false,
  marker = null,
}: {
  tone: string;
  dashed?: boolean;
  marker?: string | null;
}) {
  const style = dashed ? "border-dashed" : "border-solid";

  return (
    <div className="relative flex shrink-0 items-center justify-center self-center py-2 md:min-w-10 md:flex-1 md:py-0">
      {/* stacked on phones: a short vertical line */}
      <div
        className={`h-8 w-0 border-l-2 transition-colors duration-500 md:hidden ${style} ${tone}`}
      />
      {/* side by side on desktop: a horizontal line */}
      <div
        className={`hidden w-full border-t-2 transition-colors duration-500 md:block ${style} ${tone}`}
      />

      {marker && (
        <span
          className={`absolute grid h-6 w-6 place-items-center rounded-full border bg-canvas text-[11px] transition-colors duration-500 ${tone} text-broken`}
        >
          {marker}
        </span>
      )}
    </div>
  );
}

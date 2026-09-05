import Link from "next/link";
import { MoneyTrailAnimation } from "./MoneyTrailAnimation";

export function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-5 pb-16 pt-16 sm:pt-24">
      <p className="mb-5 inline-block rounded-full border border-line bg-surface px-3 py-1 text-xs text-fg-muted">
        AI Finance Controller
      </p>

      <h1 className="max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight sm:text-6xl">
        See where money broke.
        <br />
        <span className="text-fg-muted">Prove why.</span>
        <br />
        <span className="text-signal">Prevent it next time.</span>
      </h1>

      <p className="mt-6 max-w-2xl text-base leading-relaxed text-fg-muted sm:text-lg">
        Payments, settlement reports and bank statements rarely agree. AstraLedger
        follows every rupee from order to bank credit, shows the exact source rows
        that prove what happened, and turns problems that keep repeating into
        prevention policies a manager approves — without ever hiding money that is
        genuinely missing.
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/login"
          className="rounded-lg bg-signal px-5 py-3 text-center text-sm font-semibold text-canvas transition hover:opacity-90"
        >
          Enter demo workspace
        </Link>
        <Link
          href="#how"
          className="rounded-lg border border-line px-5 py-3 text-center text-sm font-medium text-fg transition hover:border-signal hover:text-signal"
        >
          See how it works
        </Link>
      </div>

      <div className="mt-14">
        <MoneyTrailAnimation />
      </div>
    </section>
  );
}

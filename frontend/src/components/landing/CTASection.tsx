import Link from "next/link";

export function CTASection() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20">
      <div className="rounded-2xl border border-line bg-gradient-to-br from-surface to-surface-2 p-10 text-center">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Stop solving the same problem every month
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-fg-muted">
          Runs entirely on your own machine. Synthetic data. No external AI
          services. No payment credentials.
        </p>
        <Link
          href="/login"
          className="mt-8 inline-block rounded-lg bg-signal px-6 py-3 text-sm font-semibold text-canvas transition hover:opacity-90"
        >
          Enter demo workspace
        </Link>
      </div>
    </section>
  );
}

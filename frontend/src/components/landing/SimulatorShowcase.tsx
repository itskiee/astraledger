import { AlertTriangle } from "lucide-react";

export function SimulatorShowcase() {
  return (
    <section id="prevention" className="mx-auto max-w-6xl px-5 py-20">
      <div className="rounded-2xl border border-line bg-surface/60 p-6 sm:p-10">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Test the rule before you trust the rule
        </h2>
        <p className="mt-3 max-w-2xl text-fg-muted">
          When a delay keeps repeating, AstraLedger drafts a policy — for example,
          treat WalletFlow credits as pending until day 3. Before that policy can
          be switched on, it is replayed against past cycles so a manager can see
          exactly what would have changed.
        </p>

        {/* Honesty label — this is a mock-up, not a measurement */}
        <div className="mt-8 flex items-start gap-2 rounded-lg border border-pending/30 bg-pending/10 p-3 text-xs text-pending">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <p>
            Illustration only. The figures below show the shape of a simulation
            report. Real numbers are produced by running the engine on labelled
            data and are shown inside the app.
          </p>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <Bar label="Alerts before policy" width="w-full" tone="bg-broken" />
          <Bar label="Alerts after policy" width="w-1/4" tone="bg-pending" />
        </div>

        <dl className="mt-10 grid gap-6 border-t border-line pt-8 sm:grid-cols-3">
          <Stat term="Genuine risks preserved" detail="Still escalate after the window" />
          <Stat term="Unsafe suppressions" detail="Must be zero, or approval is refused" />
          <Stat term="Manager approval" detail="Scoped, time-limited, reversible" />
        </dl>
      </div>
    </section>
  );
}

function Bar({
  label,
  width,
  tone,
}: {
  label: string;
  width: string;
  tone: string;
}) {
  return (
    <div>
      <p className="mb-2 text-sm text-fg-muted">{label}</p>
      <div className="h-3 w-full rounded-full bg-surface-2">
        <div className={`h-3 rounded-full ${width} ${tone}`} />
      </div>
    </div>
  );
}

function Stat({ term, detail }: { term: string; detail: string }) {
  return (
    <div>
      <dt className="text-sm font-medium text-fg">{term}</dt>
      <dd className="mt-1 text-sm text-fg-muted">{detail}</dd>
    </div>
  );
}

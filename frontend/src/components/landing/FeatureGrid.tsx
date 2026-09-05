import { FileSearch, GitBranch, History, ShieldCheck } from "lucide-react";

const FEATURES = [
  {
    icon: FileSearch,
    title: "Evidence, not opinions",
    body: "Every finding links back to the exact source rows and the exact arithmetic. Original files are stored once and never edited, so the proof cannot drift.",
  },
  {
    icon: GitBranch,
    title: "A visual money trail",
    body: "Order, payment, settlement, bank credit — drawn as a chain. When a link breaks you can see which one, instead of scanning four spreadsheets.",
  },
  {
    icon: History,
    title: "It remembers",
    body: "Exceptions get a fingerprint. When the same failure appears across months, AstraLedger recognises it as one recurring problem rather than many separate ones.",
  },
  {
    icon: ShieldCheck,
    title: "Prevention with a handbrake",
    body: "A proposed policy is replayed against past cycles first. A manager approves it, it is scoped, it expires, and it can be rolled back at any time.",
  },
];

export function FeatureGrid() {
  return (
    <section id="how" className="mx-auto max-w-6xl px-5 py-20">
      <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
        Not another matching tool
      </h2>
      <p className="mt-3 max-w-2xl text-fg-muted">
        Matching engines tell you two records disagree. AstraLedger tells you why,
        shows you the proof, and helps you stop it happening again.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {FEATURES.map(({ icon: Icon, title, body }) => (
          <div
            key={title}
            className="rounded-xl border border-line bg-surface p-6 transition hover:border-signal/40"
          >
            <Icon className="h-5 w-5 text-signal" aria-hidden="true" />
            <h3 className="mt-4 font-medium">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-fg-muted">{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

import Link from "next/link";
import { Activity } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-canvas/75 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link href="/" className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-signal" aria-hidden="true" />
          <span className="text-base font-semibold tracking-tight">
            AstraLedger
          </span>
        </Link>

        <div className="hidden items-center gap-7 text-sm text-fg-muted sm:flex">
          <a href="#how" className="transition hover:text-fg">
            How it works
          </a>
          <a href="#prevention" className="transition hover:text-fg">
            Prevention
          </a>
        </div>

        <Link
          href="/login"
          className="rounded-lg border border-line px-4 py-2 text-sm font-medium text-fg transition hover:border-signal hover:text-signal"
        >
          Sign in
        </Link>
      </nav>
    </header>
  );
}

import Link from "next/link";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
      <aside className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-black">
        <nav aria-label="Member" className="space-y-1 text-sm">
          <Link href="/dashboard" className="block rounded-xl px-3 py-2 hover:bg-zinc-50 dark:hover:bg-zinc-950">
            Overview
          </Link>
          <Link href="/content" className="block rounded-xl px-3 py-2 hover:bg-zinc-50 dark:hover:bg-zinc-950">
            Content library
          </Link>
          <Link href="/billing" className="block rounded-xl px-3 py-2 hover:bg-zinc-50 dark:hover:bg-zinc-950">
            Billing
          </Link>
          <Link href="/profile" className="block rounded-xl px-3 py-2 hover:bg-zinc-50 dark:hover:bg-zinc-950">
            Profile & settings
          </Link>
        </nav>
      </aside>

      <div className="min-w-0">{children}</div>
    </div>
  );
}

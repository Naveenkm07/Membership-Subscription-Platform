import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { PLANS } from "@/lib/plans";

export default async function BillingPage() {
  const user = await getCurrentUser();

  return (
    <div className="mx-auto max-w-3xl space-y-10">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Billing</h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          This page is subscription-ready (stubbed). Replace API routes with real Stripe logic.
        </p>
      </header>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-black">
        <h2 className="text-base font-semibold">Current plan</h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          You&apos;re currently on <span className="font-medium">{user?.plan ?? "starter"}</span>.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <form action="/api/stripe/create-portal-session" method="post">
            <button
              type="submit"
              className="rounded-full border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-950"
              aria-label="Open customer portal"
            >
              Open customer portal (stub)
            </button>
          </form>

          <Link
            href="/pricing"
            className="rounded-full bg-zinc-900 px-4 py-2 text-center text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-black dark:hover:bg-zinc-200"
          >
            Change plan
          </Link>
        </div>
      </section>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-black">
        <h2 className="text-base font-semibold">Plans</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {PLANS.map((p) => (
            <div key={p.id} className="rounded-2xl border border-zinc-200 p-4 dark:border-zinc-800">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-sm font-semibold">{p.name}</div>
                  <div className="text-xs text-zinc-600 dark:text-zinc-400">${p.priceMonthlyUsd}/mo</div>
                </div>
                <form action="/api/stripe/create-checkout-session" method="post">
                  <input type="hidden" name="planId" value={p.id} />
                  <button
                    type="submit"
                    className="rounded-full bg-zinc-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-black dark:hover:bg-zinc-200"
                  >
                    Select
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

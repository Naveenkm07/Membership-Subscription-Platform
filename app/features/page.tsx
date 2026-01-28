export default function FeaturesPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">Features</h1>
        <p className="max-w-2xl text-zinc-600 dark:text-zinc-400">
          Everything you need to run a members-only product: gated content, dashboards, and subscription-ready billing.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-black">
          <h2 className="text-base font-semibold">Protected routes</h2>
          <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
            Middleware route gating keeps member pages private while marketing pages stay public.
          </p>
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-black">
          <h2 className="text-base font-semibold">Auth-aware UI</h2>
          <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
            Navigation and calls-to-action respond to auth state (stubbed via cookies for now).
          </p>
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-black">
          <h2 className="text-base font-semibold">Content gating by plan</h2>
          <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
            Mark lessons as free, starter, or pro—then show locked states with upgrade prompts.
          </p>
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-black">
          <h2 className="text-base font-semibold">Stripe-ready endpoints</h2>
          <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
            Checkout, portal, and webhook routes are stubbed and can be swapped for real Stripe logic.
          </p>
        </div>
      </section>
    </div>
  );
}

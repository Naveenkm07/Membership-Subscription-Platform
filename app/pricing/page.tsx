import { getCurrentUser } from "@/lib/auth";
import { PLANS } from "@/lib/plans";
import Link from "next/link";
import { createMetadata } from "../metadata";
import AccessBadge from "@/components/AccessBadge";
import UpgradeButton from "@/components/UpgradeButton";

export const metadata = createMetadata(
  "Pricing",
  "Choose a plan to unlock courses, premium articles, and member-only resources.",
  "/pricing"
);

export default async function PricingPage() {
  const user = await getCurrentUser();

  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">Pricing</h1>
        <p className="max-w-2xl text-zinc-600 dark:text-zinc-400">
          Choose a plan to unlock courses, premium articles, and member-only resources.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-2">
        {PLANS.map((plan) => {
          const isCurrent = user?.plan === plan.id;

          return (
            <div
              key={plan.id}
              className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-black"
            >
              <div className="flex items-start justify-between gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-semibold">{plan.name}</h2>
                    <AccessBadge
                      status={plan.id === "free" ? "unlocked" : plan.id === "basic" ? "unlocked" : "premium"}
                      size="sm"
                    />
                  </div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">{plan.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-semibold">${plan.priceMonthly}</div>
                  <div className="text-xs text-zinc-500 dark:text-zinc-500">per month</div>
                </div>
              </div>

              <ul className="mt-6 space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-600" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                {user ? (
                  <form action="/api/stripe/create-checkout-session" method="post" className="w-full sm:w-auto">
                    <input type="hidden" name="planId" value={plan.id} />
                    <UpgradeButton
                      href="#"
                      label={isCurrent ? "Current plan" : "Choose plan"}
                      variant={isCurrent ? "secondary" : "primary"}
                    />
                  </form>
                ) : (
                  <UpgradeButton href="/login?next=/pricing" label="Log in to subscribe" />
                )}

                <UpgradeButton href="/features" label="Compare features" variant="secondary" />
              </div>
            </div>
          );
        })}
      </section>

      {!user ? (
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Don&apos;t have an account yet?{" "}
          <Link href="/signup" className="font-medium text-zinc-900 underline underline-offset-4 dark:text-zinc-50">
            Sign up
          </Link>
          .
        </p>
      ) : null}
    </div>
  );
}

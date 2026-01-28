import Link from "next/link";
import { createMetadata } from "./metadata";
import { membershipProductSchema } from "./metadata";

export const metadata = createMetadata(
  "Membership Platform Scaffold",
  "Build a premium members area with gated content and subscriptions.",
  "/"
);

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(membershipProductSchema()) }}
      />
      <div className="space-y-16">
      <section className="rounded-3xl border border-zinc-200 bg-gradient-to-b from-zinc-50 to-white p-8 dark:border-zinc-800 dark:from-zinc-950 dark:to-black sm:p-12">
        <div className="max-w-2xl space-y-6">
          <p className="text-xs font-semibold tracking-widest text-zinc-500 dark:text-zinc-400">
            MEMBERSHIP PLATFORM SCAFFOLD
          </p>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Build a premium members area with gated content and subscriptions.
          </h1>
          <p className="text-lg leading-8 text-zinc-600 dark:text-zinc-300">
            This project is a production-ready starter for public marketing pages, protected member routes,
            and subscription-ready billing flows.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-5 py-3 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-black dark:hover:bg-zinc-200"
            >
              View pricing
            </Link>
            <Link
              href="/signup"
              className="inline-flex items-center justify-center rounded-full border border-zinc-200 px-5 py-3 text-sm font-medium text-zinc-900 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-950"
            >
              Create an account
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-black">
          <h2 className="text-base font-semibold">Gated content library</h2>
          <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
            Lock lessons and articles by plan, show previews, and route members to upgrade.
          </p>
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-black">
          <h2 className="text-base font-semibold">Auth-aware navigation</h2>
          <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
            Header links change based on auth state (stubbed via cookies for now).
          </p>
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-black">
          <h2 className="text-base font-semibold">Stripe-ready billing</h2>
          <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
            API routes are in place for checkout, customer portal, and webhooks.
          </p>
        </div>
      </section>
    </div>
    </>
  );
}

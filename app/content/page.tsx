import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { canAccess, CONTENT } from "@/lib/content";

export default async function ContentLibraryPage() {
  const user = await getCurrentUser();
  const userPlan = user?.plan ?? "starter";

  return (
    <div className="space-y-10">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Content library</h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Browse courses and articles. Items are locked based on your plan.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-2">
        {CONTENT.map((item) => {
          const allowed = canAccess(item.requiredPlan, userPlan);

          return (
            <div
              key={item.slug}
              className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-black"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <p className="text-xs font-semibold tracking-widest text-zinc-500 dark:text-zinc-500">
                    {item.type.toUpperCase()} • {item.requiredPlan.toUpperCase()}
                  </p>
                  <h2 className="text-base font-semibold">{item.title}</h2>
                  <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">{item.summary}</p>
                </div>
                {!allowed ? (
                  <span className="shrink-0 rounded-full border border-zinc-200 px-3 py-1 text-xs text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
                    Locked
                  </span>
                ) : null}
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                {allowed ? (
                  <Link
                    href={`/content/${item.slug}`}
                    className="rounded-full bg-zinc-900 px-4 py-2 text-center text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-black dark:hover:bg-zinc-200"
                  >
                    Open
                  </Link>
                ) : (
                  <Link
                    href="/pricing"
                    className="rounded-full bg-zinc-900 px-4 py-2 text-center text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-black dark:hover:bg-zinc-200"
                  >
                    Upgrade to unlock
                  </Link>
                )}

                <Link
                  href="/dashboard"
                  className="rounded-full border border-zinc-200 px-4 py-2 text-center text-sm font-medium text-zinc-900 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-950"
                >
                  Back to dashboard
                </Link>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}

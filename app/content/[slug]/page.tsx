import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { canAccess, getContentBySlug } from "@/lib/content";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ContentDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = getContentBySlug(slug);

  if (!item) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">Not found</h1>
        <Link href="/content" className="text-sm underline underline-offset-4">
          Back to library
        </Link>
      </div>
    );
  }

  const user = await getCurrentUser();
  const userPlan = user?.plan ?? "starter";
  const allowed = canAccess(item.requiredPlan, userPlan);

  return (
    <div className="space-y-10">
      <header className="space-y-2">
        <p className="text-xs font-semibold tracking-widest text-zinc-500 dark:text-zinc-500">
          {item.type.toUpperCase()} • {item.requiredPlan.toUpperCase()}
        </p>
        <h1 className="text-3xl font-semibold tracking-tight">{item.title}</h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">{item.summary}</p>
      </header>

      {!allowed ? (
        <section className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-black">
          <h2 className="text-base font-semibold">This content is locked</h2>
          <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
            Upgrade to Pro to access this lesson. Your current plan: {userPlan}.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/pricing"
              className="rounded-full bg-zinc-900 px-4 py-2 text-center text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-black dark:hover:bg-zinc-200"
            >
              View pricing
            </Link>
            <Link
              href="/content"
              className="rounded-full border border-zinc-200 px-4 py-2 text-center text-sm font-medium text-zinc-900 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-950"
            >
              Back to library
            </Link>
          </div>
        </section>
      ) : (
        <article className="prose max-w-none dark:prose-invert">
          <p>
            This is placeholder member content. Replace it with your real course modules, video embeds, downloads, and
            community links.
          </p>
          <h2>Key takeaways</h2>
          <ul>
            <li>Keep content structured and searchable.</li>
            <li>Use plan-based gating to create clear upgrade paths.</li>
            <li>Design for retention: progress, next steps, and habit loops.</li>
          </ul>
          <p>
            When you wire real auth + billing, use the user&apos;s subscription plan to determine access and personalize the
            experience.
          </p>
        </article>
      )}

      <div className="flex flex-col gap-3 sm:flex-row">
        <Link
          href="/content"
          className="rounded-full border border-zinc-200 px-4 py-2 text-center text-sm font-medium text-zinc-900 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-950"
        >
          Back to library
        </Link>
        <Link
          href="/dashboard"
          className="rounded-full border border-zinc-200 px-4 py-2 text-center text-sm font-medium text-zinc-900 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-950"
        >
          Dashboard
        </Link>
      </div>
    </div>
  );
}

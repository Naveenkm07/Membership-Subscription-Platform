import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import OnboardingWrapper from "@/components/OnboardingWrapper";
import ProgressBar from "@/components/ProgressBar";
import { getProgress } from "@/lib/auth";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  const onboardingProgress = await getProgress("onboarding");
  const coreProgress = await getProgress("core");

  const shouldShowOnboarding = user && !user.onboarded;

  return (
    <div className="space-y-10">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Welcome back{user ? `, ${user.email}` : ""}. This is a stubbed member dashboard.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-black">
          <h2 className="text-base font-semibold">Your plan</h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">Current: {user?.plan ?? "free"}</p>
          <Link
            href="/billing"
            className="mt-4 inline-flex rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-black dark:hover:bg-zinc-200"
          >
            Manage billing
          </Link>
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-black">
          <h2 className="text-base font-semibold">Next up</h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Pick a lesson from the library and track progress (progress tracking is a stub).
          </p>
          <Link
            href="/content"
            className="mt-4 inline-flex rounded-full border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-950"
          >
            Browse content
          </Link>
        </div>
      </section>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-black">
        <h2 className="text-base font-semibold">Progress</h2>
        <div className="mt-4 space-y-3">
          <div>
            <div className="flex items-center justify-between text-sm">
              <span>Onboarding</span>
              <span className="text-zinc-500 dark:text-zinc-500">{onboardingProgress}%</span>
            </div>
            <ProgressBar value={onboardingProgress} size="sm" />
          </div>
          <div>
            <div className="flex items-center justify-between text-sm">
              <span>Core track</span>
              <span className="text-zinc-500 dark:text-zinc-500">{coreProgress}%</span>
            </div>
            <ProgressBar value={coreProgress} size="sm" />
          </div>
        </div>
      </section>

      {shouldShowOnboarding && (
        <OnboardingWrapper
          userOnboarded={user?.onboarded ?? false}
          steps={[
            { id: "profile", label: "Complete your profile", done: false, href: "/profile" },
            { id: "pricing", label: "Choose a plan", done: false, href: "/pricing" },
            { id: "content", label: "Access your first content", done: false, href: "/content" },
          ]}
        />
      )}
    </div>
  );
}

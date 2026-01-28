import { getCurrentUser } from "@/lib/auth";

export default async function ProfilePage() {
  const user = await getCurrentUser();

  return (
    <div className="mx-auto max-w-2xl space-y-10">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Profile & settings</h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">Stub profile page for the membership scaffold.</p>
      </header>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-black">
        <h2 className="text-base font-semibold">Account</h2>
        <dl className="mt-4 grid gap-3 text-sm">
          <div className="flex items-center justify-between gap-4">
            <dt className="text-zinc-600 dark:text-zinc-400">Email</dt>
            <dd className="font-medium">{user?.email ?? "member@example.com"}</dd>
          </div>
          <div className="flex items-center justify-between gap-4">
            <dt className="text-zinc-600 dark:text-zinc-400">Plan</dt>
            <dd className="font-medium">{user?.plan ?? "starter"}</dd>
          </div>
        </dl>
      </section>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-black">
        <h2 className="text-base font-semibold">Preferences</h2>
        <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
          Add notification settings, display name, and security settings here.
        </p>
      </section>
    </div>
  );
}

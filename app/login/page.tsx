import { createMetadata } from "../metadata";

type Props = {
  searchParams?: Record<string, string | string[] | undefined>;
};

export const metadata = createMetadata(
  "Log in",
  "Sign in to your account to access your member dashboard and content.",
  "/login"
);

export default function LoginPage({ searchParams }: Props) {
  const next = typeof searchParams?.next === "string" ? searchParams.next : "/dashboard";

  return (
    <div className="mx-auto max-w-md space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Log in</h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">Use any email. This is an auth stub.</p>
      </header>

      <form action="/api/auth/login" method="post" className="space-y-4">
        <input type="hidden" name="next" value={next} />

        <div className="space-y-1">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            aria-label="Email"
            className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-400 dark:border-zinc-800 dark:bg-black"
            placeholder="you@example.com"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-full bg-zinc-900 px-5 py-3 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-black dark:hover:bg-zinc-200"
        >
          Continue
        </button>
      </form>
    </div>
  );
}

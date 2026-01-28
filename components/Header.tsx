import Link from "next/link";
import { cookies } from "next/headers";

export default async function Header() {
  const cookieStore = await cookies();
  const authed = cookieStore.get("mp_auth")?.value === "1";

  return (
    <header className="border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-black/60">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-sm font-semibold tracking-tight">
          MemberStack
        </Link>

        <nav aria-label="Primary" className="flex items-center gap-4 text-sm">
          <Link href="/pricing" className="text-zinc-700 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-zinc-50">
            Pricing
          </Link>
          <Link href="/features" className="text-zinc-700 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-zinc-50">
            Features
          </Link>
          <Link href="/about" className="text-zinc-700 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-zinc-50">
            About
          </Link>

          <span className="mx-1 h-5 w-px bg-zinc-200 dark:bg-zinc-800" />

          {authed ? (
            <>
              <Link href="/dashboard" className="text-zinc-700 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-zinc-50">
                Dashboard
              </Link>
              <Link href="/content" className="text-zinc-700 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-zinc-50">
                Library
              </Link>
              <Link href="/billing" className="text-zinc-700 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-zinc-50">
                Billing
              </Link>
              <Link href="/profile" className="text-zinc-700 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-zinc-50">
                Profile
              </Link>

              <form action="/api/auth/logout" method="post">
                <button
                  type="submit"
                  className="rounded-full border border-zinc-200 px-3 py-1.5 text-zinc-900 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-950"
                >
                  Sign out
                </button>
              </form>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-full border border-zinc-200 px-3 py-1.5 text-zinc-900 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-950"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="rounded-full bg-zinc-900 px-3 py-1.5 text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-black dark:hover:bg-zinc-200"
              >
                Sign up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

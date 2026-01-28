export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-black">
      <div className="mx-auto w-full max-w-6xl px-4 py-10 text-sm text-zinc-600 dark:text-zinc-400">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} MemberStack. All rights reserved.</p>
          <p className="text-zinc-500 dark:text-zinc-500">Placeholder brand • Replaceable structure</p>
        </div>
      </div>
    </footer>
  );
}

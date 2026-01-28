export default function AboutPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">About</h1>
        <p className="max-w-2xl text-zinc-600 dark:text-zinc-400">
          This is placeholder copy for a membership platform. Replace it with your story, mission, and member promise.
        </p>
      </header>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-black">
        <h2 className="text-base font-semibold">What members get</h2>
        <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
          A structured learning path, downloadable resources, and ongoing updates—all behind a clean subscription flow.
        </p>
      </section>
    </div>
  );
}

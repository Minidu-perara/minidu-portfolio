import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="flex flex-1 flex-col items-center justify-center gap-4 px-4 pb-24 text-center">
      <p className="font-mono text-sm text-indigo-300">404</p>
      <h1 className="text-4xl font-extrabold md:text-6xl">Page not found</h1>
      <p className="text-gray-400">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
      <Link
        href="/"
        className="glass mt-2 rounded-full px-5 py-1.5 text-sm text-indigo-200 hover:bg-indigo-500/10 hover:text-white focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:outline-none"
      >
        Back to home
      </Link>
    </main>
  );
}

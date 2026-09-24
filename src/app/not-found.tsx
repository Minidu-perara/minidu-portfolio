import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import { buttonSecondary } from "@/components/ui/styles";

export default function NotFound() {
  return (
    <main id="main" className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-24 text-center">
      <p className="font-mono text-sm text-indigo-300">404</p>
      <h1 className="text-4xl font-bold tracking-tight text-slate-50 sm:text-5xl">Page not found</h1>
      <p className="text-slate-400">The page you’re looking for doesn’t exist or has moved.</p>
      <Link href="/" className={`${buttonSecondary} mt-4`}>
        <FiArrowLeft aria-hidden className="size-4" />
        Back to home
      </Link>
    </main>
  );
}

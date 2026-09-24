import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import { buttonGhost } from "@/components/ui/styles";

export default function NotFound() {
  return (
    <main id="main" className="shell flex flex-1 flex-col items-start justify-center py-32">
      <p className="label-mono text-signal">~/404</p>
      <h1 className="display-2 mt-5 text-[clamp(2.4rem,7vw,5rem)]">This page isn’t in production.</h1>
      <p className="mt-5 max-w-lg text-lg text-ink-2">The address may have a typo, or the page has moved. Everything lives on the home page now.</p>
      <Link href="/" className={`${buttonGhost} mt-10`}>
        <FiArrowLeft aria-hidden className="size-4" />
        Back to home
      </Link>
    </main>
  );
}

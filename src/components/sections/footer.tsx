import { profile } from "@/content/profile";

export function Footer() {
  return (
    <footer className="border-t border-white/5 pt-8 text-sm text-slate-500">
      <p>
        © {new Date().getFullYear()} {profile.name}. Built with Next.js and Tailwind CSS.
      </p>
    </footer>
  );
}

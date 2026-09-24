import type { IconType } from "react-icons";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { profile, type SocialLink } from "@/content/profile";

const icons: Record<SocialLink["icon"], IconType> = {
  github: FaGithub,
  linkedin: FaLinkedin,
};

export function SocialLinks() {
  return (
    <ul className="flex gap-6">
      {profile.socials.map(({ label, href, icon }) => {
        const Icon = icons[icon];
        return (
          <li key={label}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${label} (opens in a new tab)`}
              className="glass block rounded-full px-3 py-2 text-white shadow-md transition duration-200 hover:scale-125 hover:bg-indigo-500/10 hover:text-blue-400 hover:drop-shadow-[0_0_8px_#60a5fa] focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:outline-none"
            >
              <Icon size={32} aria-hidden />
            </a>
          </li>
        );
      })}
    </ul>
  );
}

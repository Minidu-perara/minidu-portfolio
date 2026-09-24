import type { IconType } from "react-icons";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiSubstack } from "react-icons/si";
import { profile, type SocialLink } from "@/content/profile";
import { iconButton } from "@/components/ui/styles";

const icons: Record<SocialLink["icon"], IconType> = {
  github: FaGithub,
  linkedin: FaLinkedin,
  substack: SiSubstack,
};

export function SocialLinks() {
  return (
    <ul className="flex items-center gap-2">
      {profile.socials.map(({ label, href, icon }) => {
        const Icon = icons[icon];
        return (
          <li key={label}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${label} (opens in a new tab)`}
              title={label}
              className={iconButton}
            >
              <Icon aria-hidden className="size-[18px]" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}

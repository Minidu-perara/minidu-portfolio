import { profile } from "@/content/profile";

const updatedLabel = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "numeric",
  day: "numeric",
  timeZone: "UTC",
}).format(new Date(profile.resume.updated));

export function ResumeDownload() {
  return (
    <div className="flex shrink-0 flex-col items-center gap-1 motion-safe:animate-fade-up lg:items-end">
      <a
        href={profile.resume.href}
        download={profile.resume.downloadName}
        className="flex items-center gap-2 rounded-lg whitespace-nowrap bg-linear-to-r from-indigo-500 to-pink-500 px-4 py-2 text-sm font-bold text-white transition-transform duration-150 hover:scale-105 hover:from-indigo-600 hover:to-pink-600 focus-visible:ring-2 focus-visible:ring-pink-400 focus-visible:outline-none"
      >
        <svg className="size-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v12m0 0l-4-4m4 4l4-4" />
        </svg>
        Download Resume (PDF)
      </a>
      <p className="text-[11px] text-gray-400">
        Updated: <time dateTime={profile.resume.updated}>{updatedLabel}</time>
      </p>
    </div>
  );
}

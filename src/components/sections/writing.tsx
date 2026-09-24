import { FiArrowUpRight } from "react-icons/fi";
import { Section } from "@/components/ui/section";
import { textLink } from "@/components/ui/styles";
import { profile } from "@/content/profile";
import { getLatestPosts } from "@/lib/substack";

const dateFormat = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

export async function WritingSection() {
  const posts = await getLatestPosts(new URL("/feed", profile.substackHref).href);

  return (
    <Section id="writing" eyebrow="writing" title="Writing">
      {posts.length > 0 ? (
        <ul className="grid gap-3">
          {posts.map((post) => (
            <li key={post.url}>
              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-2xl p-5 ring-1 ring-white/5 transition hover:bg-white/4 hover:ring-white/10 focus-visible:ring-2 focus-visible:ring-indigo-300 focus-visible:outline-none sm:p-6"
              >
                <time dateTime={post.date} className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
                  {dateFormat.format(new Date(post.date))}
                </time>
                <h3 className="mt-1.5 flex items-start gap-1 font-semibold text-slate-100 group-hover:text-indigo-200">
                  {post.title}
                  <FiArrowUpRight
                    aria-hidden
                    className="mt-1 size-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </h3>
                {post.excerpt && <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-400">{post.excerpt}</p>}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p className="leading-relaxed text-slate-400">
          I publish my writing on Substack. Subscribe there to get new posts by email.
        </p>
      )}
      <p className="mt-8 text-sm">
        <a href={profile.substackHref} target="_blank" rel="noopener noreferrer" className={`${textLink} inline-flex items-center gap-1`}>
          Read on Substack
          <FiArrowUpRight aria-hidden className="size-4" />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      </p>
    </Section>
  );
}

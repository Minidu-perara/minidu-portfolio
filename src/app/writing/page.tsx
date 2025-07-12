"use client";
import Navbar from "../components/Navbar";

const posts = [
  { slug: "my-first-post", title: "My First Post", date: "2024-07-10" },
  { slug: "learning-journey", title: "Learning Journey in IT", date: "2024-07-09" },
];

export default function WritingPage() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center px-2 md:px-4">
      <Navbar />
      <section className="w-full max-w-2xl mt-16 flex flex-col gap-8 animate-fadeIn">
        <h1 className="text-4xl md:text-6xl font-extrabold text-center mb-6">Writing</h1>
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post.slug} className="border-b border-white/10 pb-2">
              <a href={`/writing/${post.slug}`} className="text-indigo-300 hover:underline text-xl font-semibold">
                {post.title}
              </a>
              <span className="ml-2 text-gray-400 text-sm">{post.date}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
} 
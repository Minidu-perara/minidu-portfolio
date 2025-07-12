"use client";
import Navbar from "../../components/Navbar";
import { GetServerSidePropsContext } from "next";

type PageProps = { params: { slug: string } };

const examplePosts = {
  "my-first-post": {
    title: "My First Post",
    date: "2024-07-10",
    content: "This is my first blog post. Welcome to my writing section!"
  },
  "learning-journey": {
    title: "Learning Journey in IT",
    date: "2024-07-09",
    content: "Sharing my experiences and lessons learned as an IT undergrad."
  }
};

export default function BlogPostPage({ params }: PageProps) {
  const post = params && typeof params.slug === 'string' && examplePosts[params.slug as keyof typeof examplePosts]
    ? examplePosts[params.slug as keyof typeof examplePosts]
    : {
        title: "Post Not Found",
        date: "",
        content: "Sorry, this post does not exist."
      };
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center px-2 md:px-4">
      <Navbar />
      <article className="w-full max-w-2xl mt-16 animate-fadeIn">
        <h1 className="text-3xl md:text-5xl font-bold mb-2 text-indigo-200">{post.title}</h1>
        <div className="text-gray-400 mb-6">{post.date}</div>
        <div className="text-lg text-gray-200 whitespace-pre-line">{post.content}</div>
      </article>
    </main>
  );
} 
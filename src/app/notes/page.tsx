"use client";
import Navbar from "../components/Navbar";

const notes = [
  { slug: "quick-tip-mern", title: "Quick Tip: MERN Stack Setup", date: "2024-07-10" },
  { slug: "iot-lesson", title: "IoT: Lessons from Smart Waste Project", date: "2024-07-09" },
];

export default function NotesPage() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center px-2 md:px-4">
      <Navbar />
      <section className="w-full max-w-2xl mt-16 flex flex-col gap-8 animate-fadeIn">
        <h1 className="text-4xl md:text-6xl font-extrabold text-center mb-6">Notes</h1>
        <ul className="space-y-4">
          {notes.map((note) => (
            <li key={note.slug} className="border-b border-white/10 pb-2">
              <a href={`/notes/${note.slug}`} className="text-pink-300 hover:underline text-xl font-semibold">
                {note.title}
              </a>
              <span className="ml-2 text-gray-400 text-sm">{note.date}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
} 
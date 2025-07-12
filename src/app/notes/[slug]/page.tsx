"use client";
import Navbar from "../../components/Navbar";

const exampleNotes = {
  "quick-tip-mern": {
    title: "Quick Tip: MERN Stack Setup",
    date: "2024-07-10",
    content: "To quickly scaffold a MERN app, use create-react-app for frontend and Express generator for backend."
  },
  "iot-lesson": {
    title: "IoT: Lessons from Smart Waste Project",
    date: "2024-07-09",
    content: "Sensor calibration and real-time dashboards are key for reliable IoT deployments."
  }
};

export default function NoteDetailPage({ params }: { params: { slug: string } }) {
  const note = params && typeof params.slug === 'string' && exampleNotes[params.slug as keyof typeof exampleNotes]
    ? exampleNotes[params.slug as keyof typeof exampleNotes]
    : {
        title: "Note Not Found",
        date: "",
        content: "Sorry, this note does not exist."
      };
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center px-2 md:px-4">
      <Navbar />
      <article className="w-full max-w-2xl mt-16 animate-fadeIn">
        <h1 className="text-3xl md:text-5xl font-bold mb-2 text-pink-200">{note.title}</h1>
        <div className="text-gray-400 mb-6">{note.date}</div>
        <div className="text-lg text-gray-200 whitespace-pre-line">{note.content}</div>
      </article>
    </main>
  );
} 
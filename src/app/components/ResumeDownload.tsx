"use client";
import { useState } from "react";

export default function ResumeDownload() {
  return (
    <div className="flex flex-col items-end w-full max-w-xs ml-auto animate-fadein">
      <a
        href="/Master%20Resume%20Minidu.pdf"
        download
        aria-label="Download Resume as PDF"
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 text-white font-bold rounded-lg transition-transform duration-150 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-400 text-sm mb-3 md:mb-2"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v12m0 0l-4-4m4 4l4-4" />
        </svg>
        Download Resume (PDF)
      </a>
      <div className="text-[11px] text-gray-400 text-right md:text-right text-center mt-0 opacity-80 animate-fadein-slow">
        Updated: 7/13/2025
      </div>
      <style jsx>{`
        @keyframes fadein { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: none; } }
        .animate-fadein { animation: fadein 0.8s ease; }
        @keyframes fadein-slow { from { opacity: 0; } to { opacity: 0.8; } }
        .animate-fadein-slow { animation: fadein-slow 1.5s ease; }
      `}</style>
    </div>
  );
} 
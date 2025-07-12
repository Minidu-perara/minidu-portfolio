"use client";
import { useState } from "react";

interface ResumeDownloadProps {
  className?: string;
}

export default function ResumeDownload({ className = "" }: ResumeDownloadProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    
    try {
      // Create a link element to trigger download
      const link = document.createElement('a');
      link.href = '/resume.pdf'; // Your resume file path
      link.download = 'Minidu_Perera_Resume.pdf'; // Name of downloaded file
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Optional: Show success message
      setTimeout(() => {
        setIsDownloading(false);
      }, 1000);
    } catch (error) {
      console.error('Download failed:', error);
      setIsDownloading(false);
    }
  };

  return (
    <div className={`flex flex-col items-center gap-4 ${className}`}>
      <div className="text-center">
        <h3 className="text-xl font-semibold text-indigo-200 mb-2">
          Download My Resume
        </h3>
        <p className="text-gray-400 text-sm mb-4">
          Get a detailed overview of my skills, experience, and projects
        </p>
      </div>
      
      <button
        onClick={handleDownload}
        disabled={isDownloading}
        className={`
          group relative inline-flex items-center gap-3 px-6 py-3 
          bg-gradient-to-r from-indigo-600 to-purple-600 
          hover:from-indigo-700 hover:to-purple-700
          text-white font-semibold rounded-xl 
          transition-all duration-300 transform hover:scale-105
          shadow-lg hover:shadow-xl
          disabled:opacity-50 disabled:cursor-not-allowed
          focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-black
        `}
      >
        {isDownloading ? (
          <>
            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Downloading...</span>
          </>
        ) : (
          <>
            <svg className="w-5 h-5 transition-transform group-hover:translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Download Resume (PDF)</span>
          </>
        )}
      </button>
      
      <div className="flex items-center gap-2 text-xs text-gray-500">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>Updated: {new Date().toLocaleDateString()}</span>
      </div>
    </div>
  );
} 
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function SocialLinks() {
  return (
    <div className="flex gap-6">
      <a href="https://github.com/Minidu-perara" target="_blank" rel="noopener noreferrer"
        className="text-white bg-white/5 rounded-full shadow-md border border-indigo-400/10 backdrop-blur-md px-3 py-2 hover:text-blue-400 hover:bg-indigo-500/10 transition-all duration-200 transform hover:scale-125 hover:drop-shadow-[0_0_8px_#60a5fa] focus:outline-none focus:ring-2 focus:ring-indigo-400" style={{ WebkitBackdropFilter: 'blur(8px)', backdropFilter: 'blur(8px)' }} aria-label="GitHub">
        <FaGithub size={32} />
      </a>
      <a href="https://www.linkedin.com/in/minidu-thiranjaya-189aa22a3/" target="_blank" rel="noopener noreferrer"
        className="text-white bg-white/5 rounded-full shadow-md border border-indigo-400/10 backdrop-blur-md px-3 py-2 hover:text-blue-400 hover:bg-indigo-500/10 transition-all duration-200 transform hover:scale-125 hover:drop-shadow-[0_0_8px_#60a5fa] focus:outline-none focus:ring-2 focus:ring-indigo-400" style={{ WebkitBackdropFilter: 'blur(8px)', backdropFilter: 'blur(8px)' }} aria-label="LinkedIn">
        <FaLinkedin size={32} />
      </a>
    </div>
  );
}

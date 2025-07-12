import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function SocialLinks() {
  return (
    <div className="flex gap-6">
      <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer"
        className="hover:text-blue-400 transition-all duration-200 transform hover:scale-125 hover:drop-shadow-[0_0_8px_#60a5fa]" aria-label="GitHub">
        <FaGithub size={32} />
      </a>
      <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer"
        className="hover:text-blue-400 transition-all duration-200 transform hover:scale-125 hover:drop-shadow-[0_0_8px_#60a5fa]" aria-label="LinkedIn">
        <FaLinkedin size={32} />
      </a>
      <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer"
        className="hover:text-blue-400 transition-all duration-200 transform hover:scale-125 hover:drop-shadow-[0_0_8px_#60a5fa]" aria-label="Twitter">
        <FaTwitter size={32} />
      </a>
    </div>
  );
}

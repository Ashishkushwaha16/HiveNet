
import { Link } from "react-router-dom";

const Logo = () => (
  <Link to="/" className="flex items-center gap-2">
    <div className="rounded-md bg-hiveprimary-600 p-1">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-white"
      >
        <path d="M5 11h4a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2Z" />
        <path d="M15 11h4a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2Z" />
        <path d="M5 21h4a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2Z" />
        <path d="M15 21h4a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2Z" />
      </svg>
    </div>
    <h1 className="text-xl font-bold text-hiveprimary-700">SkillHive</h1>
  </Link>
);

export default Logo;

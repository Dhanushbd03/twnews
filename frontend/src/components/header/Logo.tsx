import React from "react";
import { Link } from "react-router-dom";

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <div className={`font-bold border-r-2 border-gray-400 pr-5 w-fit ${className}`}>
      <Link to="/"><span className="text-primary">TW</span> .News</Link>
    </div>
  );
};

export default Logo;

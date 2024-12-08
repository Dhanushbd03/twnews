import React from "react";

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <div className={`font-bold border-r-2 border-gray-400 pr-5 w-fit ${className}`}>
      <span className="text-primary">TW</span> .News
    </div>
  );
};

export default Logo;

import { Link } from "react-router-dom";
import React from "react";
interface NavbarProps {
  className?: string;
}

const Navbar = ({ className }: NavbarProps): JSX.Element => {
  const handleMouseEnter = (event: React.MouseEvent<HTMLLIElement>) => {
    event.currentTarget.classList.add("relative");
    const rect = document.createElement("div");
    rect.className =
      "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-full bg-hover hover-rect -z-10 h-5";
    event.currentTarget.appendChild(rect);
  };
  const handleMouseLeave = (event: React.MouseEvent<HTMLLIElement>) => {
    const rect = event.currentTarget.querySelector(".hover-rect");
    if (rect) {
      event.currentTarget.removeChild(rect);
    }
  };
  return (
    <ul
      className={`flex items-center gap-10 lg:px-10 [&>li]:cursor-pointer [&>li]:text-gray-500 [&>li]:font-bold [&>li]:text-md [&>li]:bg-transparent [&>li]:leading-loose [&>li]:text-nowrap uppercase ${className} tracking-widest`}
    >
      <li
        className="hover:text-primary"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Link to="/">Home</Link>
      </li>
      <li
        className="hover:text-primary hover:text-clip"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Link to="/reviews">Reviews</Link>
      </li>
      <li
        className="hover:text-primary"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Link to="/daily-news">Daily News</Link>
      </li>
      <li
        className="hover:text-primary"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Link to="/features">Features</Link>
      </li>
    </ul>
  );
};

export default Navbar;
